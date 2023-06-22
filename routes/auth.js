const express=require('express');
const router=express.Router();
const path=require('path');
const auth = require('../controllers/auth');

router.get('/kayit', auth.sign);
router.post('/kayit', auth.up);

router.get('/giris', auth.Log);
router.post('/giris',auth.In);


router.get('/cikis', auth.getOut);

exports.routes=router;