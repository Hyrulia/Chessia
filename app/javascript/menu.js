var session = window.sessionStorage;
var margin;
var mapper = '';
var widgetAPI;
var tvKey;
var nnaviPlugin;

function Mapper() {
	this.idx = 0;
	if(session.getItem('menuItem') != null)
		this.idx = parseInt(session.getItem('menuItem'));
}

Mapper.prototype = {
		up: function() {
			if(this.idx > 0)
				this.idx--;
			this.update();
		},
		down: function() {
			if(this.idx < 2)
				this.idx++;
			this.update();
			
		},
		update: function() {
			$('#menu > li').attr('class', '');
			$('#item' + this.idx).attr('class', 'hoverd');
		},
		enter: function() {
			session.setItem('menuItem', this.idx);
			switch (this.idx) {
			case 0:
				sessionStorage.setItem('player', '1');
				document.location.href = 'play.html';
				break;
			case 1:
				sessionStorage.setItem('player', '2');
				document.location.href = 'play.html';
				break;
			case 2:
				document.location.href = 'howto.html';
				break;
			}
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
	
	// For volume OSD
	//window.onshow = function(){
		pluginAPI.registKey(tvKey.KEY_EXIT);
		pluginAPI.registKey(tvKey.KEY_VOL_UP);
		pluginAPI.registKey(tvKey.KEY_VOL_DOWN);
		pluginAPI.registKey(tvKey.KEY_MUTE);
		pluginAPI.setOffScreenSaver();	
	//}
	this.enableKeys();	
	widgetAPI.sendReadyEvent();
	
	setTimeout(function() {
		$('#logo').effect('scale', {percent: 61, origin: ['top', 'center']}, 1500, function() {
			$(this).attr('style', 'margin-left: 342px; width: 30%;');
		});
		}, 500);
		setTimeout(function() {
			$('#menu').show('fade');
		}, 2000);
					
	mapper = new  Mapper();
	mapper.update();

	$('#item0').click(function() {
		session.setItem('menuItem', 0);
		sessionStorage.setItem('player', '1');
		document.location.href = 'play.html';
	});
	$('#item1').click(function() {
		session.setItem('menuItem', 1);
		sessionStorage.setItem('player', '2');
		document.location.href = 'play.html';
	});
	$('#item2').click(function() {
		session.setItem('menuItem', 2);
		document.location.href = 'howto.html';
	
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
			break;
		case tvKey.KEY_RIGHT:
			break;
		case tvKey.KEY_UP:
			if(!Popup.isShown)
				mapper.up();
			break;
		case tvKey.KEY_DOWN:
			if(!Popup.isShown)
				mapper.down();
			break;
		case tvKey.KEY_ENTER:
		case tvKey.KEY_PANEL_ENTER:
			if(!Popup.isShown)
				mapper.enter();
			else if(Popup.isShown) {
				if(Popup.action == Action.retrn) {
					widgetAPI.sendReturnEvent();
				} else {
					widgetAPI.sendExitEvent();
				}
			}
			break;
		case tvKey.KEY_VOL_UP:
		case tvKey.KEY_VOL_DOWN:
		case tvKey.KEY_MUTE:
			widgetAPI.blockNavigation(event);
			break;
		default:
			break;
	}
	mapper.update();
};
