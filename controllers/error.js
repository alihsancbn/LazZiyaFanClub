const User=require('../models/User');


exports.goster404=(req,res,next)=>{
    
    res.status(404).render('error', {
        
        Path:'',
        Title:"HATA!!!",
        subTitle:"SAYFA BULUNAMADI",
        Authorized:req.session.loggedIn,
        
    });
    
    
    }