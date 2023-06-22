const express=require('express');
const router=express.Router();
const path=require('path');
const rootDir=require('../util/path');

const home=require('../controllers/home');
const ann=require('../controllers/announcment');


router.post('/duyuru', ann.add);
router.get('/duyuru_yaz', ann.write);
router.get('/duyuru_duzenle/:annId', ann.change);






router.post('/guncel/:annId',home.updateHome);


exports.routes=router;

