function Mapper() {
	this.i = 4;
	this.j = 5;
	this.lastI = 5;
	this.lastJ = 5;
}

Mapper.prototype = {
	left:  	function() {
		if(this.j > 1)
			this.j--;
		this.update();
	},
	bottom: function() {
		if(this.i > 2)
			this.i--;
		this.update();
	},
	right: 	function() {
		if(this.j < 8)
			this.j++;
		this.update();
	},
	top: function() {
		if(this.i < 9)
			this.i++;
		this.update();
	},
	enter: function() {
		nader.call(document.getElementById('flatSq' + this.i + this.j))	;
		
	},
	update: function() {
		if(!isFinished) {
			$('td').attr('style', '');
			$('#flatSq' + this.i + '' + this.j).attr('style', 'background-color: rgb(76, 255, 76);');
		}
	}
	
};