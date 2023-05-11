import ChessBoard from "./chessJS/ChessBoard.mjs";

let chessboard = new ChessBoard('white');
console.log(document.getElementById('layout-chess-board'));
document.getElementById('layout-chess-board').prepend(chessboard.html);
//r3kbnr/pppp1ppp/2n5/4p3/3P4/2N2N2/PPP1PPPP/R1BQKB1R b KQkq -

let input;
let buttonFen;
let errorFEN;

let openFenWindow = document.querySelector('#open-fen-window');
openFenWindow.onclick = function (mouse) {
	if (mouse.button == 0) {
		let layout = document.createElement('div');
		layout.id = 'fen-window-background';
		layout.innerHTML = `<div class="fen-layout"><button id="close-fen-window"><div class="close"></div></button>
		<b>FEN:</b>
		<textarea autofocus class="fen-input"type="text" placeholder="Insert FEN"></textarea>
		<button class="button"id="button-setFEN"><b class="">Set position</b></button>
		<div id="fen-error-layout"></div>
		</div>`
		document.querySelector('.base-layout').append(layout);

		input = document.querySelector('.fen-input');
		buttonFen = document.querySelector('#button-setFEN');
		errorFEN = document.querySelector('#fen-error-layout');

		document.querySelector('#close-fen-window').onclick = function (mouse) {
			if (mouse.button == 0) {
				document.querySelector('#fen-window-background').remove();
			}
		};
		input.onclick = function () {
			if (mouse.button == 0) {
				errorFEN.innerHTML = "";
			}
		};
		buttonFen.onclick = function (mouse) {
			if (mouse.button == 0) {
				console.log('is set')
				console.log(input);
				if(!(setFenOfInput(input.value))) {
					errorFEN.innerHTML = "Error: fen is not correct!";
				}
			}
		}
	}
}


function setFenOfInput(fen) {
	if (chessboard.isFEN(fen)) {
		chessboard.setFEN(fen);
		console.log("BUTTON = 1")
		return true;
	}
	else{
		console.log("BUTTON = 2")
		return false;
	}
}

let ratingInfoHtml = document.querySelector('#rating');
console.log(ratingInfoHtml);
function setRatingInfo(value) {
	if (value && typeof value == "number" && value >= 0 && value < 4000) {
		ratingInfoHtml.innerHTML = value;
	}
}


setRatingInfo(1000);
