var md5 = require('../utils/md5');
var db = require('../models/db');
var formidable = require('formidable');
var dateformat = require('dateformat');
var fs = require('fs');
var gm = require('gm');
var now = new Date();

exports.getsession = function(req, res, next){
    //若已经登录
    if(req.session.login == "1"){
        db.find("users", {username: req.session.username}, function(err, result){
                if(err){
                    res.json({"username": null, "code": "-2", "avatar": null});
                    return;
                }
                //console.log(result[0].avatar);
                req.session.avatar = result[0].avatar;
                res.json (
                    { "username": req.session.username, 
                      "code": "1", 
                      "avatar": result[0].avatar 
                    }
                );
        })
    } else {
        res.json({"username": null, "code": "-1", "avatar": null})
    }
}

exports.uploadAndCropAvatar = function(req, res, next){
    //得到图片
    var form = new formidable.IncomingForm();
    form.uploadDir = __dirname + '/../avatar';
    form.parse(req, function(err, fields, files){
        console.log(files, fields);
        var oldPath = files.image.path;
        var newPath = __dirname + '/../avatar/' + req.session.username + '.jpg';
        //改名
        fs.rename(oldPath, newPath, function(err){
            if(err){
                res.send("-1");//上传失败
                return;
            }
            //剪裁
            gm('./avatar/' + req.session.username + '.jpg' )
                .crop(fields.width, fields.height, fields.x, fields.y)
                .resize(100, 100)
                .write('./avatar/' + req.session.username + '.jpg', function(err){
                    if(err){
                        console.log(err);
                        res.send("-1");
                        return;
                    }
                    console.log("剪裁！");
                    //设置数据库中的头像
                    db.updateMany("users", 
                        {"username": req.session.username}, 
                        {$set: {"avatar": req.session.username }},
                        function(err, result){
                            if(err){
                                console.log(err);
                                return;
                            }
                            res.redirect("http://127.0.0.1:3000/#/user/" + req.session.username)
                            }
                        )
        })       
        })
    });
}

exports.checklogin = function(req, res, next){
    //console.log(req.session.username);
    // if(req.session.username){
    //     console.log("已经登录");
    //     res.json({"code": 1, "username": req.session.username});
    //     return;
    // }
    var username = req.body.username;
    var password = req.body.password;

    db.find("users", {"username": username}, function(err, result){
        if(err){
            //服务器错误
            res.json({"code": "-5", "username": ""});
            return;
        }
        if(result.length === 0){
            // 用户名不存在
            res.json({"code": "-1", "username": ""});
            return;
        }
        var use_md5_password = md5(md5(password).substr(1,3) + md5(password));
        var true_password = result[0].password;
        if(true_password === use_md5_password){
            req.session.login = '1';
            req.session.username = username;   
            res.json({"code": 1, "username": req.session.username, "avatar": result[0].avatar});  
        } else {
            //密码不正确
            res.json({"code": "-2", "username": ""});
        }
    })
}

exports.doRegister = function(req, res, next){
    var username = req.body.username;
    var password = req.body.password;
    //查看用户名是否已经存在
    db.find("users", {"username": username}, function(err, result){
        if(err){
            res.send("-5");//服务器错误
            return;
        }
        if(result.length != 0){
            res.send("-1");//用户名被占用
            return;
        }
        //将新用户插入到数据库中
        var use_md5_password = md5(md5(password).substr(1,3) + md5(password));
        db.insertOne("users", {
                    "username": username,
                    "password": use_md5_password,
                    "avatar": "default"
                }, function(err, result){
                    if(err){
                        res.send("-2");//注册失败
                        return;
                    }
                    req.session.login = '1';
                    req.session.username = username;  
                    res.send("1");//注册成功
                })
    })
}


exports.doLogOut = function(req, res, next){
    if (req.session) {
        // delete session object
        req.session.destroy(function(err) {
          if(err) {
            return next(err);
          } else {
            res.json({"logout": 1})
          }
        });
      }
}

exports.doPost = function(req, res, next){
    var username = req.session.username;
    var content = req.body.content;
    db.insertOne("posts", {
        "username": username,
        "datetime": dateformat(),
        "content": content,
    }, function(err, result){
        if(err){
            res.json({"code": "-3"});
            return;
        }
        console.log("ss");
        res.json({"code": "1"});
    })

}

exports.allPost = function(req, res, next){
    var page = parseInt(req.query.page);
    db.find("posts", {}, {"condition":{"datetime": -1}, "pageamount": 5, "page": page}, function(err, result){
        if(err){
            res.json({"code": "-1", "result": result});
            return;
        }
        res.json({"result": result, "page": page});
    })
}

exports.count = function(req, res, next){
    db.count("posts", function(err, result){
        if(err){
            console.log(err);
            return;
        }
        res.json({"count": result});
    })
}
