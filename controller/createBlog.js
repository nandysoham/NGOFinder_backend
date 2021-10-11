const Blog = require('../models/blogentry')

const shortid = require('shortid')  // shortid is imported here
const slugify = require('slugify')


exports.createBlog= (req,res,next)=>{

    console.log("this is from the request");

    const { title,name, description} =req.body;
    console.log(req.body)
    // blogPictures will not be avalable in the body of the request
    // console.log("this is from the controller")
    // console.log(title);
    // console.log(name);

    let blogPictures = [];
    if(req.files.length > 0){
        blogPictures = req.files.map(file =>{
            return {img : file.filename}
        })
    }
    // am ap is applied here


    const blog = new Blog({
        title: title,
        name : name,
        slug : slugify(title),
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