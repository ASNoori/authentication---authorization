const Joi = require("joi");
const userModel = require("./models/auth.model");
const bcrypt = require('bcryptjs');


exports.authSchema = Joi.object({
  fullname: Joi.string().max(5).required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().required(),
  role: Joi.string().valid("user", "admin").default("user").optional(),
});


// module.exports.registerValidation = registerValidation;
// module.exports = {authSchema};
