const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    blogid:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Blog'
    },
    userid:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'indivUser'
    },
    description:{
        type: String,
        required : true
    },
    updatedAt : Date,

});


module.exports = mongoose.model('commentsentry',commentSchema);