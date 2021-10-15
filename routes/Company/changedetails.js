const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const mailindiv = require("../../controller/Mailer/MailIndiv")
const companyUser = require("../../models/Company/companyUser")

const fetchUser = require("../../middleware/fetchindivUser")
// raw data json body
router.put('/company/updateuserdetails/:id', fetchUser, async (req, res) => {

    try {
        const {
            companyname,
            regno,
            email,
            established,
            parentcompany,
            contactperson,
            phone,
            phone2,
            addressline1,
            addressline2,
            city,
            state,
            country,
            pincode,
            lattitude,
            longitude
        } = req.body;
        const newcompanyUser = {}
        if (companyname) {
            newcompanyUser.companyname = companyname
        }

        if (regno) {
            newcompanyUser.regno = regno
        }

        if (email) {
            newcompanyUser.email = email
        }

        if(parentcompany){
            newcompanyUser.parentcompany= parentcompany
        }

        if(contactperson){
            newcompanyUser.contactperson= contactperson
        }

        if (established) {
            newcompanyUser.established = established
        }

        if (phone) {
            newcompanyUser.phone = phone
        }

        if (phone2) {
            newcompanyUser.phone2 = phone2
        }

        if (addressline1) {
            newcompanyUser.addressline1 = addressline1
        }

        if (addressline2) {
            newcompanyUser.addressline2 = addressline2
        }

        if (city) {
            newcompanyUser.city = city
        }

        if (state) {
            newcompanyUser.state = state
        }

        if (country) {
            newcompanyUser.country = country
        }

        if (pincode) {
            newcompanyUser.pincode = pincode
        }

        if (lattitude) {
            newcompanyUser.lattitide = lattitude
        }

        if (longitude) {
            newcompanyUser.longitude = longitude
        }

        usercompany = await companyUser.findById(req.params.id);
        if (!usercompany) { return res.status(404).send("User doesnot doesnot exist") }

        // checking whether the request is from the same user

        if (usercompany._id.toString() !== req.user.id) {
            return res.status(401).send("not allowed")
        }


        // if upto this  --> everything is fine upto now
        console.log(newcompanyUser);
        usercompany = await companyUser.findByIdAndUpdate(req.params.id, { $set: newcompanyUser }, { new: true });
        res.json(usercompany);


        const htmlcode = `
        <div class="container" style="background-image:url('https://images.unsplash.com/photo-1455218873509-8097305ee378?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=774&q=80') ; color: white; background-repeat: no-repeat; background-position: center; min-height: 100vh;">

            <h1> <center> Hey ${usercompany.companyname}! Your details has been successfully updated  </center> </h1> <br>
            <h3> <center> Thanks for being with us! we are glad to help you in your journey to choose a NGO</center> </h3>
            <p>Search for people around you who might be interested in joining your NGO!!
                Also don't forget to have an eye over the blog section which has some amazing blogs describing real life 
                incidences and stories.
            
            </p>

        </div>
            <p><center>Tune in for more content and news</center></p> 
            <h6><center>All rights reserved @Ecology Team </center></h6>
    
        `

        const params = {
            to:usercompany.email,
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