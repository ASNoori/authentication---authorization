const jwt = require('jsonwebtoken');
const userModel = require('../models/auth.model');

exports.verifyToken = async function(req,res,next){

    const token = req.header('auth-token');
    if(!token) return res.status(401).send('Access Denied');

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = await userModel.findById(verified._id);
        next();
      }catch(err){
      res.status(401).send('Invalid Token');
      }
    
}
exports.isAdmin = function (req,res,next){
  console.log(req.user.role)
  if(req.user.role === 'user'){
   return res.status(401).send('Access Denied , you must be admin');  }
  next();
}

