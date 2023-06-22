const Ann = require('../models/Announcement');
const User = require('../models/User');
let d = new Date();

  

exports.getHome=(req,res,next)=>{
 
  var d1 = d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear();

 Ann.findOneAndRemove({fDate: d1}).then(result => {
Ann.find().then(anns => {
  
  res.render('home',{ 
    User: req.session.user,
    Title:"Laz Ziya Fan Club",
    subTitle:"DUYURULAR",
    Anns:anns.reverse(),
    Path:'/',
    Authorized:req.session.loggedIn
    
  }); 
}).catch(e => {
  console.log(e);
 })
  

 }).catch(e => {
  console.log(e);
 })
      
}


      




exports.updateHome=(req,res,next)=>{

  
  const annId=req.params.annId;
  const subj=req.body.subj;
  const ann=req.body.ann;
Ann.findByIdAndUpdate(annId,{subject:subj , text:ann}).then(result => {

  var d1 = d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear();
      
     Ann.findOneAndRemove({fDate: d1}).then(result => {
        Ann.find().then(result=> {
          
          res.redirect('/');
        }).catch(e => {
          console.log(e);
         })
          
        
         }).catch(e => {
          console.log(e);
         })
        
    }).catch(e => {
      console.log(e);
    })
 
      
}


