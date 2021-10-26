const express = require('express')
const router = express.Router()


const commentsentry = require("../models/commentsentry")

router.post("/comments/fetchcomments", async (req,res)=>{
    const {blogid} = req.body;
    try {
        let comments = await commentsentry.find({blogid:blogid})
        res.status(200).send({success:true, comments})
    } catch (error) {
        res.status(500).json({success:false})
        console.log(error);
    }
})

module.exports = router;