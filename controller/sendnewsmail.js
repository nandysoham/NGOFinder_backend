const nodemailer = require('nodemailer');
const express = require('express')
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const parse = require("html-react-parser");
const Newsletter = require("../models/Newsletter")

exports.mailer = (req, res) => {
    // console.log(req.blog)



    maillist = []

    Newsletter.find()
        .then((emailobjs) => {
            emailList = ""
            emailobjs.map((element) => {
                emailList = emailList + "," + element.email;
            })
            emailList = emailList.slice(1);
            // console.log(emailList);
            // console.log(req.blog)


            try {
                const oauth2Client = new OAuth2(
                    process.env.CLIENTID, // ClientID
                    process.env.CLIENTSECRET, // Client Secret
                    "https://developers.google.com/oauthplayground" // Redirect URL
                );


                // to get a new access token we need to provide the refresh token
                oauth2Client.setCredentials({
                    refresh_token: process.env.REFRESHTOKEN
                });
                const accessToken = oauth2Client.getAccessToken()

                const smtpTransport = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                        type: "OAuth2",
                        user: process.env.EMAIL,
                        clientId: process.env.CLIENTID,
                        clientSecret: process.env.CLIENTSECRET,
                        refreshToken: process.env.REFRESHTOKEN,
                        accessToken: accessToken
                    },
                    tls: {
                        rejectUnauthorized: false
                    }
                });


// https://source.unsplash.com/700x700/?nature
                const htmlcode = `<h1> Knock Knock... New blog published! <h1> <br> 
            <img src= ${req.headerImg ? req.headerImg : "https://source.unsplash.com/700x700/?nature"}/> <br><br>
            <h2> <center> ${req.blog.title} </center> </h2>  

            <h4> <center> By ${req.blog.name} </center><h4> 
            
            <p style="color: grey">${req.blog.about} </p> <br>

            <h4> Check it out at http://localhost:3000/blogs/${req.blog._id} </h4> 

            <p><center>Tune in for more content and news</center></p> <br>

            <h6><center>All rights reserved @Ecology Team </center></h6>
            
            
            
            `

                var mailOptions = {
                    from: 'ecoprojectteam123@gmail.com',
                    to: "ecoprojectteam123@gmail.com",
                    bcc: emailList,
                    subject: 'Blogs Updates - Ecology project',
                    generateTextFromHTML: true,
                    html: htmlcode
                };

                smtpTransport.sendMail(mailOptions, (error, response) => {

                    error ? console.log(error) : console.log(response);
                    smtpTransport.close();
                });

                return res.status(201).json({ success: "success from sendnewsemail" })

            } catch (error) {
                console.log(error);
                return res.status(401).json({ error: error })
            }


        })
        .catch(err => {
            console.log(err)
            return res.status(400).json({ "error": err })
        })


}
