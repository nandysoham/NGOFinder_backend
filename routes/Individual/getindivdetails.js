const express = require('express')
const router = express.Router()
const fetchUser = require("../../middleware/fetchindivuser")

const indivUser = require("../../models/Individual/indivUser")

router.post("/indiv/getindivdetails",fetchUser,async (req,res)=>{
    // res.status(200).json(req.user)
    let success = false
    try {
        // console.log(req.user)
        userindiv = await indivUser.findById(req.user.id);
        if(userindiv){
            success = true
            res.status(200).json({success:success,userindiv})
        }
        else{
            res.status(400).json({success,error:"not found"})
        }
        
    } catch (error) {
        console.log(error)
        success = false
        res.json({success:success, error:"sorry couldn't get the user details"})
    }

})

module.exports = router