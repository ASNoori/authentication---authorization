const Joi = require('joi');
const userModel = require("./models/auth.model");
const bcrypt = require('bcryptjs');
const auth = require('./joischema')
exports.register = async (req, res, next) => {
    try {
      const body = req.body;
      const { error, value } = auth.authSchema.validate(body);
      if (error) return res.status(400).send({ error: error.details[0].message });
      // checking if the user is already in database
      const emailExist = await userModel.findOne({ email: value.email });
      if (emailExist) return res.status(400).send("Email already exists");
  
      //hash password
      const salt = await bcrypt.genSalt(10);
      const hashedpassword = await bcrypt.hash(value.password,salt);
  
          let newStudent = new userModel({
              fullname: value.fullname,
              email:value.email,
              password: hashedpassword,
              role:value.role
          });
               const savedUser = await newStudent.save();
              res.send({status:200,message:'User Added Successfully',newStudent:newStudent._id});
  
      next();
    } catch (err) {
      res.status(400).send(err.message);
  
    }
  };
  