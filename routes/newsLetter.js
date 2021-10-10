const express = require("express")
const router = express.Router()
const { body, validationResult } = require('express-validator');

const Newsletter = require("../models/Newsletter")

router.post("/addtonewsletter",[
    body('email').isEmail()
],async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {email} = req.body

    const valemail = await Newsletter.findOne({email});
    if(valemail){
        res.status(400).send("Email already exists!")
    }

    const emailtobeadded = new Newsletter({email});
    const saveemail = await emailtobeadded.save();
    res.json(saveemail)
})

module.exports = router

