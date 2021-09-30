const express = require('express')
const router = express.Router()

const Blogentry = require("../models/blogentry")

router.route('/blog/recententries').get((req,res)=>{
    Blogentry.find()
        .then((blogs) => res.json(blogs))    // --> returns a json file conatining the name of the user to be found
        .catch(err => res.status(400).json('Errors: '+err));    // --> else will catch the errors
});

module.exports = router;
