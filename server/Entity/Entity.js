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

const hasPosition = (state) => {

}
module.exports = {
	canMove
}
