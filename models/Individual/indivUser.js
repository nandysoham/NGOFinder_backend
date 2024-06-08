const mongoose = require('mongoose')
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
  name:{
      type: String,
      required:true
  },
  about:{
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
  dob:{
    type:Date,
    required:true,
    trim :true,
    min: '1920-01-01',
    max: '2021-01-01'
  },
  phone:{
    type:"String",
    required:true,      
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
  profilePicture :[
    {img : {type : String}, public_id : {type: String}}
  ]
,
  updatedAt : Date,
},{timestamps:true});

const indivUser = mongoose.model('indivUser', userSchema)
module.exports = indivUser

/*

{
    "name":"Soham Nandy",
    "email" :"nandysoham16@gmail.com",
    "password" :"abcd$123",
    "dob":"2002-08-12",
    "phone":"1234567890",
    "addressline1" :"connaught place",
    "addressline2" :"delhi",
    "city" :"New delhi",
    "state" :"Delhi NCR",
    "country" :"India",
    "pincode" : "100001"
    
}

*/