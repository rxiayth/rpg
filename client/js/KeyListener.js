var addMovementListener = function(event, state){
	document.addEventListener(event, function(e){
		if (document.activeElement.tagName === "BODY"){
			// console.log(document.activeElement.tagName);
		    if(e.keyCode === 68)    	//d
		        socket.emit('keyPress',{inputId:'right',state:state});
		    else if(e.keyCode === 83)   //s
		        socket.emit('keyPress',{inputId:'down',state:state});
		    else if(e.keyCode === 65) 	//a
		        socket.emit('keyPress',{inputId:'left',state:state});
		    else if(e.keyCode === 87) 	// w
		        socket.emit('keyPress',{inputId:'up',state:state});
		}
	});
}

var addActionListener = function(event, state){
	document.addEventListener(event, function(e){
		if (document.activeElement.tagName === "BODY"){
			console.log('attack', state);
		   	socket.emit('keyPress',{inputId:'attack',state:state});
	   	}
	});
}

var addMouseMoveListener = function(event, state){
	document.addEventListener(event, function(e){
        var x = -250 + e.clientX ;
        var y = -250 + e.clientY ;
        var angle = Math.atan2(y,x) / Math.PI * 180;
        socket.emit('keyPress',{inputId:'mouseAngle',state:angle});
    });
}



var enableKeyListener = function() {
	addMovementListener("keydown", true);
	addMovementListener("keyup", false);
	addActionListener("click", true);
	addMouseMoveListener("mousemove");
}


