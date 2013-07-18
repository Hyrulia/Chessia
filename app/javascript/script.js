	var nVwPressed = false;
	function pressVwBtn(nBtnId) {
	if (nVwPressed) { document.getElementById("viewBtn" + nVwPressed).className = ""; }
	document.getElementById("viewBtn" + nBtnId).className = "pressedBtn";
	nVwPressed = nBtnId;
}

// Firefox only
function onPGNLoaded(frEvnt) {
	var sFBody = frEvnt.target.result;
	chess.readPGN(sFBody, document.chessCtrl3.plyerClr2[1].checked);
}

// Firefox only
function loadPGNFile() {
	var oFile = document.getElementById("PGNFileData").files[0];
	if (oFile) {
		var oFReader = new FileReader();
		oFReader.onload = onPGNLoaded;
		oFReader.readAsText(oFile);
	}
}

function initChess() {
	
	chess.useAI(sessionStorage.getItem('player') == '1' ? true : false); //true AI - false Human
	chess.setPromotion(0); //0 Queen - 1 Tour - 2 Bishoop - 3 Knight
	chess.setFrameRate(1000); //framerate
	chess.setSide(0); //0 white - 1 black
	chess.useKeyboard(false); //for 3D
	chess.placeById("chessDesk");
	MyPieces.init();
	chess.setView(1);
	$("#chessSizeHandle").hide();
	$("#chessCtrlPanel").hide();
	mapper.update();
}