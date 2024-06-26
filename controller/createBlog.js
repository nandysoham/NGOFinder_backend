const Blog = require('../models/blogentry')

const shortid = require('shortid')  // shortid is imported here
const slugify = require('slugify')


exports.createBlog= (req,res,next)=>{

    console.log("this is from the request");

    const { title,name,about, description, authorPicture} =req.body;
    console.log(req.body)
    // blogPictures will not be avalable in the body of the request
    // console.log("this is from the controller")
    // console.log(title);
    // console.log(name);

    let blogPictures = [];
    if(req.files.length > 0){
        blogPictures = req.files.map(file =>{
            return {img : file.path}
        })
        // attach the first picture as an asset to be sent on mails
        req.headerImg = req.files[0].path
    }
    console.log(req.headerImg)
    console.log(req.files);
    // console.log(blogPictures);
    // am ap is applied here


    const blog = new Blog({
        title: title,
        name : name,
        about:about,
        slug : slugify(title),
        userid : req.user.id,
        authorPicture : authorPicture,
        description,
        blogPictures
    })

    blog.save((error, blog)=>{
        if(error) return res.status(400).json({error:error})
        if(blog){
            req.blog = blog
            next()
            // return res.status(201).json({success:"success"})
        }
    })
    
    


}