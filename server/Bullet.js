var Entity = require(__dirname + "/Entity/Entity.js");
var BulletHelpers = require(__dirname + "/BulletHelpers.js");

const Bullet = (player, angle) => {
	let state = {
		id: Math.random(),
	    x : player.x,
		y : player.y,
		angle: angle,
	    maxSpd : 10,
	    spdX : Math.cos(angle/180*Math.PI) * 10,
    	spdY : Math.sin(angle/180*Math.PI) * 10,
    	timer : 0,
    	toRemove : false

	}
	
    return Object.assign(state, BulletHelpers.canUpdateBulletsPositions(state), BulletHelpers.canSelfRemove(state), Entity.canMove(state));
}

module.exports = Bullet;
