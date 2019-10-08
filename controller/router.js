var md5 = require('../utils/md5');
var db = require('../models/db');
var formidable = require('formidable');
const date = require('date-and-time');
var ObjectID = require('mongodb').ObjectID;
var fs = require('fs');
var gm = require('gm');
const now = new Date();

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
        if(!files.image.path){
            console.log("上传照片异常！")
            return;
        }
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
                            }
                        )
        })       
        })
    });
}

exports.checklogin = function(req, res, next){
    var username = req.body.username;
    var password = req.body.password;

    db.find("users", {"username": username}, function(err, result){
        if(err){
            //服务器错误
            res.status(401).json({"error": "Server Error", "username": null});
            return;
        }
        if(result.length === 0){
            // 用户名不存在
            res.status(401).json({"error": "Username does not exist!"});
            return;
        }
        var use_md5_password = md5(md5(password).substr(1,3) + md5(password));
        var true_password = result[0].password;
        if(true_password === use_md5_password){
            req.session.login = '1';
            req.session.username = username;   
            res.json({"error": "0", "username": req.session.username, "avatar": result[0].avatar});  
        } else {
            //密码不正确
            // res.json({"error": "Incorrect password!", "username": null});
            res.status(401).json({"error" : "Incorrect password!"})
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

exports.doPost = function(req, res){
    var username = req.body.user;
    var content = req.body.content;
    db.insertOne("posts", {
        "username": username,
        "datetime": date.format(now, 'YYYY/MM/DD HH:mm:ss'),
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

exports.myPost = function (req, res, next){
    console.log(req.query);
    var username = req.query.username;
    db.find("posts", {"username": username}, function(err, result){
        if(err){
            res.json({"code": "-1", "result": result});
            return;
        }
        res.json({"result": result})
    })
}

exports.allUser = function (req, res, next){
    db.find("users", {}, function(err, result){
        if(err){
            res.json({"code": "-1", "result": result});
            return;
        }
        res.json({"result": result})
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

//通过post id 查找post
exports.getPostWithId = function(req, res, next){
    var pid = req.query.pid.toString();
    db.find("posts", {"_id": ObjectID(pid)}, function(err, result){
        if(err){
            res.json({"code": "-1", "result": result});
            return;
        }
        //判断和返回评论和点赞个数
        if(result[0].comments && result[0].likes){
            var comment_number = result[0].comments.length;
            var like_number = result[0].likes.length;
            res.json({"result": result, "comment_number": comment_number, "like_number": like_number})
        } else if (!result[0].comments && result[0].likes){
            var like_number = result[0].likes.length;
            res.json({"result": result, "comment_number": 0, "like_number": like_number})
        } else if(result[0].comments && !result[0].likes) {
            var comment_number = result[0].comments.length;
            res.json({"result": result, "comment_number": comment_number, "like_number": 0})
        } else {
            res.json({"result": result, "comment_number": 0, "like_number": 0})
        }
        
    })
}

//添加评论
exports.postComment = function(req, res, next){
    console.log('postcomment')
    db.updateMany("posts", 
                {"_id": ObjectID(req.body.pid)}, 
                { $addToSet: {"comments": 
                    {
                        _id: req.body._id,
                        author: req.body.author,
                        createdAt: req.body.createdAt,
                        content: req.body.content
                    }
                  } 
                }, 
    function(err, result){
        if (err){
            console.log(err);
            return;
        }
        res.send({"result": result})
    })

    
}

exports.doLike = function (req, res, next) {
    db.updateMany("posts", 
    {"_id": ObjectID(req.query.pid.toString())}, 
    { $addToSet: { "likes":  req.query.user } }, 
        function(err, result){
        if (err){
        console.log(err);
        return;
        }
        res.send({"result": result})
        })
}

exports.doUnlike = function (req, res, next) {
    console.log(req.query);
    db.updateMany("posts",
    {"_id": ObjectID(req.query.pid.toString())},
    { $pull: { likes: req.query.user } },
        function(err, result) {
            if(err){
                console.log(err);
                return;
            }
            res.send({"result": result})
        }
    )
}

