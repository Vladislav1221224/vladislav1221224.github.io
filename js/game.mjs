import ChessBoard from "./chessJS/ChessBoard.mjs";

let chessboard = new ChessBoard('white', 0);
		document.getElementById('game-block').append(chessboard.layout)

let ratingInfoHtml = document.querySelector('#rating');



function setRatingInfo(value) {
	if (value && typeof value == "number" && value >= 0 && value < 4000) {
		ratingInfoHtml.innerHTML = value;
	}
}

setRatingInfo(1000);
