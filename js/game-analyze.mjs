import ChessBoard from "./chessJS/ChessBoard.mjs";

//Slider for chessboards
let chessboardArray = [];
const max_chessboards_count = 5;
addChessBoard();
if (document.querySelector('#add-chessboard') && document.querySelector('#remove-chessboard')) {
	document.querySelector('#add-chessboard').onclick = function (mouse) {
		if (mouse.button == 0) {
			addChessBoard();
		}
	};
	document.querySelector('#remove-chessboard').onclick = function (mouse) {
		if (mouse.button == 0) {
			removeChessBoard();
		}
	};
}
function addChessBoard() {
	if (chessboardArray.length <= max_chessboards_count) {
		let chessboard = new ChessBoard('white', chessboardArray.length);
		chessboard.mode = "analyze";
		chessboard.layout.classList.remove('invisible');
		document.getElementById('game-block').append(chessboard.layout)
		chessboardArray.push(chessboard);
	}
}
function removeChessBoard() {
	if (chessboardArray.length > 1) {
		console.log(chessboardArray[chessboardArray.length - 1]);
		chessboardArray[chessboardArray.length - 1].destroy();
		chessboardArray.pop();
	}
}
let input;
let buttonFen;
let errorFEN;

let buttonRightMenu = document.getElementById('btn-navbar');
let rightMenu = document.querySelector('#right-block');
console.log(rightMenu);
console.log(buttonRightMenu);
	buttonRightMenu.onclick = function () {
		console.log('is DODODO111')
		if (rightMenu.classList.contains('invisible')) {
			console.log('1')
			rightMenu.classList.remove('invisible');
		}
		else{
			console.log('2')
			rightMenu.classList.add('invisible');
		}
	}

let openFenWindow = document.querySelector('#open-fen-window');
openFenWindow.onclick = function (mouse) {
	if (mouse.button == 0) {
		console.log('is open')
		let layout = document.createElement('div');
		layout.id = 'fen-window-background';
		layout.innerHTML = `<div class="fen-layout"><button id="close-fen-window"><div class="close"></div></button>
		<b>FEN:</b>
		<textarea autofocus class="fen-input" type="text" placeholder="Insert FEN"></textarea>
		<button class="button"id="button-setFEN"><b class="">Set position</b></button>
		<select id="select-chess-board">ID: 
			<option selected>1</option>
		</select>
		<div id="fen-error-layout"></div>
		</div>`
		document.querySelector('.base-layout').append(layout);
		let select = document.querySelector('#select-chess-board');

		for (let i = 1; i < chessboardArray.length; i++) {
			select.innerHTML += `<option value='${i + 1}'>${i + 1}</option>`;
		}
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
				console.log();
				let CB = chessboardArray[select.value - 1];
				if (!(setFenOfInput(input.value, CB))) {
					errorFEN.innerHTML = "Error: fen is not correct!";
				}
			}
		}
	}
}


function setFenOfInput(fen, chessboard) {
	if (chessboard.isFEN(fen)) {
		chessboard.sliceMoves(chessboard.moves.length);
		chessboard._moves.push({ name: undefined, fen: fen });
		chessboard._moveNumber = 0;
		chessboard.setFEN(fen);
		console.log("BUTTON = 1")
		return true;
	}
	else {
		console.log("BUTTON = 2")
		return false;
	}
}

let ratingInfoHtml = document.querySelector('#rating');



function setRatingInfo(value) {
	if (value && typeof value == "number" && value >= 0 && value < 4000) {
		ratingInfoHtml.innerHTML = value;
	}
}

//setRatingInfo(1000);
