var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var session = require('express-session');
var router = require('./controller/router');
var path = require('path');
var app = express();

const port = process.env.PORT || 9000 ;


app.use(express.static("./public"));
app.use("/avatar", express.static("./avatar"));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))
// const config = {
//     // origin: process.env.baseURL + ':' + process.env.PORT || 'http://127.0.0.1:8000',
//     origin: "https://reactmernstack1.herokuapp.com:" + port,
//     credentials: true,
// };
// app.use(cors(config));
app.use(cors());
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
app.post('/postcomment', router.postComment);
app.get('/dolike', router.doLike);
app.get('/mypost', router.myPost);
app.get('/allpost', router.allPost);
app.get('/alluser', router.allUser);
app.get('/count', router.count);
app.get('/getpostwithid', router.getPostWithId)
app.get('/logout', router.doLogOut);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static( 'client/build' ));

    // app.get('*', (req, res) => {
    //     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')); 
    // });
}

app.listen(port, ()=>{
    console.log(port);
});