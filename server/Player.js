var Entity = require(__dirname + "/Entity/Entity.js");

const Player = (id) => {
	let state = {
		id,
	    x : 500,
		y : 500,
		number : "" + Math.floor(10 * Math.random()),
		pressingRight : false,
		pressingLeft : false,
		pressingUp : false,
		pressingDown : false,
	    maxSpd : 10
	}
	

    return Object.assign(state, Entity.canMove(state));
}

module.exports = Player;
