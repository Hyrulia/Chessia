var widgetAPI;
var tvKey;
var nnaviPlugin;
var mapper;

function Mapper() {
	this.idx = 0;
	this.exec();
}

Mapper.prototype = {
	toUp: function() {
		if(this.idx > 0)
			this.idx--;
		this.exec();
	},
	toDown: function() {
		if(this.idx < 5)
			this.idx++;
		this.exec();
	},
	exec: function() {
		$('#menu > li').attr('class', '');
		$('#item' + this.idx).attr('class', 'hoverd');
		switch(this.idx) {
			case 0:
				$('#imgDsc').attr('src', 'img/' + Pieces.Pown.img);
				$('#txtDsc').html(Pieces.Pown.text);
			break;
			case 1:
				$('#imgDsc').attr('src', 'img/' + Pieces.Rook.img);
				$('#txtDsc').html(Pieces.Rook.text);
			break;
			case 2:
				$('#imgDsc').attr('src', 'img/' + Pieces.Bishop.img);
				$('#txtDsc').html(Pieces.Bishop.text);
			break;
			case 3:
				$('#imgDsc').attr('src', 'img/' + Pieces.Knight.img);
				$('#txtDsc').html(Pieces.Knight.text);
			break;
			case 4:
				$('#imgDsc').attr('src', 'img/' + Pieces.Queen.img);
				$('#txtDsc').html(Pieces.Queen.text);
			break;
			case 5:
				$('#imgDsc').attr('src', 'img/' + Pieces.King.img);
				$('#txtDsc').html(Pieces.King.text);
			break;
		}
	}
};

var Pieces = {
	Pown: {
		img: '0.gif',
		text: 'The pawn is the least valuable piece in chess. \
				It may only move forward, never backwards or sideways. \
				Pawns move one square directly forward. However, \
				pawns can only capture one square forward diagonally. \
				In addition, a pawn that is still on its starting square has the option to move two squares directly forward.<br />\
				<br />\
				<span style="font-size: 0.9em; font-style: italic;">Promotion: The pawn that reaches its eighth rank can transform into the player\'s choice of a queen, knight, rook, or bishop of the same color.\
				Since the queen is the most powerful piece, the vast majority of promotions in practical play are to a queen, that\'s why in Chessia, pwn can only be promotted to queen!</span>' 
	},
	Rook: {
		img: '1.gif',
		text: 'The rook moves any number of squares horizontally or vertically in a straight line.\
				Like most pieces, the rook cannot jump over other pieces. \
				However, it can land on a square occupied by an opponent\'s piece, removing that piece from the board.<br /> \
				This is known as capturing a piece. \
				All pieces are capable of capturing in this manner. \
				In the diagram above, the rook can move to any of the squares marked with a dot.<br /> \
				It can also capture the black bishop on g4 by moving to that square. \
				It may not move onto or through the squares occupied by the white pawns.'
	},
	Bishop: {
		img: '2.gif',
		text: 'The bishop moves any number of squares diagonally in a straight line. \
				Notice that the bishop will always remain on squares of one color during a game.<br /> \
				For example, the bishop in the diagram above will always stay on dark squares. \
				At the beginning of a game, each player has both a light-squared bishop and a dark-squared bishop.'
	},
	Knight: {
		img: '3.gif',
		text: 'The knight can be easily identified; in most chess sets, it looks like a horse\'s head. \
				The pattern the knight uses to move can be described in several ways.<br /> \
				In a technical sense, the knight moves one square diagonally in any direction, \
				and then moves one square vertically or horizontally further away from where it started its move.<br /> \
				This is often described as an âL-shapedâ move: the knight moves two squares horizontally or vertically,\
				and then turns at a right angle to move one more square.'
	},
	Queen: {
		img: '4.gif',
		text: 'The queen combines the abilities of the rook and bishop. \
		A queen moves any number of squares in a straight line, in any direction. \
		This mobility makes the queen the most powerful piece in chess.<br /> \
		Queens and rooks are known as major pieces.'
	},
	King: {
		img: '5.gif',
		text: 'The king moves one square in any direction. \
				The king is the most important piece in chess. \
				When a king is attacked by another piece, it is said to be in check.<br /> \
				If the king is in check, it must avoid capture immediately. \
				If the capture cannot be avoided, the game is over (the king is not actually captured in chess). \
				This is known as checkmate.'
	}
};

var Main =
{

};

Main.onLoad = function() {

	widgetAPI = new Common.API.Widget();
	tvKey = new Common.API.TVKeyValue();
	pluginAPI = new Common.API.Plugin();
	
	nnaviPlugin = document.getElementById('pluginObjectNNavi');		
	nnaviPlugin.SetBannerState(0);
	//window.onshow = function(){
		pluginAPI.registKey(tvKey.KEY_VOL_UP);
		pluginAPI.registKey(tvKey.KEY_VOL_DOWN);
		pluginAPI.registKey(tvKey.KEY_MUTE);
		pluginAPI.registKey(tvKey.KEY_EXIT);
		pluginAPI.setOffScreenSaver();	
	//}
	this.enableKeys();	
	widgetAPI.sendReadyEvent();	
	
	
	mapper = new Mapper();

	$.each($('#menu > li'), function(index, li) {
		$(li).click(function() {

				mapper.idx = index;
				mapper.exec();
				document.getElementById("anchor").focus();
			
		});
	});
};

Main.onUnload = function()
{

};

Main.enableKeys = function()
{
	document.getElementById("anchor").focus();
};

Main.keyDown = function()
{
	var keyCode = event.keyCode;
	alert("Key pressed: " + keyCode);

	switch(keyCode)
	{
		case tvKey.KEY_EXIT:
			widgetAPI.blockNavigation(event);
			if(Popup.isShown)
				Popup.closeAlert();
			else
				Popup.showAlert(false);
		break;
		case tvKey.KEY_PANEL_RETURN:
		case tvKey.KEY_RETURN:
			widgetAPI.blockNavigation(event);
			if(Popup.isShown)
				Popup.closeAlert();
			else
				Popup.showAlert(true);	
			break;
		case tvKey.KEY_LEFT:
			alert("LEFT");
			break;
		case tvKey.KEY_RIGHT:
			alert("RIGHT");
			break;
		case tvKey.KEY_UP:
			alert("UP");
			mapper.toUp();
			break;
		case tvKey.KEY_DOWN:
			alert("DOWN");
			mapper.toDown();
			break;
		case tvKey.KEY_ENTER:
		case tvKey.KEY_PANEL_ENTER:
			if(Popup.isShown) {
				if(Popup.action == Action.retrn) {
					parent.location = 'index.html';
				} else {
					widgetAPI.sendExitEvent();
				}
			}
			break;
		break;
		case tvKey.KEY_VOL_UP:
		case tvKey.KEY_VOL_DOWN:
		case tvKey.KEY_MUTE:
			widgetAPI.blockNavigation(event);
			break;
		default:
			alert("Unhandled key");
			break;
	}
};


