const express = require('express')
const router = express.Router()
const fetchindivUser = require("../../middleware/fetchindivUser")

const companyUser = require("../../models/Company/companyUser")

router.post("/company/public/companydetails",async (req,res)=>{
    let success = false
    const {userid} = req.body;
    console.log(userid)
    try {

        userindiv = await companyUser.findById(userid, {"password" : 0});
        if(userindiv){
            success = true
            return res.status(200).json({success:success,userindiv})
        }
        else{
            
            return res.status(400).json({success,error:"not found the user "})
        }
        
    } catch (error) {
        console.log(error)
        success = false
        return res.json({success:success, error:"sorry couldn't get the user details due to service interruption"})
    }

})

module.exports = router