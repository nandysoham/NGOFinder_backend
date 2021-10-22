const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');


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
    userid:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'indivUser'
    },
    slug : {
        type : String,
        required : true,
    },
    about:{
        type : String,

    },
    description :{
        type : String,
        required : true,
    },
    authorPicture :{
        type: String,
        required : true
    },
    blogPictures :[
        {img : {type : String}}
    ],
    updatedAt : Date,

},{timestamps: true});

blogSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Blog',blogSchema);