// const router = require('express').Router();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authorize = require('./verifyToken');
const upload = require('../middleware/upload');
const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');
const userModel = require('../models/auth.model');
// const {registerValidation} = require('../validation');

router.post('/add',upload.array('avatar[]'), async(req, res)=> { //for single upload upload.single('avatar')
    //lets validate before we a user
// const {error} = registerValidation(req.body);
// if(error) return res.status(400).send(error.details[0].message);

// checking if the user is already in database
const emailExist = await userModel.findOne({email:req.body.email});
if(emailExist) return res.status(400).send('Email already exists');

//hash password
const salt = await bcrypt.genSalt(10);
const hashedpassword = await bcrypt.hash(req.body.password,salt);

    let newStudent = new userModel({
        fullname: req.body.fullname,
        email:req.body.email,
        password: hashedpassword,
        role:req.body.role
    });
    // for single file upload,
    // if(req.file){
    //     newStudent.avatar = req.file.path;
    // }
    //for multiple file upload
    if(req.files){
        let path = ''
        req.files.forEach(function(files, index,arr){
            path = path + files.path + ','
        })
      path = path.substring(0,path.lastIndexOf(","))
      newStudent.avatar = path
    }
    try{
        const savedUser = await newStudent.save();
        res.send({status:200,message:'User Added Successfully',newStudent:newStudent._id});
    }catch(err){
        res.status(400).send(err);
    }

    // newStudent.save(function(err,newStudent){
    //     if(err)
    //     res.send(err);
    //     else
    //     res.send({status:200,message:'User Added Successfully',studentobj:newStudent});
    // })
   
  });
//Login
router.post('/login', async(req, res)=> {
    const user = await userModel.findOne({email:req.body.email});
    if(!user) return res.status(400).send('Email not found');

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('invalid password');

    //create and assign a token
    const token = jwt.sign({_id:user._id},process.env.TOKEN_SECRET,{expiresIn:'5m'})
    // res.header('auth-token',token).send(token);
    res.send(token);
});


module.exports = router;