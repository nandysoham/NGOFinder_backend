const express = require('express')
const router = express.Router()

const fetchUser = require("../middleware/fetchindivuser")
const commentsentry = require("../models/commentsentry")

router.post("/comments/add",fetchUser,async(req,res)=>{
    const {
        blogid,
        description
    } = req.body


    try {

        newcomment = await commentsentry.create({
            blogid : blogid,
            userid : req.user.id,
            description : description
    
        })
    
        res.status(201).json({success : true, newcomment});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false})
        
    }

    


})


module.exports = router;