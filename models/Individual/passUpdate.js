const mongoose = require('mongoose')
const { Schema } = mongoose;

const passupdateSchema = new mongoose.Schema({
  email:{
      type:String,
      required:true,
      unique:true
  },
  userid:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'indivUser'
  },
  updatedAt : Date,
},{timestamps:true});

const passUpdate = mongoose.model('passupdate', passupdateSchema)
module.exports = passUpdate
