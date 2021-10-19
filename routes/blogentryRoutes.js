const express = require('express')
const router = express.Router()
const multer = require('multer')  // multer is imported here
const shortid = require('shortid')
const path = require('path')

const {createBlog} = require("../controller/createBlog")
const {mailer} = require("../controller/sendnewsmail")

// creating a middleware for multer
const fetchUser = require("../middleware/fetchindivuser")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname),'uploads'))
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + '-' + file.originalname)  // file.originalname is the property by multer which can be seen from postman
    }
  })
   
  var upload = multer({ storage: storage })





router.post('/blog/create',upload.array('blogPictures'),fetchUser,createBlog,mailer)  //upload.single() --> for profile photo

module.exports = router;