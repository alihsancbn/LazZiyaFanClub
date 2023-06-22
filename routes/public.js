const express=require('express');
const router=express.Router();
const home = require('../controllers/home');
const path=require('path');
const rootDir=require('../util/path');

router.get('/',home.getHome);

exports.routes=router;
