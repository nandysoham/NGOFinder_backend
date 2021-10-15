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

const companypassupdate = mongoose.model('companypassupdate', companypassupdateSchema)
module.exports = companypassupdate
