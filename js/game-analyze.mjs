import ChessBoard from "./chessJS/ChessBoard.mjs";
import PortableGameNotation from "./chessJS/pgn-parser/PGN.mjs";

// [Event "Live Chess"]
// [Site "Chess.com"]
// [Date "2023.06.09"]
// [Round "?"]
// [White "Vladislav12122"]
// [Black "vor666tex666"]
// [Result "1-0"]
// [ECO "C50"]
// [WhiteElo "944"]
// [BlackElo "903"]
// [TimeControl "180+2"]
// [EndTime "5:10:16 PDT"]
// [Termination "Vladislav12122 won by resignation"]

// 1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. d3 d6 5. Be3 Bxe3 6. fxe3 Nf6 7. O-O O-O 8.
// Ng5 Bd7 9. Nc3 h6 10. Nd5 Nxd5 11. Nxf7 Rxf7 12. Bxd5 Kf8 13. Rxf7+ Ke8 14. Rxg7
// Kf8 15. Rg8+ 1-0
let PGN = new PortableGameNotation(`[Event "Live Chess"]
[Site "Chess.com"]
[Date "2023.06.09"]
[Round "?"]
[White "Vladislav12122"]
[Black "vor666tex666"]
[Result "1-0"]
[ECO "C50"]
[WhiteElo "944"]
[BlackElo "903"]
[TimeControl "180+2"]
[EndTime "5:10:16 PDT"]
[Termination "Vladislav12122 won by resignation"]
1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. d3 d6 5. Be3 Bxe3 6. fxe3 Nf6 7. O-O O-O 8.
Ng5 Bd7 9. Nc3 h6 10. Nd5 Nxd5 11. Nxf7 Rxf7 12. Bxd5 Kf8 13. Rxf7+ Ke8 14. Rxg7
Kf8 15. Rg8+ 1-0`);
console.log(PGN);

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
buttonRightMenu.onclick = function () {
	console.log('is DODODO111')
	if (rightMenu.classList.contains('invisible')) {
		console.log('1')
		rightMenu.classList.remove('invisible');
	}
	else {
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
				let pgn2 = new PortableGameNotation(chessboardArray[0]);
				console.log(pgn2);
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
		chessboard.clearSquareEffects();
		chessboard.boardLayout.classList.add('invisible');
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
