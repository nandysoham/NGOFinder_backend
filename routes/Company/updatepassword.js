const express = require('express')
const router = express.Router()

const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const mailindiv = require("../../controller/Mailer/MailIndiv")
const companyUser = require("../../models/Company/companyUser");
const passUpdate = require('../../models/Company/companypassupdate');


const JWT_SECRET = "soham$isagoodboy"

// endpoint for sending mail for changing password
// raw input
router.post("/company/changepass/sendmail", [
    body('email').isEmail(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;

    try {
        let user = await companyUser.findOne({ email })
        if (!user) {
            return res.status(400).json({ error: " Please enter correct credentials" })
        }
        let deleteprevtokedn = await passUpdate.findOneAndDelete({ userid: user._id })
        const userid = user._id;
        const passtoken = new passUpdate({ email, userid })
        const savedpasstoken = await passtoken.save();

        const htmlcode = `
            <h2>Hey ${user.companyname}! Your link for changing Password is </h2>
            <h3>${process.env.REACT_APP_BACKEND_URL}/api/indiv/changepass/${userid}/${savedpasstoken._id}</h3>

            <p> Please don't share this link with anyone </p>

            <p><center>Tune in for more content and news</center></p> 
            <h6><center>All rights reserved @Ecology Team </center></h6>
    
        `

        params = {
            to: email,
            subject: `Hey ${user.companyname}! Link for changing the password`,
            html: htmlcode
        }



        mailindiv(params)
        res.status(201).json(savedpasstoken);


    } catch (error) {
        console.log(error);
        res.status(500).send("some internal error occured")

    }


})

// soham --> pass soham123 , ishaan pass--> ishaan

// route for actually apdating the password
router.post("/company/changepass/:id/:token", async (req, res) => {
    try {


        const userid = req.params.id;
        const token = req.params.token;

        const { password, confirmpassword } = req.body;
        if (password !== confirmpassword) {
            return res.status(200).send("password and confirmation password are not the samw");
        }

        let tokendoc = await passUpdate.findOne({ _id: token, userid: userid });
        if (!tokendoc) {
            return res.status(200).send("Not allowed!")
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(password, salt)

        const newuser = {
            password: secPass
        }

        let updateduser = await companyUser.findByIdAndUpdate(userid, { $set: newuser }, { new: true })


        const htmlcode = `
    <h2>Hey ${updateduser.companyname}! Your Password has been successfully changed </h2>

    <p> You can now check other options for finding a NGO or can have an eye on the blogs section !!! </p>

    <p><center>Tune in for more content and news</center></p> 
    <h6><center>All rights reserved @Ecology Team </center></h6>

`

        params = {
            to: updateduser.email,
            subject: `Hey ${updateduser.companyname}! Link for changing the password`,
            html: htmlcode
        }



        mailindiv(params)


        res.status(201).json(updateduser)

    } catch (error) {
        res.status(500).send("some internal error occured")
        console.log(error);

    }




})


module.exports = router