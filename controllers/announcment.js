const Ann = require('../models/Announcement');







exports.write = (req, res, next) => {
    
    res.render('addAnn',
        {   
            Path: '/duyuru_yaz',
            Title: "Duyuru Yaz",
            subTitle: "DUYURU YAZ",
            Authorized:req.session.loggedIn,
            User: req.session.user,
            
        });


}


    



exports.change = (req, res, next) => {
    let d = new Date();
    let d1 = d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear();
    const annId = req.params.annId;
    Ann.findById(annId).then(ann => {

        res.render('updateAnn',
        {  
            
            Path: '/duyuru_duzenle',
            Title: "Duyuru Düzenle",
            subTitle: "DUYURU DÜZENLE",
            Ann:ann,
            Authorized:req.session.loggedIn,
            User: req.session.user,
            Today:d1
        });

    }).catch(e => {
        console.log(e);
    })
     
       
    
    


}

exports.add = (req, res, next) => {
    
    const subj = req.body.subj;
    const ann = req.body.ann;
    let d = new Date();
    var d1 = d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear();
    var d2 = (d.getDate()+1)+"/"+(d.getMonth()+1)+"/"+d.getFullYear();
const newAnn = new Ann({
    subject: subj,
    text: ann,
    sDate:d1,
    fDate:d2,
    author:req.session.user.username
});

newAnn.save();
res.redirect('/');

}



