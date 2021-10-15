const mongoose = require('mongoose')


const companySchema = new mongoose.Schema({
  companyname:{
      type: String,
      required:true
  },
  regno:{
    type:String,
    required: true
  },
  parentcompany:{
      type:String
  },
  email:{
      type:String,
      required:true,
      unique:true
  },
  password: {
    type:String,
    required:true
  },
  established:{
    type:Date,
    required:true,
    trim :true,
    min: '1920-01-01',
    max: '2021-01-01'
  },
  contactperson:{
    type:String
  },
  phone:{
    type:String,
    required:true,      
  },
  phone2:{
    type:String
  },
  addressline1:{
    type:String,
    required:true
  },
  addressline2:{
    type:String
  },
  city:{
    type:String,
    required:true
  },
  state:{
    type:String,
    required:true
  },
  country:{
      type:String,
      required:true
  },
  pincode:{
      type:String,
      required:true
  },
  lattitude:{
      type:String,
      required:true
  },
  longitude:{
      type:String,
      required:true
  },
  companyPictures :[
    {img : {type : String}}
  ]
,
  updatedAt : Date,
},{timestamps:true});

const companyUser = mongoose.model('companyUser', companySchema)
module.exports = companyUser
