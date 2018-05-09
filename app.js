var express = require('express');
var app = express();
var serv = require('http').Server(app);

var PlayerHelpers = require(__dirname + "/server/PlayerHelpers.js");


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

    var player = PlayerHelpers.createPlayer(SOCKET_LIST, PLAYER_LIST, socket);
    PLAYER_LIST[socket.id] = player;



    socket.on('chat message', function(msg){
        io.emit('chat message', '[' + player.number + '] ' + msg);
  	});

    socket.on('disconnect',function(){   
        PlayerHelpers.removePlayer(io, SOCKET_LIST, PLAYER_LIST, socket)
    });
   
});
 
 setInterval(function(){
    var pack = PlayerHelpers.updatePlayersPositions(PLAYER_LIST);
    for(var i in SOCKET_LIST){
        var socket = SOCKET_LIST[i];
        socket.emit('newPositions',pack);
    }
}, 1000/25);


