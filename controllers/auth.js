const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.Log = (req,res,next)=>{
  
    res.render('logIn', 
    { 
       
      Path:'/oturum',
      Title:"Giriş Yap",
      subTitle:"GİRİŞ YAP",
      Authorized:req.session.loggedIn
    });
  
  
}

  exports.In = (req,res,next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email:email})
    .then(user => {
     if(!user){
      return res.redirect('/giris');
     }

     bcrypt
     .compare(password,user.password)
     .then(correct => {
       if(correct) {
        req.session.loggedIn = true;
        req.session.user = user;
       return req.session.save(info => {
           res.redirect('/');
        })
       }
       res.redirect('/giris');
     }).catch(e => {
      console.log(e);
      res.redirect('/giris');

     })

    })
    .catch(e => {
      console.log(e);
      res.redirect('/giris');
    })   
}


  exports.getOut = (req,res,next) => {
    req.session.destroy(result => {
        
      res.redirect('/');
    })
      
}

exports.sign = (req,res,next)=>{

    res.render('signUp',
    {   
      Path:'/kayit',
      Title:"Kayıt Ol",
      subTitle:"KAYIT OL",
      Authorized:req.session.loggedIn
    });

}
    
exports.up = (req,res,next) => {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    
    User.findOne({email:email})
    .then(userEmail => {
      if(userEmail){
        return res.redirect('/kayit');
      }
      User.findOne({username: username})
      .then(Username => {
        if(Username){
          return res.redirect('/kayit');
        }
        
      })
      .catch(e => {console.log(e);})

      return bcrypt
      .hash(password,12)
      .then(hashedPassword => {
        const user = new User({
          email: email,
          username: username,
          password: hashedPassword
        });
        return user.save();
      })
      .then(result => {
        res.redirect('/giris');
      })
    })
    
    .catch(e => {console.log(e);})    
       
}