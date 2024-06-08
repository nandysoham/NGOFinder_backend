const express = require('express')
const router = express.Router()
const multer = require('multer')  // multer is imported here
const shortid = require('shortid')
const path = require('path')
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const {createBlog} = require("../controller/createBlog")
const {mailer} = require("../controller/sendnewsmail")

// creating a middleware for multer
const fetchUser = require("../middleware/fetchindivuser")

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    const folderPath = `EcoImg/BlogImages`; // Update the folder path here
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
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, path.join(path.dirname(__dirname),'uploads'))
//     },
//     filename: function (req, file, cb) {
//       cb(null, shortid.generate() + '-' + file.originalname)  // file.originalname is the property by multer which can be seen from postman
//     }
//   })
   
//   var upload = multer({ storage: storage })







router.post('/blog/create',upload.array('blogPictures'),fetchUser,createBlog,mailer)  //upload.single() --> for profile photo

module.exports = router;