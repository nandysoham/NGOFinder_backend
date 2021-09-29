const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    name: {
        type : String,
        required : true,
        trim: true
    },
    slug : {
        type : String,
        required : true,
        unique : true
    },
    description :{
        type : String,
        required : true,
    },
    blogPictures :[
        {img : {type : String}}
    ],
    updatedAt : Date,

},{timestamps: true});


module.exports = mongoose.model('Blog',blogSchema);