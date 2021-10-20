const express = require("express")
const router = express.Router()
const { body, validationResult } = require('express-validator');

const Newsletter = require("../models/Newsletter")

router.post("/addtonewsletter",
    [
        body('email').isEmail()
    ]
    ,async (req,res)=>{

        let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success:success, errors: errors.array() });
    }

    const {email} = req.body

    const valemail = await Newsletter.findOne({email});
    if(valemail){
        return res.status(400).json({success:success,error:"Email already exists!"})
    }

    const emailtobeadded = new Newsletter({email});
    const saveemail = await emailtobeadded.save();
    success = true;
    res.json({success,saveemail})
})

module.exports = router

