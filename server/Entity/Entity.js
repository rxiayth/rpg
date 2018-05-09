class Entity {
	constructor(id) {
	    this.x = 500,
		this.y = 500,
		this.id = id,
		this.number = "" + Math.floor(10 * Math.random()),
		this.pressingRight = false,
		this.pressingLeft = false,
		this.pressingUp = false,
		this.pressingDown = false,
	    this.maxSpd = 10
	}
	updatePosition() {
        if(this.pressingRight)
            this.x += this.maxSpd;
        if(this.pressingLeft)
            this.x -= this.maxSpd;
        if(this.pressingUp)
            this.y -= this.maxSpd;
        if(this.pressingDown)
            this.y += this.maxSpd;
    }
}

module.exports = Entity;
