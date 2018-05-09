const canMove = (state) => ({
	updatePosition: () => {
        if(state.pressingRight)
            state.x += state.maxSpd;
        if(state.pressingLeft)
            state.x -= state.maxSpd;
        if(state.pressingUp)
            state.y -= state.maxSpd;
        if(state.pressingDown)
            state.y += state.maxSpd;
    }
})
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
	

    return Object.assign(state, canMove(state));
}

module.exports = Player;
