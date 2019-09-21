var MongoClient = require('mongodb').MongoClient;
var settings = require('../settings.js');




//连接数据库
var _connectDB = function(callback){
    var url = settings.dburl;
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db){
       callback(err, db);
    });
}

init();

function init(){
    _connectDB(function(err, db){
        if(err){
            console.log(err);
            return;
        }
        //建立索引
        db.collection('users').createIndex(
            { "username": 1},
            null,
            function(err, result){
                if(err){
                    console.log(err);
                    return;
                }
                console.log("Index created.");
            }
        )
    })
}

//插入数据
exports.insertOne = function(collectionName, json, callback){
    _connectDB(function(err,db){
        if(err){
            callback(err, db);
            db,close();
            return;
        }
        db.collection(collectionName).insertOne(json, function(err, result){
            callback(err, result);
            db.close();
        })
    });
}

//查询collection中总条数
exports.count = function(collectionName, callback){
    _connectDB(function(err, db){
        if(err){
            callback(err, db);
            db.close();
            return;
        }
        db.collection(collectionName).find().count(function(err, result){
            callback(err, result);
            db.close();
        })
    })
}

//查找数据，找到所有数据
exports.find = function(collectionName, json, C, D){
    var result = [];
    //相当于函数重载 
    if(arguments.length == 3){
        //如果用户只传三个参数，则C就是callback，D不存在
        var callback = C;
        var skipnumber = 0;
        var limit = 0;
    } else if(arguments.length == 4){
        //如果用户传了四个参数，则C是args，D是callback
        var callback = D;
        var args = C; 
        //想要跳过的条数
        var skipnumber = args.pageamount * args.page || 0;
        //每页的条数
        var limit = args.pageamount || 0;
        //排序条件
        var condition = args.condition || {};
    } else {
        throw new Error("参数错误");
    }
   
    _connectDB(function(err, db){
        var cursor = db.collection(collectionName).find(json).sort(condition).skip(skipnumber).limit(limit);
        cursor.each(function(err, doc){
            if(err){
                callback(err, null);
                db.close();
                return;
            }
            if(doc != null){
                result.push(doc); //放入结果数组
            } else {
                //遍历结束，没有更多文档了
                callback(null, result);
                db.close();
            }
        });

    });
}

//删除数据
exports.deleteMany = function(collectionName, json, callback){
    _connectDB(function(err, db){
        db.collection(collectionName).deleteMany(
            json,
            function(err, result){
                console.log(result);
                callback();
                db.close();
            }
        )
    })
}

//修改数据
exports.updateMany = function(collectionName, json1, json2, callback){
    _connectDB(function(err, db){
        db.collection(collectionName).updateMany(
            json1, //改谁
            json2, //改成什么样子
            function(err, results){
                callback(err, results);
            }
        );
    })
}