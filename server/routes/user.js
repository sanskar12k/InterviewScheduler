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

// create user
// api - /user/createuser

router.post("/createuser", 
async (req,res)=>{
    try {
        if(req.body.user === 'Interviewer'){
        const exist = await User.findOne({email:req.body.email});
        if(exist){
           return res.status(409).json({
                "msg":"Email already exist"
            })
        }
       const user = await User.create({
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            phone: req.body.phNumber,
            iTrack: req.body.iTrack,
            specialisation: req.body.specialisation,
            password:req.body.password
        });
        res.status(200).json({
            user,
            "msg":"User created",

        })
    }
    else{
        const exist = await Admin.findOne({email:req.body.email});
        if(exist){
           return res.status(409).json({
                "msg":"Email already exist"
            })
        }
       const user = await Admin.create({
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            phone: req.body.phNumber,
            password:req.body.password
        });
        res.status(200).json({
            user,
            "msg":"User created",

        })
    }
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

router.post("/login", async(req, res)=>{
    try{
        const{email, password} = req.body;
        console.log(email, "email")
        const userExist = await User.findOne({email, password});
        const adminExist  = await Admin.findOne({email, password})
        if(userExist){
            res.status(200).json({
                userExist,
                "userType":"Interviewer",
                "msg":"Login Successful"
            })
        }
        else if(adminExist){
            res.status(200).json({
                "userExist":adminExist,
                "userType":"Admin",
                "msg":"Login Successful"
            })
        }
        else{
            res.status(401).json({
                "msg":"Invalid Credential"
            })
        }
    }
    catch(err){
        console.log(err)
        res.status(400).json({
            err, 
            "msg":"Login Failed"
        })
    }
})

//update availablity
router.patch('/updateAvaialability', async(req, res)=>{
    try {
        const {user_id, date, time} = req.body;
        const newTime = new DateModel({date, time, user:user_id});
        await newTime.save();
        const updatedTime = await User.findById({_id:user_id});
        updatedTime.dateNdTime.push(newTime);
        updatedTime.availablity[time] = 1;
        await updatedTime.save();
        res.status(200).json({
            updatedTime,
            "msg":"Avaialability Updated"
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            "msg":"Time Update Avaialability Failed"
        })
    }
})

//updateStatus
// /user/updateStatus
router.patch('/:user_id/cand/:cand_id/updateStatus', async(req, res)=>{
    try {
        const {user_id, cand_id} = req.params;
        const{status} = req.body;
        const u_id = new mongoose.Types.ObjectId(user_id);
        const c_id = new mongoose.Types.ObjectId(cand_id);
        const user = await User.findById(u_id);
        const cand = await Candidate.findById(c_id);
        if(user.iTrack === 'Technical'){
            cand.status[0] = status;
        }
        else if(user.iTrack === 'Managerial'){
            cand.status[1] = status;
        }
        else if(user.iTrack === 'HR'){
            cand.status[2] = status;
        }
        await cand.save();
        res.status(200).json({
            cand,
            "msg":"Status Updated"
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
router.patch('/:user_id/cand/:cand_id/comment', async(req, res)=>{
    try {
        const {user_id, cand_id} = req.params;
        const{comment} = req.body;
        const u_id = new mongoose.Types.ObjectId(user_id);
        const c_id = new mongoose.Types.ObjectId(cand_id);
        const user = await User.findById(u_id);
        const cand = await Candidate.findById(c_id);
        if(user.iTrack === 'Technical'){
            cand.comment[0] = comment;
        }
        else if(user.iTrack === 'Managerial'){
            cand.comment[1] = comment;
        }
        else if(user.iTrack === 'HR'){
            cand.comment[2] = comment;
        }
        await cand.save();
        res.status(200).json({
            cand,
            "msg":"Comment added"
        })
    } catch (error) {
        console.log(error);
        res.status(404).json({
           error 
        })
    }
})

router.patch("/:admin_id/cand/:cand_id/goStatus", async(req, res)=>{
    try {
        const {admin_id, cand_id} = req.params;
        const{goStatus} = req.body;
        const c_id = new mongoose.Types.ObjectId(cand_id);
        const a_id = new mongoose.Types.ObjectId(admin_id);
        const cand = await Candidate.findById(c_id);
        const admin = await Admin.findById(a_id);
        if(admin.emp_id)
       { cand.GoNgo = goStatus;
        await cand.save();
        res.status(200).json({
            cand,
            "msg":"Candidate Status Updated"
        })}
        else{
            res.status(501).json({
                "msg":"You are not authorised to update status"
            })
        }
    } catch (error) {
        console.log(error);
        res.status(404).json({
           error 
        })
    }
})


router.get("/getInterviewer/:track/cand/:cand_id", async(req, res) =>{
    try {
        const {track, cand_id} = req.params;
        const c_id = new mongoose.Types.ObjectId(cand_id);
        console.log(c_id)
        const candi = await Candidate.findById(c_id);
        console.log(candi)
        const spl = candi.specialisation;
        let interviewer = [];
        if(track === 'Technical'){
            interviewer = await User.find({iTrack: track, specialisation:{$in:spl}});
        }
        else{
            interviewer = await User.find({iTrack:track});
        }
        console.log(interviewer.length);
        res.status(200).json({
            interviewer,
            "interviewer.length":interviewer.length,
            "msg":"List generated Successfully"
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            error
        })
    }
})



module.exports = router;