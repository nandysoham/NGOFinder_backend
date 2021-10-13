const express = require('express')
const router = express.Router()
const multer = require('multer')  // multer is imported here
const shortid = require('shortid')
const path = require('path')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const mailindiv = require("../../controller/Mailer/MailIndiv")

const indivUser = require("../../models/Individual/indivUser")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), '../Useruploads'))
    },
    filename: function (req, file, cb) {
        cb(null, shortid.generate() + '-' + file.originalname)  // file.originalname is the property by multer which can be seen from postman
    }
})

var upload = multer({ storage: storage })

const JWT_SECRET = "soham$isagoodboy"


// ROUTE 1 FOR CREATING USER
router.post('/createuser',
 upload.array('profilePicture'),
 async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body)

    try {
        let user = await indivUser.findOne({ email: req.body.email, phone: req.body.phone });

        if (user) {
            return res.status(500).json({ error: "sorry the email already exists in our system" })
        }
        console.log(req.body)
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt)


        let profilePicture = [];
        console.log(req.files);
    
        if (req.files.length > 0) {
            profilePicture = req.files.map(file => {
                return { img: file.filename }
            })
        }

        user = await indivUser.create({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            dob: req.body.dob,
            addressline1: req.body.addressline1,
            addressline2: req.body.addressline2,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
            pincode: req.body.pincode,
            password: secPass,
            profilePicture
        })


        const data = {
            user: {
                id: user.id
            }
        }


        // creating the token 
        // it signs this data which will be derived from the database
        const authtoken = jwt.sign(data, JWT_SECRET)

        res.json(authtoken)

        const htmlcode=`

        <div class="container" style="background-image:url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1774&q=80') ; color: azure; background-repeat: no-repeat; background-position: center; min-height: 100vh;">
        <h1> <center> Hey ${req.body.name} Welcome to NGO Helper!!! </center> </h1> <br>
                <h3> <center> Thanks for joining us! we are glad to help you in your journey to choose a NGo</center> </h3>
                <p>Search for NGOs near you on our maps and choose the one which suits you the best
                    Also don't forget to have an eye over the blog section which has some amazing blogs describing real life 
                    incidences and stories.
                
                </p>
                </div>
                <p><center>Tune in for more content and news</center></p> 
                <h6><center>All rights reserved @Ecology Team </center></h6>
        

        `


        const params = {
            to:req.body.email,
            subject:"Welcome to NGO helper",
            html:htmlcode

        }

        mailindiv(params);




    } catch (error) {
        console.log(error);
        return res.status(500).send("some internal error occured")
    }

})



module.exports = router;

/*

[
    body('name', "enter a valid name").isLength({ min: 3 }),
    body('email', "enter a valid email").isEmail(),
    body('password').isLength({ min: 5 }),
    body('addressline1', "enter a valid address ").isLength({ min: 2 }),
    body('city', "enter a valid city name ").isLength({ min: 2 }),
    body('state', "enter a valid state name ").isLength({ min: 2 }),
    body('country', "enter a valid country name ").isLength({ min: 2 }),
    body('pincode', "enter a valid pincode").isLength({ min: 2 }),
    body('phone', "enter a valid phonenumber ").isLength({ min: 5 })

],

*/

/*
A comment -->
while using express validator --> entire data is form data and no raw json is given
But here in the case express validator throws error


whereas it wouldn't have done so had we used raw json but there multer would throw a error
req.body is not found

For the time being express validator is down

*/