import ChessBoard from "./chessJS/ChessBoard.mjs";

let chessboard = new ChessBoard('white', 0);
chessboard.mode = "game";
document.getElementById('game-block').append(chessboard.layout)
document.querySelector('#moves-info-layout').append(chessboard.movesLayout);
chessboard.layout.querySelector('#reset-chess-board').remove();
let ratingInfoHtml = document.querySelector('#rating');



function setRatingInfo(value) {
	if (value && typeof value == "number" && value >= 0 && value < 4000) {
		ratingInfoHtml.innerHTML = value;
	}
}

setRatingInfo(1000);
