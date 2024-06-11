const mongoose = require('mongoose')


const companypassupdateSchema = new mongoose.Schema({
  email:{
      type:String,
      required:true,
      unique:true
  },
  userid:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'companyUser'
  },
  updatedAt : Date,
},{timestamps:true});

const companypassUpdate = mongoose.model('companypassUpdate', companypassupdateSchema)
module.exports = companypassUpdate
