const express = require('express')
const router = express.Router()

const Blogentry = require("../models/blogentry")


const client = require("../controller/redisConnect")

// ref: https://www.digitalocean.com/community/tutorials/how-to-implement-caching-in-node-js-using-redis
/**
 * 
 * Help docs: FLUSHDB -> flushes the active db
 */
const findRecentEntriesCached = async (db, client, title, pageval, perPage)=>{
    const cachedBlogs = await client.get(title);
    if(cachedBlogs){
        return JSON.parse(cachedBlogs);
    }
    else{
        const options = {
                page : parseInt(pageval,10),
                limit : parseInt(perPage,10)
            }
            
        const blogs = await Blogentry.paginate({},options);
        await client.set(title, JSON.stringify(blogs) , {
            EX: 3*60,            // value of cache duration in s
            NX: false});         // set method should set a value when it doesn't exist in redis
        return blogs;
    }
}


router.route('/blog/recententries').get(async (req,res)=>{
    const {pageval,perPage} = req.query;
    
    const blogs = await findRecentEntriesCached(Blogentry, client, `recentBlogEntries_${pageval}_${perPage}`, pageval, perPage )
    return res.status(200).json(blogs);

    // const options = {
    //     page : parseInt(pageval,10),
    //     limit : parseInt(perPage,10)
    // }


    // Blogentry.paginate({},options)
    //     .then((blogs) => res.json(blogs))    // --> returns a json file conatining the name of the user to be found
    //     .catch(err => res.status(400).json('Errors: '+err));    // --> else will catch the errors
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
