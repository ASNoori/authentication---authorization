const mongoose = require('mongoose');
// const validate = require('mongoose-validator');

 
//create schema for database
const userSchema = mongoose.Schema({
    StudId:Number,
    fullname: {
      type:String,
      required:true,
      maxLength:5
   },
   
    email:{
      type:String,
      required:true,
      unique:true,
      match: /.+\@.+\..+/
    },
    password:{
        type:String,
        required:true
    },
    role: {
      type: String,
      default: 'user'
 
  },
  avatar:{
     type: String
  }

 });

//  Short Version
//  const userSchema = mongoose.Schema({
//   StudId:Number,
//   fullname: String,
//   email:String,
//   password:String,
//   role:String

// });


 //create model
const userModel = mongoose.model("User",userSchema);

 module.exports = userModel;
 