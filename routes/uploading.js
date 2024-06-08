const express = require('express')
const router = express.Router()
const multer = require('multer')  // multer is imported here
const shortid = require('shortid')
const path = require('path')

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


router.post('/uploadAdapter', upload.single('blogimg'),
  async (req, res) => {
    console.log("till here 1");
    
    if (!req.file) {
      return res.status(400).json({"success" : false, "msg" : "no file sent"})
    }

    const fileUrl = req.file.path;
    // console.log(req.file) -> you can pick up properties from here itself
    return res.status(200).json({
      "urls" : {
        "default": fileUrl
      }
      
      
    })

  })

module.exports = router;


/**

 */