const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer')  // multer is imported here
const MailIndiv = require("../../controller/Mailer/MailIndiv")
const companyUser = require("../../models/Company/companyUser")
const path = require('path')

const fetchindivUser = require("../../middleware/fetchindivUser.js")
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
        const folderPath = `EcoImg/CompanyProfile`; // Update the folder path here
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

router.put('/company/updateuserdetails', fetchindivUser, upload.array('companyPictures'), async (req, res) => {

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
            longitude,
            about,
            website
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

        if (website) {
            newcompanyUser.website = website
        }

        if (about) {
            newcompanyUser.about = about
        }

        if (parentcompany) {
            newcompanyUser.parentcompany = parentcompany
        }

        if (contactperson) {
            newcompanyUser.contactperson = contactperson
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

        let companyPictures = [];


        const id = req.user.id
        usercompany = await companyUser.findById(id);
        if (!usercompany) { return res.status(404).send("User doesnot doesnot exist") }

        if (req.files.length > 0) {
            companyPictures = req.files.map(file => {
                return { img: file.path , public_id : file.filename}
            })

            let prevCompanyPictures = usercompany.companyPictures
            try {
                prevCompanyPictures.forEach(async (obj) => {
                    cloudinary.api
                        .delete_resources_by_prefix(obj.public_id)
                        .then(result => console.log(result))
                        .catch(err => console.log(err));

                    // try {
                    //     const results = await cloudinary.uploader.destroy(
                    //       obj.public_id, { invalidate: true, resource_type: "image" })
                    //     console.log(results)
                    //   }
                    //   catch (e) {
                    //     res.status(500).json('Something went wrong')
                    //   }
                })
            }
            catch (e) {
                console.log(e)
                console.log("Unable to delete previous resources from cloud")
            }
        }


        newcompanyUser.companyPictures = companyPictures
        // checking whether the request is from the same user

        // if (usercompany._id.toString() !== req.user.id) {
        //     return res.status(401).send("not allowed")
        // }


        // if upto this  --> everything is fine upto now
        console.log(newcompanyUser);
        usercompany = await companyUser.findByIdAndUpdate(id, { $set: newcompanyUser }, { new: true });
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
            to: usercompany.email,
            subject: "Cheers!!! Details successfully updated",
            html: htmlcode
        }

        MailIndiv(params)

    } catch (error) {
        console.log(error);
        res.status(500).send("some internal server error occured")

    }

})

module.exports = router;