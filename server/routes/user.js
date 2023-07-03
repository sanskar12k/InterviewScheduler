const express = require('express');
const User = require('../models/user');
const router = express.Router();
const bcrypt = require('bcrypt');
const { DateModel } = require('../models/date');
const Candidate = require('../models/candidate');
const mongoose = require('mongoose');
const Admin = require('../models/admin');
router.get('/allUser', (req, res) => {
    res.send("Got all users");
})

// create user
// api - /user/createuser

router.post("/createuser",
    async (req, res) => {
        try {
            if (req.body.user === 'Interviewer') {
                const exist = await User.findOne({ email: req.body.email });
                if (exist) {
                    return res.status(409).json({
                        "msg": "Email already exist"
                    })
                }
                const user = await User.create({
                    fname: req.body.fname,
                    lname: req.body.lname,
                    email: req.body.email,
                    phone: req.body.phNumber,
                    iTrack: req.body.iTrack,
                    specialisation: req.body.specialisation,
                    password: req.body.password
                });
                res.status(200).json({
                    user,
                    "msg": "User created",

                })
            }
            else {
                const exist = await Admin.findOne({ email: req.body.email });
                if (exist) {
                    return res.status(409).json({
                        "msg": "Email already exist"
                    })
                }
                const user = await Admin.create({
                    fname: req.body.fname,
                    lname: req.body.lname,
                    email: req.body.email,
                    phone: req.body.phNumber,
                    password: req.body.password
                });
                res.status(200).json({
                    user,
                    "msg": "User created",

                })
            }
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    })

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, "email")
        const userExist = await User.findOne({ email, password });
        const adminExist = await Admin.findOne({ email, password })
        if (userExist) {
            res.status(200).json({
                userExist,
                "userType": "Interviewer",
                "msg": "Login Successful"
            })
        }
        else if (adminExist) {
            res.status(200).json({
                "userExist": adminExist,
                "userType": "Admin",
                "msg": "Login Successful"
            })
        }
        else {
            res.status(401).json({
                "msg": "Invalid Credential"
            })
        }
    }
    catch (err) {
        console.log(err)
        res.status(400).json({
            err,
            "msg": "Login Failed"
        })
    }
})

//update availablity
router.patch('/updateAvaialability', async (req, res) => {
    try {
        const { user, date, time } = req.body;
        console.log(user, date, time)
        const newTime = new DateModel({ date, time });
        await newTime.save();
        const updatedTime = await User.findById(user);
        updatedTime.dateNdTime.push(newTime._id);
        updatedTime.availablity[time] = 1;
        await updatedTime.save();
        res.status(200).json({
            updatedTime,
            "msg": "Avaialability Updated"
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            "msg": "Time Update Avaialability Failed"
        })
    }
})

router.patch("/removeTime", async(req, res)=>{
    try {
        const user = new mongoose.Types.ObjectId(req.body.user);
        const _id = new mongoose.Types.ObjectId(req.body._id);
        const time_id = await User.findByIdAndUpdate(user, {$pull:{dateNdTime:_id}},{new:true});

        const time = await DateModel.findById(_id)
        const interv = await User.findById(user);
        interv.availablity[time.time] = 0;
        const remTime = await DateModel.findByIdAndDelete(_id);
        // const dateId = time_id.dateNdTime[0]._id;
        // if(dateId){
        //     const removeTime = await User.findByIdAndUpdate(user, {$pull:{
        //     dateNdTime:dateId
        // }},{new:true});
        // const userAva = await User.findById(user);
        // userAva.availablity[time] = 0;
        // await userAva.save();
        // console.log(userAva);
        // const removeDate = awa.it DateModel.findByIdAndDelete(dateId);
        console.log(time);
        res.status(200).json({
            time_id,
            "msg":"Availablity Removed"
        })  
        // }
        // res.status(400).json({
        //     "msg":"Didn't found such available time"
        // })
             
    } catch (error) {
        console.log(error);
        res.status(400).json({
            error
        })
    }
})

//updateStatus
// /user/updateStatus
router.patch('/:user_id/cand/:cand_id/updateStatus', async (req, res) => {
    try {
        const { user_id, cand_id } = req.params;
        const { status } = req.body;
        const u_id = new mongoose.Types.ObjectId(user_id);
        const c_id = new mongoose.Types.ObjectId(cand_id);
        const user = await User.findById(u_id);
        const cand = await Candidate.findById(c_id);
        cand.interViewer = 0;
        if (user.iTrack === 'Technical') {
            cand.status[0] = status;
        }
        else if (user.iTrack === 'Managerial') {
            cand.status[1] = status;
        }
        else if (user.iTrack === 'HR') {
            cand.status[2] = status;
        }
        await cand.save();
        res.status(200).json({
            cand,
            "msg": "Status Updated"
        })
    } catch (error) {
        console.log(error);
        res.status(404).json({
            error
        })
    }
})

//updateStatus
// /user/comment
router.post('/:user_id/cand/:cand_id/comment', async (req, res) => {
    try {
        const { user_id, cand_id } = req.params;
        const { comment } = req.body;
        const u_id = new mongoose.Types.ObjectId(user_id);
        const c_id = new mongoose.Types.ObjectId(cand_id);
        const user = await User.findById(u_id);
        const cand = await Candidate.findById(c_id);
        if (user.iTrack === 'Technical') {
            cand.comment[0] = comment;
        }
        else if (user.iTrack === 'Managerial') {
            cand.comment[1] = comment;
        }
        else if (user.iTrack === 'HR') {
            cand.comment[2] = comment;
        }
        await cand.save();
        res.status(200).json({
            cand,
            "msg": "Comment added"
        })
    } catch (error) {
        console.log(error);
        res.status(404).json({
            error
        })
    }
})

router.patch("/:admin_id/cand/:cand_id/goStatus", async (req, res) => {
    try {
        const { admin_id, cand_id } = req.params;
        const { goStatus } = req.body;
        const c_id = new mongoose.Types.ObjectId(cand_id);
        const a_id = new mongoose.Types.ObjectId(admin_id);
        const cand = await Candidate.findById(c_id);
        const admin = await Admin.findById(a_id);
        if (admin.emp_id) {
            cand.GoNgo = goStatus;
            await cand.save();
            res.status(200).json({
                cand,
                "msg": "Candidate Status Updated"
            })
        }
        else {
            res.status(501).json({
                "msg": "You are not authorised to update status"
            })
        }
    } catch (error) {
        console.log(error);
        res.status(404).json({
            error
        })
    }
})


router.get("/getInterviewer/:track/cand/:cand_id", async (req, res) => {
    try {
        const { track, cand_id } = req.params;
        const c_id = new mongoose.Types.ObjectId(cand_id);
        console.log(c_id)
        const candi = await Candidate.findById(c_id);
        console.log(candi)
        const spl = candi.specialisation;
        let interviewer = [];
        if (track === 'Technical') {
            interviewer = await User.find({ iTrack: track, specialisation: { $in: spl } });
        }
        else {
            interviewer = await User.find({ iTrack: track });
        }
        console.log(interviewer.length);
        res.status(200).json({
            interviewer,
            "interviewer.length": interviewer.length,
            "msg": "List generated Successfully"
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            error
        })
    }
})

router.get("/Interviewer/:user_id", async (req, res) => {
    try {
        const u_id = new mongoose.Types.ObjectId(req.params.user_id);
        const user = await User.findById(u_id);
        if (user.iTrack === 'Technical') {
            user.round = 0;
        }
        else if (user.iTrack === 'Mangerial') {
            user.round = 1;
        }
        else {
            user.round = 2;
        }
        if (user) {
            return res.status(200).json({
                user,
                "msg": "Got User"
            })
        }
        else {
            return res.status(404).json({
                "msg": "User not found"
            })
        }
    } catch (error) {
        return res.status(404).json({
            "msg": "User not found"
        })
    }
})

router.get("/getAllInterviewers", async (req, res)=>{
    try {
        const interviewers = await User.find({});
        res.status(200).json(interviewers);
    } catch (error) {
        res.status(404).json({
            "msg": "Cannot fetch"
        })
        console.log(error);
    }
})

router.get("/Admin/:user_id", async (req, res) => {
    try {
        const u_id = new mongoose.Types.ObjectId(req.params.user_id);
        const user = await Admin.findById(u_id);
        if (user) {
            return res.status(200).json({
                user,
                "msg": "Got Admin"
            })
        }
        else {
            return res.status(404).json({
                "msg": "User not found"
            })
        }
    } catch (error) {
        return res.status(404).json({
            "msg": "User not found"
        })
    }
})

router.get("/:user_id/myCandidates", async (req, res) => {
    try {
        const u_id = new mongoose.Types.ObjectId(req.params.user_id);
        const dateNow = Date.now();
        console.log(dateNow)
        // const {iTrack, specialisation} = await User.findById(u_id).select("iTrack specialisation");
        let candidates;
        const track = await User.findById(u_id).select("iTrack");
        if (track === "Technical") {
            candidates = await User.findById(u_id).populate({
                path: 'candidateList',
                match: {
                    "status.0": -1 // Replace 'fieldName' with the actual field name and 'i' with the desired index
                },
                populate:{
                    path:"dateNdTime"
                }
            })
                .select("candidateList")
        }
        else if (track === "Managerial") {
            candidates = await User.findById(u_id).populate({
                path: 'candidateList',
                match: {
                    "status.1": -1 // Replace 'fieldName' with the actual field name and 'i' with the desired index
                },
                populate:{
                    path:"dateNdTime"
                }
            })
                .select("candidateList")
        }
        else {
            candidates = await User.findById(u_id).populate({
                path: 'candidateList',
                match: {
                    "status.2": -1 // Replace 'fieldName' with the actual field name and 'i' with the desired index
                },
                populate:{
                    path:"dateNdTime"
                }
            })
                .select("candidateList")
        }

        console.log(candidates)
        res.status(200).json({
            candidates
        })
    } catch (error) {
        console.log(error)
    }
})


//Interview taken
router.patch("/:user_id/taken/:cand_id", async (req, res) => {
    try {
        const uid = new mongoose.Types.ObjectId(req.params.user_id);
        const cid = new mongoose.Types.ObjectId(req.params.cand_id);
        const track = await User.findById(uid).select("iTrack");
        console.log(track)
        const updateUser = await User.findByIdAndUpdate(uid, { $pull: { candidateList: cid }});
        const inUser = await User.findById(uid);
        inUser.interviewTaken += 1;
        await inUser.save();
        let cand = await Candidate.findById(cid);
        cand.interViewer = 0;
        if (track.iTrack === 'Technical') {
            if (cand.status[0] === -1) cand.status[0] = 0;
        }
        else if (track.iTrack === 'Managerial') {
            if (cand.status[1] === -1) cand.status[1] = 0;
        }
        else {
            if (cand.status[2] === -1) cand.status[2] = 0;
        }
        await cand.save();
        console.log(cand);
        console.log(updateUser)
        res.status(200).json({
            cand,
            "msg": "Interview taken"
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            error
        })
    }
})


router.get("/getCand/:track", async (req, res) => {
    try {
        const { track } = req.params;
        let cand = [];
        if (track === 'Technical Round') {
            cand = await Candidate.find({ 'status.0': -1 })
        }
        else if (track === 'Managerial Round') {
            cand = await Candidate.find({ 'status.1': -1 })
        }
        else {
            cand = await Candidate.find({ 'status.2': -1 })
        }
        console.log(cand.length);
        res.status(200).json({
            cand,
            "cand.length": cand.length,
            "msg": "List generated Successfully"
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            error
        })
    }
})


router.get("/:user_id/allAvailability", async(req, res)=>{
    try {
        const uid = new mongoose.Types.ObjectId(req.params.user_id);
        const times = await User.findById(uid).populate("dateNdTime").select("dateNdTime");
        res.status(200).json({
            dates: times.dateNdTime, 
            "msg":"Got all the time"
        })
    } catch (error) {
        console.log(error);
    }
})

//Inputs list of int

router.post("/assignInterviewers", async (req, res) => {
    try {
        let numOfCandidates = 0;
        //Sorted on the basis of number of speciality and then on number of availablity
        const interviewers = await User.aggregate([ //number of available slot and no of specialisation
            {
                $match: {
                    iTrack: "Technical"
                }
            },
            {
                $project: {
                    fname: 1,
                    specialisation: 1,
                    availablity: 1,
                    iTrack: 1,
                    numTags: { $size: "$specialisation" },
                    dateLen: { $size: "$dateNdTime" }
                }
            },
            {
                $sort: {
                    numTags: 1,
                    interviewTaken: 1,
                    dateLen: 1,
                }
            }
        ])
        const list = [];

        for (let i = 0; i < interviewers.length; i++) {
            const spl = interviewers[i].specialisation;
            for (let j = 0; j < spl.length; j++) {
                const cand = await Candidate.find({ specialisation: spl[j], interViewer: 0 }); //list of candidate
                for(let k = 0;k < cand.length; k++){
                    const iv = await User.findById(interviewers[i]._id).populate("dateNdTime");
                      if (iv.dateNdTime.length > 0) {
                          cand[k].interViewerList[0] = interviewers[i]._id; //Technical Round
                          cand[k].interViewer = 1; //Interviewer alloted
                          cand[k].dateNdTime = iv.dateNdTime[0]._id;
                          const {date, time} = iv.dateNdTime[0];
                          const idx = iv.dateNdTime[0].time; 
                          iv.candidateList.push(cand[k]._id);
                          iv.availablity[idx] = 0;
                          const rmvTime = await User.updateOne(
                            { _id: interviewers[i]._id }, // Specify the document you want to update by its _id
                            { $pull: { dateNdTime:  iv.dateNdTime[0]._id} } // Use $pull to remove the specified element from the arrayField
                          )
                        //   iv.interviewTaken += 1;
                          await iv.save();
                          await cand[k].save();
                          console.log(iv)
                          numOfCandidates += 1;
                        //   console.log(date, time)
                        const ndate = new Date(date);
                          const inter = {
                            Date:ndate.toISOString().slice(0,10),
                            Time:`${time} - ${time + 1}`,
                            Interviewer : `${iv.fname}`,
                            Candidate: `${cand[k].fname}  ${cand[k].lname}`,
                            Specialisation: cand[k].specialisation
                          }
                          list.push(inter)
                         //  const update = await User.findByIdAndUpdate(interviewers[i]._id,
                          //     { $pull: { dateNdTime: { $eq: { $arrayElemAt: ['$dateNdTime', i] } } } }
                          //   )
                      }
                }
            }
        }

        // const interViewer = await User.find().sort({"specialisation":1}).select("specialisation");
        res.status(200).json({
            // interViewer
            interviewers,
            length: interviewers.length,
            list,
            "msg": ` Technical Round interviews have been scheduled for ${numOfCandidates} candidates`
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            "msg": "Failed to schedule interviews"
        })
    }
})

router.get("/adminDashboard", async(req, res)=>{
    try {
        // Candidates whose interviewer has not been assigned and first round has been done  and has not been selected yet
         const candidate = await Candidate.find({interViewer:0, 'status.0':{$ne:-1}, 'status.2':{$ne: 10}, GoNgo: {$ne: 0}}).sort({"dateNdTime.time":1});
         let cand = [];
         for(let i= 0;i<candidate.length;i++){
            let status1 = "Not Taken", status2 = "Not Taken", status3 = "Not Taken";
            let round1 = candidate[i].comment[0], round2 = "", round3 = "";
            let round = "Technical";
            if(candidate[i].comment.length === 2)round= "Managerial";
            if(candidate[i].comment.length === 3)round= "HR";
            if(candidate[i].status[0] === 0)status1 = "Rejected";
            if(candidate[i].status[0] === 1)status1 = "Accepted";
            if(candidate[i].status[1] === 0)status2 = "Rejected";
            if(candidate[i].status[1] === 1)status2 = "Accepted";
            if(candidate[i].status[2] === 0)status3 = "Rejected";
            if(candidate[i].status[2] === 1)status3 = "Accepted";
            if(candidate[i].comment.length > 1){
                round2 = candidate[i].comment[1];
            }
            if(candidate[i].comment.length > 2){
                round3 = candidate[i].comment[2];
            }
            const user = {
                user: candidate[i].fname +" "+ candidate[i].lname,
                round:round,
                specialisation: candidate[i].specialisation,
                status1: status1,
                round1: round1,
                status2: status2,
                round2: round2,
                status3: status3,
                round3: round3
            }
            cand.push(user);
         }
          res.status(200).json({
            cand,
            candidate,
            "msg":"Got List"
          })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            error
        })
    }
})

module.exports = router;


