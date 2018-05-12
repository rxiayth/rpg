var Player = require(__dirname + "/Player.js");
var Bullet = require(__dirname + "/Bullet.js");
var BulletHelpers = require(__dirname + "/BulletHelpers.js");


const updatePlayersPositions = (PLAYER_LIST) => {
    var pack = [];
    for(var i in PLAYER_LIST){
	    var player = PLAYER_LIST[i];
	    player.updatePosition();
	    pack.push({
	        x:player.x,
	        y:player.y,
	        number:player.number
	    });    
	}
	return pack;
}

const updateBulletsPositions = (PLAYER_LIST) => {
	var pack = [];
	    for(var i in PLAYER_LIST){
	    	var playerPack = [];
		    var player = PLAYER_LIST[i];
		    var bullets = player.BULLET_LIST;
		    // console.log(player.BULLET_LIST);
		    var playerPack = [];
		    for (var b in bullets){
			    // bullet.updatePosition();
			    bullet = bullets[b]
			    bullet.x += bullet.spdX;
		        bullet.y += bullet.spdY;
			    playerPack.push({
			        x:bullet.x,
			        y:bullet.y
			    });    
			}
			pack = pack.concat(playerPack)
			
		}
		    // playerPack = Bullet.updateBulletsPositions(bullets) || []; 
		
	// console.log(pack)
	
	return pack;

}

const _listenToMovements = (SOCKET_LIST, PLAYER_LIST, socket, player) => {
	socket.on('keyPress',function(data){
        if(data.inputId === 'left')
            player.pressingLeft = data.state;
        else if(data.inputId === 'right')
            player.pressingRight = data.state;
        else if(data.inputId === 'up')
            player.pressingUp = data.state;
        else if(data.inputId === 'down')
            player.pressingDown = data.state;
        else if(data.inputId === 'attack')
            player.pressingAttack = data.state;
        else if(data.inputId === 'mouseAngle')
            player.mouseAngle = data.state;

        if (player.pressingAttack && player.mouseAngle){
        	var bullet = Bullet(player, player.mouseAngle);
        	player.BULLET_LIST[Math.random()] = bullet;
        	player.pressingAttack = false;
        	console.log('bullet', bullet)
        	bullet.selfRemove();
        }
    });
}

// const broadcastMessage = (io, PLAYER_LIST, socket, msg) => {
// }

const createPlayer = (io, SOCKET_LIST, PLAYER_LIST, socket)  => {
	var player = Player(socket.id);
    _listenToMovements(SOCKET_LIST, PLAYER_LIST, socket, player);
    _connectMessage(io, player);
    return player;
};



const removePlayer = (io, SOCKET_LIST, PLAYER_LIST, socket)  => {
	var player = PLAYER_LIST[socket.id]
    var disconnectMessage = player.number + " has left the game";

    delete SOCKET_LIST[socket.id];
    delete PLAYER_LIST[socket.id];
    io.emit('chat message', disconnectMessage);

};

const _connectMessage = (io, player) => {
	const msg = player.number + " has joined the game";
    io.emit('chat message', msg);
}

module.exports = {
	createPlayer,  
	removePlayer,
	updatePlayersPositions,
	updateBulletsPositions
	// broadcastMessage

}
