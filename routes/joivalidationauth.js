// const router = require('express').Router();
const express = require('express');
const router = express.Router();

const validation = require('../joivalidation');

router.post('/addvalidation',validation.register)
   

module.exports = router;