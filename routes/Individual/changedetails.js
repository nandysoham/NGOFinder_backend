const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer')  // multer is imported here
const path = require('path')

const mailindiv = require("../../controller/Mailer/MailIndiv")
const indivUser = require("../../models/Individual/indivUser")

const fetchUser = require("../../middleware/fetchindivuser")
// raw data json body



const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: (req, file) => {
        const folderPath = `EcoImg/IndivProfile`; // Update the folder path here
        const fileExtension = path.extname(file.originalname).substring(1);
        const publicId = `${file.fieldname}-${Date.now()}`;

        return {
            folder: folderPath,
            public_id: publicId,
            format: fileExtension,
        };
    },
});

var upload = multer({
    storage: storage,
    limits: {
        fileSize: 50 * 1024 * 1024, // keep images size < 50 MB
    }
})
router.put('/indiv/updateuserdetails', fetchUser, upload.array('profilePicture'), async (req, res) => {

    try {
        const {
            name,
            about,
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

        if(about){
            newIndivUser.about = about
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

        const id = req.user.id;
        userindiv = await indivUser.findById(id);
        if (!userindiv) { return res.status(404).send("User doesnot doesnot exist") }

        if (req.files.length > 0) {
            profilePicture = req.files.map(file => {
                return { img: file.path , public_id : file.filename}
            })

            let prevProfilePicture = userindiv.profilePicture
            try {
                prevProfilePicture.forEach(async (obj) => {
                    cloudinary.api
                        .delete_resources_by_prefix(obj.public_id)
                        .then(result => console.log(result))
                        .catch(err => console.log(err));

                    
                })
            }
            catch (e) {
                console.log(e)
                console.log("Unable to delete previous resources from cloud")
            }
        }


        newIndivUser.profilePicture = profilePicture

        // console.log(newIndivUser);
        userindiv = await indivUser.findByIdAndUpdate(id, { $set: newIndivUser }, { new: true });
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