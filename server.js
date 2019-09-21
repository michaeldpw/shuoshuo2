var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var session = require('express-session');
var router = require('./controller/router');
var path = require('path');
var app = express();

const port = process.env.PORT || 5000;


app.use(express.static("./public"));
app.use("/avatar", express.static("./avatar"));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))
const config = {
    origin: 'http://127.0.0.1:' + process.env.PORT || 'http://127.0.0.1:8000',
    credentials: true,
};
app.use(cors(config));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    // app.get('*', (req, res) => {
    //     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')); 
    // });
}


app.get('/getsession', router.getsession);
app.post('/checklogin', router.checklogin);
app.post('/doregister', router.doRegister);
app.post('/uploadandcropavatar', router.uploadAndCropAvatar);
app.post('/dopost', router.doPost);
app.get('/allpost', router.allPost);
app.get('/count', router.count);
app.get('/logout', router.doLogOut);

// if(process.env.NODE_ENV === 'production'){
//     app.use(express.static( 'client/build' ));

//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')); 
//     });
// }

app.listen(port);