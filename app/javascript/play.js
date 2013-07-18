var isFinished = false;
var mapper = '';
var pluginAPI;
var interval;
var widgetAPI;
var tvKey;
var nnaviPlugin;
var Main =
{

};

Main.onLoad = function()
{
	widgetAPI = new Common.API.Widget();
	tvKey = new Common.API.TVKeyValue();
	pluginAPI = new Common.API.Plugin();

	nnaviPlugin = document.getElementById('pluginObjectNNavi');		
	nnaviPlugin.SetBannerState(1);
	
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
	
	mapper = new  Mapper();
	interval = setInterval(function() {$('#whiteking').effect('shake', {distance: 5});}, 3000);
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
			if(!Popup.isShown)
				mapper.left();
			break;
		case tvKey.KEY_RIGHT:
			if(!Popup.isShown)
				mapper.right();
			break;
		case tvKey.KEY_UP:
			if(!Popup.isShown)
				mapper.top();
			break;
		case tvKey.KEY_DOWN:
			if(!Popup.isShown)
				mapper.bottom();
			break;
		case tvKey.KEY_ENTER:
		case tvKey.KEY_PANEL_ENTER:
			if(isFinished)
				parent.location = 'index.html';
			
			if(!Popup.isShown)
				mapper.enter();			
			else if(Popup.isShown) {
				if(Popup.action == Action.retrn) {
					parent.location = 'index.html';
				} else {
					widgetAPI.sendExitEvent();
				}
			}
			break;
		default:
			break;
	}
	mapper.update();
};
