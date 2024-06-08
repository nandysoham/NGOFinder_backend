// needs change

const express = require('express')
const router = express.Router()
const multer = require('multer')  // multer is imported here
const shortid = require('shortid')
const path = require('path')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');


const mailindiv = require("../../controller/Mailer/MailIndiv")

const companyUser = require('../../models/Company/companyUser')

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, path.join(path.dirname(__dirname), '../CompanyUseruploads'))
//     },
//     filename: function (req, file, cb) {
//         cb(null, shortid.generate() + '-' + file.originalname)  // file.originalname is the property by multer which can be seen from postman
//     }
// })

// var upload = multer({ storage: storage })


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
    storage: storage ,
    limits: {
      fileSize: 50 * 1024 * 1024, // keep images size < 50 MB
    }
  })
const JWT_SECRET = "soham$isagoodboy"


// ROUTE 1 FOR CREATING USER
router.post('/company/createuser',
 upload.array('companyPictures'),
 async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body)

    try {
        let user = await companyUser.findOne({ email: req.body.email });

        if (user) {
            return res.status(500).json({ error: "sorry the email already exists in our system" })
        }
        console.log(req.body)
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt)


        let companyPictures = [];
        // console.log(req.files);
        // console.log(res.req);

        // https://stackoverflow.com/a/45890365 --> for public_id
        if (req.files.length > 0) {
            companyPictures = req.files.map(file => {
                return { img: file.path, public_id : file.filename }
            })
        }

        user = await companyUser.create({
            companyname: req.body.companyname,
            regno:req.body.regno,
            parentcompany:req.body.parentcompany,
            email: req.body.email,
            contactperson: req.body.contactperson,
            about: req.body.about,
            website: req.body.website,
            phone: req.body.phone,
            phone2: req.body.phone2,
            established: req.body.established,
            addressline1: req.body.addressline1,
            addressline2: req.body.addressline2,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
            pincode: req.body.pincode,
            lattitude:req.body.lattitude,
            longitude: req.body.longitude,
            password: secPass,
            companyPictures
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
        <h1> <center> Hey ${req.body.companyname} Welcome to NGO Helper!!! </center> </h1> <br>
                <h3> <center> Thanks for joining us! we are glad to help you in your vision</center> </h3>
                <p>Search for enthusiasts near you  and grow your community!!
                    Also don't forget to have an eye over the blog section which has some amazing blogs describing real life 
                    incidences and stories. And if you want to share yours please don't hesitate!
                
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
