const express = require('express');
const User = require('../models/user');
const router = express.Router();
const bcrypt = require('bcrypt');
const { DateModel } = require('../models/date');
const Candidate = require('../models/candidate');
const mongoose = require('mongoose');
const Admin = require('../models/admin');
router.get('/allUser', (req, res) =>{
    res.send("Got all users");
})

router.post("/addCandidate", async(req, res)=>{
    try {
        const {data} = req.body;
        for (let i = 0; i < data.length; i++) {
            console.log("Cand", data[i].lname);
            const time = new Candidate ({fname:data[i].fname, lname:data[i].lname, email:data[i].email, phNumber:data[i].phNumber, specialisation:data[i].specialisation, resumeLink:data[i].resumeLink});
            console.log(time);
            await time.save();
        }
        res.status(200).json({
            "msg":"Candidates Added Successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            "msg":"Failed to add candidates"
        })
    }
})


router.get("/getCand/:track", async(req, res) =>{
    try {
        const {track} = req.params;
        let cand = [];
        if(track === 'Technical Round'){
             cand = await Candidate.find({'status.0':-1})
        }
        else if(track === 'Managerial Round'){
             cand = await Candidate.find({'status.1':-1})
        }
       else{
         cand = await Candidate.find({'status.2':-1})
       }
        console.log(cand.length);
        res.status(200).json({
            cand,
            "cand.length":cand.length,
            "msg":"List generated Successfully"
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            error
        })
    }
})

router.patch('/:user_id/scheduleInterview/:cand_id', async(req, res)=>{
    try {
        const {date, time} = req.body;
        const {user_id, cand_id} = req.params;
        const u_id = new mongoose.Types.ObjectId(user_id);
        const c_id = new mongoose.Types.ObjectId(cand_id);
        const user = await User.findById(u_id).populate('dateNdTime');
        const timeExist = await DateModel.findOne({date, time, user:u_id})
        console.log(user);
        const cand = await Candidate.findById(c_id);
        cand.dateNdTime = timeExist._id;
        cand.interViewerList.push(u_id);
        user.availablity[time] = 0;
        user.candidateList.push(c_id);
        await cand.save();
        await user.save();
        const updateUserTime = await User.findByIdAndUpdate(u_id, {$pull:{dateNdTime:timeExist._id}}, {new:true});
        // console.log(updateUserTime);
        // // const datetime = new DateModel({date, time});
        // // await datetime.save();
        // // user.availablity[time] = 0; //Removing availability
        res.status(200).send(user)


    } catch (error) {
        console.log(error);
        res.status(400).json({
            error
        })
    }
})


router.patch("/scheduleInterviews", async(req, res)=>{
    try {
        
    } catch (error) {
        console.log(error);
        res.status(400).json({error})
    }
})

router.get("/allcandidate", async(req, res)=>{
    try {
        const cand = await Candidate.find({});
        res.status(200).json({
            candidates:cand
        })        
    } catch (error) {
        console.log(error)
    }
})
//-1 --> No decision
// 0--> Rejected
// 1 --> Next round
router.patch(`/:cand/goStatus`, async(req, res) =>{
    try {
        const cid = new mongoose.Types.ObjectId(req.params.cand);
        const cand = await Candidate.findById(cid);
        const{goStatus} = req.body;
        let iv_name;
        console.log(goStatus)
        if(goStatus === '0' || goStatus===0){
            cand.GoNgo = 0;
            await cand.save(); 
            res.status(200).json({
                cand,
                "msg":"Candidate has been rejected"
            })
            //Notification
        }
        else{
             //Assign new interviewer
             if(cand.status[1] === -1){ //last round was technical
                //Assign managerial
                console.log("managerial");
              const manager =  await User.aggregate([ //number of interviewTaken and no of specialisation
            {
                $match: {
                    iTrack: "Managerial"
                }
            },
            {
                $project: {
                    fname: 1,
                    lname:1,
                    availablity: 1,
                    iTrack: 1,
                    dateLen: { $size: "$dateNdTime" }
                }
            },
            {
                $sort: {
                    interviewTaken: 1,
                    dateLen: 1
                }
            }
        ])
            console.log(manager);
           for(let i = 0;i<manager.length;i++){
            const interviewer  = await User.findById(manager[i]._id).populate("dateNdTime");
            if(interviewer.dateNdTime.length > 0){ //if he has available time slot
                cand.interViewer = 1;
                cand.interViewerList[1] = interviewer._id;
                cand.dateNdTime = interviewer.dateNdTime[0]._id;
                const idx = interviewer.dateNdTime[0].time; 
                interviewer.candidateList.push(cand._id);
                interviewer.availablity[idx] = 0;
                interviewer.dateNdTime.splice(0, 1);
                // interviewer.interviewTaken += 1;
                iv_name = interviewer.fname + interviewer.lname;
                await cand.save();
                await interviewer.save();
                break; //break after interviewer assigned
            }
           }
           res.status(200).json({
            "msg":`${cand.fname} ${cand.lname} has been assigned ${iv_name}.`
           })
             }
             else if(cand.status[2] === -1){ //last round was managerial
                //Assign HR
                console.log("HR")
                const hr =  await User.aggregate([ //number of interviewTaken and no of availablity slot
                {
                    $match: {
                        iTrack: "HR"
                    }
                },
                {
                    $project: {
                        fname: 1,
                        lname:1,
                        availablity: 1,
                        iTrack: 1,
                        dateLen: { $size: "$dateNdTime" }
                    }
                },
                {
                    $sort: {
                        interviewTaken: 1,
                        dateLen: 1
                    }
                }
            ])
                console.log(hr)
               for(let i = 0;i<hr.length;i++){
                const interviewer  = await User.findById(hr[i]._id).populate("dateNdTime");
                if(interviewer.dateNdTime.length > 0){ //if he has available time slot
                    cand.interViewer = 1;
                    cand.interViewerList[2] = interviewer._id;
                    cand.dateNdTime = interviewer.dateNdTime[0]._id;
                    const idx = interviewer.dateNdTime[0].time; 
                    interviewer.candidateList.push(cand._id);
                    interviewer.availablity[idx] = 0;
                    interviewer.dateNdTime.splice(0, 1);
                    // interviewer.interviewTaken += 1;
                    iv_name = interviewer.fname + interviewer.lname;
                    await cand.save();
                    await interviewer.save();
                    break; //break after interviewer assigned
                }
               }
               //Notification
               res.status(200).json({
                "msg":`${cand.fname} ${cand.lname} has been assigned ${iv_name}.`
               })
             }
             else{
                cand.status[2] = 10;
                await cand.save();
                res.status(200).json({
                    "msg":"Candidate has been selected"
                })
                //Notifcation 
             }
        }
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;