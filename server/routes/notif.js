const express = require('express');
const router = express.Router();
const Notification = require('../models/notification');
const mongoose = require('mongoose');

router.post("/addNotif", async(req, res)=>{
    try {
        const notifData = await Notification.create({
            name: req.body.name,
            iTrack: req.body.iTrack,
            specialisation: req.body.specialisation,
            status: req.body.status
        })
        res.status(200).json({
            notifData,
            "msg":"Notification Added Successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            "msg":"Failed to add notification"
        })
    }
})


router.get("/getNotif", async(req, res) =>{
    try {
        notif = await Notification.find({});
        console.log(notif);
        res.status(200).json({
            notif,
            "notif.length":notif.length,
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