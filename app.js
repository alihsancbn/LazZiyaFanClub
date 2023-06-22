const http = require('http');
const express = require('express');
const parser = require('body-parser');
const path = require('path');
const rootDir = require('./util/path');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const MONGO_URI = "mongodb+srv://alihsancbn:Ali..433@lazziyafanclub.hycbt20.mongodb.net/LZFCdb?retryWrites=true&w=majority";

const mongoose = require('mongoose');
const app = express();

const Store = new MongoDBStore({
    uri:MONGO_URI,
    collection:'sessions'
})

app.set('view engine','ejs');
app.set('views','views');

const hata = require('./controllers/error');

const adminData = require('./routes/admin');
const publicData = require('./routes/public');
const authData = require('./routes/auth');


app.use(parser.urlencoded({extended:true}));
app.use(express.static(path.join(rootDir,'public')));

app.use(session({secret:'gizli sifrem', resave:false, saveUninitialized:false, store:Store}));

app.use(authData.routes);
app.use(adminData.routes);
app.use(publicData.routes);


app.use(hata.goster404);


mongoose.connect(MONGO_URI)
.then(result => {
    app.listen(process.env.PORT ||3000);
})
.catch(err => {
    console.log(err);
})

