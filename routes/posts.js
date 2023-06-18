const router = require('express').Router();
const {verifyToken,isAdmin} = require('./verifyToken');
const userModel = require('../models/auth.model');

router.get('/',verifyToken,(req,res)=>{

    // res.json({
    //     posts:{
    //         'title':'my first post',
    //         'desc':"random data you shouldn't access"
    //     }
    // });
    res.send(req.user);
    // userModel.findbyOne({_id:req.user});
});

router.post('/edit', verifyToken,isAdmin,(req,res)=>{
    res.send('Access Granted for edit');
});

router.get('/userlist',verifyToken,isAdmin,async (req,res)=>{
    const userlist = await userModel.find();
    res.send(userlist);
});


module.exports = router;