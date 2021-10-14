const nodemailer = require('nodemailer');
const express = require('express')


const Newsletter = require("../models/Newsletter")

exports.mailer = (req,res) => {
    // console.log(req.blog)
    maillist = []
    Newsletter.find()
    .then((emailobjs)=>{
        emailList = ""
        emailobjs.map((element)=>{
            emailList = emailList + ","+element.email;
        })
        emailList = emailList.slice(1);
        console.log(emailList);
        console.log(req.blog)

        
        try {

            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.NEWSLETTER_EMAIL,
                    pass: process.env.NEWSLETTER_PASS
                }
            });

            const htmlcode = `<h1> Knock Knock... New blog published! <h1> <br> 
            <img src="https://source.unsplash.com/700x700/?nature"/> <br><br>
            <h2> <center> ${req.blog.title} </center> </h2>  

            <h4> <center> By ${req.blog.name} </center><h4> 
            
            <p style="color: grey">${req.blog.description.toString().slice(0,200)+"...."} </p> <br>

            <h4> Check it out at http://localhost:3000/blogs/${req.blog._id} </h4> 

            <p><center>Tune in for more content and news</center></p> <br>

            <h6><center>All rights reserved @Ecology Team </center></h6>
            
            
            
            `
        
            var mailOptions = {
                from: 'ecoprojectteam123@gmail.com',
                to:"nandysoham16@gmail.com",
                bcc: emailList,
                subject: 'Blogs Updates - Ecology project',
                html : htmlcode
            };
        
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
    
            return res.status(201).json({success:"success from sendnewsemail"})
            
        } catch (error) {
            console.log(error);
            return res.status(401).json({error: error})
        }
        

    })
    .catch(err=> {
        console.log(err)
        return res.status(400).json({"error" : err})
    })
    

}
