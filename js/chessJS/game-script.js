import {ChessBoard} from "./ChessBoard.js";



let chessboard = new ChessBoard('default');
//////////////////////////////////////////////////////////

 document.querySelector('.flip-chess-board').onclick = function(){
	chessboard.flipTheChessBoard();
 }
 document.querySelector('.reset-chess-board').onclick = function(){
	chessboard = null;
	chessboard = new ChessBoard('default');
 }
