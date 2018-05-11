const canSelfRemove = (state) => ({
	selfRemove: (state) => {
		if (state.timer ++ > 30) {
			state.toRemove = true;
		}
	}
});

const canUpdateBulletsPositions = (BULLETS_LIST) => {
	updateBullets : (BULLETS_LIST) => {
	    var pack = [];
	    for(var bullet in BULLETS_LIST){
		    bullet.updatePosition();
		    pack.push({
		        x:bullet.x,
		        y:bullet.y
		    });    
		}
		// console.log(pack)
		return pack;
	}
};


// update = function(){
//         if(self.timer++ > 100)
//             self.toRemove = true;
//         super_update();
       
//         for(var i in Player.list){
//             var p = Player.list[i];
//             if(self.getDistance(p) < 32 && self.parent !== p.id){
//                 //handle collision. ex: hp--;
//                 self.toRemove = true;
//             }
//         }





module.exports = {
	canSelfRemove,
	canUpdateBulletsPositions	
}
