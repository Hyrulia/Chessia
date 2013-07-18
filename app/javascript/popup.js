var Action = {
	retrn : 0,
	exit : 1
};

var Urls = {
		retrn: 		'img/return_alert.jpg',
		exit:  		'img/exit_alert.jpg',
		blackWins: 	'img/black_wins.png',
		whiteWins: 	'img/white_wins.png',
		draw:  		'img/draw.png'
}

var Popup = {
	isShown : false,
	action: '',
	showAlert: function(isReturn) {
		if(this.isShown)
			return;
		
		var node = document.getElementById('popup');
		if(isReturn) {
			node.setAttribute('src', Urls.retrn);
			this.action = Action.retrn;
		} else {
			node.setAttribute('src', Urls.exit);
			this.action = Action.exit;
		}
		node.style.display = 'block';
		this.isShown = true;
	},
	closeAlert: function() {
		var node = document.getElementById('popup');
		node.style.display = 'none';
		this.isShown = false;
	},
	showWin: function(mode) {
		var node = document.getElementById('popup');
		switch(mode) {
		case 0: //Draw
			node.setAttribute('src', Urls.draw);
			break;
		case 1: //White wins 
			node.setAttribute('src', Urls.whiteWins);
			break;
		case 2: //Black wins
			node.setAttribute('src', Urls.blackWins);
			break;
		}
		node.style.display = 'block';
		this.isShown = true;
		isFinished = true;
		clearInterval(interval);
		
	}
};



