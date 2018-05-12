var mongojs = require("mongojs");
var db = mongojs('localhost:27017/rpg', ['account', 'progress']);

var express = require('express');
var app = express();
var serv = require('http').Server(app);

var PlayerHelpers = require(__dirname + "/server/PlayerHelpers.js");
var BulletHelpers = require(__dirname + "/server/BulletHelpers.js");


app.get('/',function(req, res) {
    res.sendFile(__dirname + '/client/index.html');
});
app.use('/client',express.static(__dirname + '/client'));
serv.listen(2000);
console.log("Server started.");
 

var io = require('socket.io')(serv,{});
var SOCKET_LIST = {};
var PLAYER_LIST = {};


io.sockets.on('connection', function(socket){
    socket.id = Math.random();
    SOCKET_LIST[socket.id] = socket;
    // todo: check if socketId is unique    

    var player = 'nobody';



    const isValidSignIn = (data, cb) => {
        db.account.find({username:data.username, password:data.password}, function(err,res){
            (res.length >0 )? cb(true) : cb(false);
        })
    }

    const isUsernameTaken = (data, cb) => {
        db.account.find({username:data.username}, function(err,res){
            (res.length >0 )? cb(true) : cb(false);
        })
    }

    const addNewAccount = (data, cb) => {
        db.account.insert({username: data.username, password:data.password}, function(err){
            cb('insert error')
        });
    }

    socket.on('signIn', function(data,cb){
        isValidSignIn(data, function(res){
            if(res){
                socket.emit('signInResponse', {success: true});
                player = PlayerHelpers.createPlayer(io, SOCKET_LIST, PLAYER_LIST, socket);
                PLAYER_LIST[socket.id] = player;
            } else {
                socket.emit('signInResponse', {success: false});
            }
        })
    });

            
    socket.on('signUp', function(data,cb){
        isUsernameTaken(data, function(res){
            if(res){
                socket.emit('signUpResponse', {success: false});   
            } else {
                addNewAccount(data,function(res){
                    socket.emit('signUpResponse', {success: true});   
                })
            }
        });
    });


    socket.on('chat message', function(msg){
        io.emit('chat message', '[' + player.number + '] ' + msg);
  	});

    socket.on('eval message', function(msg){
        var reply = eval(msg)
        socket.emit('eval message answer', reply)
    });


    // socket.on('disconnect',function(){   
    //     PlayerHelpers.removePlayer(io, SOCKET_LIST, PLAYER_LIST, socket)
    // });
   
});
 
 setInterval(function(){
    var pack = {
        players: PlayerHelpers.updatePlayersPositions(PLAYER_LIST),
        bullets: PlayerHelpers.updateBulletsPositions(PLAYER_LIST)
    }
    for(var i in SOCKET_LIST){
        var socket = SOCKET_LIST[i];
        socket.emit('newPositions',pack);
    }
    // console.log(pack)
}, 1000/25);



