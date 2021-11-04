const express = require('express')
const router = express.Router()

const Blogentry = require("../models/blogentry")

router.route('/blog/recententries').get((req,res)=>{
    const {pageval,perPage} = req.query;
    const options = {
        page : parseInt(pageval,10),
        limit : parseInt(perPage,10)
    }


    Blogentry.paginate({},options)
        .then((blogs) => res.json(blogs))    // --> returns a json file conatining the name of the user to be found
        .catch(err => res.status(400).json('Errors: '+err));    // --> else will catch the errors
});


// by a specific author
router.route('/blogs/byauthor').get((req,res)=>{
    const {pageval,perPage, authorid} = req.query;
    const options = {
        page : parseInt(pageval,10),
        limit : parseInt(perPage,10)
    }


    Blogentry.paginate({userid:authorid},options)
        .then((blogs) => res.json(blogs))    // --> returns a json file conatining the name of the user to be found
        .catch(err => res.status(400).json('Errors: '+err));    // --> else will catch the errors
});


module.exports = router;
