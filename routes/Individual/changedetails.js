const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const mailindiv = require("../../controller/Mailer/MailIndiv")
const indivUser = require("../../models/Individual/indivUser")

const fetchUser = require("../../middleware/fetchindivuser")
// raw data json body
router.put('/indiv/updateuserdetails/:id', fetchUser, async (req, res) => {

    try {
        const {
            name,
            email,
            dob,
            phone,
            addressline1,
            addressline2,
            city,
            state,
            country,
            pincode
        } = req.body;
        const newIndivUser = {}
        if (name) {
            newIndivUser.name = name
        }

        if (email) {
            newIndivUser.email = email
        }

        if (dob) {
            newIndivUser.dob = dob
        }

        if (phone) {
            newIndivUser.phone = phone
        }

        if (addressline1) {
            newIndivUser.addressline1 = addressline1
        }

        if (addressline2) {
            newIndivUser.addressline2 = addressline2
        }

        if (city) {
            newIndivUser.city = city
        }

        if (state) {
            newIndivUser.state = state
        }

        if (country) {
            newIndivUser.country = country
        }

        if (pincode) {
            newIndivUser.pincode = pincode
        }


        userindiv = await indivUser.findById(req.params.id);
        if (!userindiv) { return res.status(404).send("User doesnot doesnot exist") }

        // checking whether the request is from the same user

        if (userindiv._id.toString() !== req.user.id) {
            return res.status(401).send("not allowed")
        }


        // if upto this  --> everything is fine upto now
        console.log(newIndivUser);
        userindiv = await indivUser.findByIdAndUpdate(req.params.id, { $set: newIndivUser }, { new: true });
        res.json(userindiv);


        const htmlcode = `
        <div class="container" style="background-image:url('https://images.unsplash.com/photo-1455218873509-8097305ee378?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=774&q=80') ; color: white; background-repeat: no-repeat; background-position: center; min-height: 100vh;">

            <h1> <center> Hey ${userindiv.name}! Your details has been successfully updated  </center> </h1> <br>
            <h3> <center> Thanks for being with us! we are glad to help you in your journey to choose a NGO</center> </h3>
            <p>Search for NGOs near you on our maps and choose the one which suits you the best
                Also don't forget to have an eye over the blog section which has some amazing blogs describing real life 
                incidences and stories.
            
            </p>

        </div>
            <p><center>Tune in for more content and news</center></p> 
            <h6><center>All rights reserved @Ecology Team </center></h6>
    
        `

        const params = {
            to:userindiv.email,
            subject:"Cheers!!! Details successfully updated",
            html:htmlcode
        }

        mailindiv(params)

    } catch (error) {
        console.log(error);
        res.status(500).send("some internal server error occured")

    }

})

module.exports = router;