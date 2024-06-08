const express = require('express')
const router = express.Router()
const fetchUser = require("../../middleware/fetchindivuser")

const indivUser = require("../../models/Individual/indivUser")

router.post("/indiv/public/indivdetails",async (req,res)=>{
    // res.status(200).json(req.user)
    // console.log("i am here in the backend");
    let success = false
    const {userid} = req.body;
    // console.log(userid);
    try {

        userindiv = await indivUser.findById(userid);
        if(userindiv){
            success = true
            const returnable = {
                _id : userindiv._id,
                name : userindiv.name,
                email : userindiv.email,
                city : userindiv.city,
                state : userindiv.state,
                country : userindiv.country,
                about: userindiv.about,
                profilePicture : userindiv.profilePicture[0],
                joined : userindiv.createdAt

            }
            // console.log("sent the returnable "+ returnable);
            return res.status(200).json({success:success,returnable})
            
        }
        else{
            // console.log("user not found")
            return res.status(400).json({success,error:"not found the user "})
        }
        
    } catch (error) {
        // console.log("some connection error")
        console.log(error)
        success = false
        return res.json({success:success, error:"sorry couldn't get the user details due to service interruption"})
    }

})

module.exports = router