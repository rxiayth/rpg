var Player = require(__dirname + "/Player.js");


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
    });

}

// const broadcastMessage = (io, PLAYER_LIST, socket, msg) => {
// }

const createPlayer = (SOCKET_LIST, PLAYER_LIST, socket)  => {
	var player = Player(socket.id);
    _listenToMovements(SOCKET_LIST, PLAYER_LIST, socket, player);
    return player;
};



const removePlayer = (io, SOCKET_LIST, PLAYER_LIST, socket)  => {
	var player = PLAYER_LIST[socket.id]
    var disconnectMessage = player.number + " has left the game";

    delete SOCKET_LIST[socket.id];
    delete PLAYER_LIST[socket.id];
    io.emit('chat message', disconnectMessage);

};

const connectMessage = (player) => {
	const msg = player.number + " has joined the game";
    io.emit('chat message', msg);
}

module.exports = {
	createPlayer,  
	removePlayer,
	connectMessage,
	updatePlayersPositions
	// broadcastMessage

}
