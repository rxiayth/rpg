var addMovementListener = function(event, state){
	document.addEventListener(event, function(e){
		if (document.activeElement.id !== "messageInput" || 
			document.activeElement.id !== "messages" ||
			document.activeElement.id !== ""  ){
		   
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



var enableMovementListener = function() {
	addMovementListener("keydown", true);
	addMovementListener("keyup", false);
}

