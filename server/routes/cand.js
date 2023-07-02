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

module.exports = router;