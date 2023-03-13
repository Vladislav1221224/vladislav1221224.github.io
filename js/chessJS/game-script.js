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
let chessBoard = document.querySelector('.chess-board');
let posInfo = chessBoard.getBoundingClientRect();


 /////////////////////////////////////////////////////////////
//In developing!!! Dragging the pieces
/////////////////////////////////////////////////////////////
// document.querySelectorAll('.piece').forEach(element = function(piece){
// piece.onmousedown = function(e) {// 1. отследить нажатие
// 	let width = piece.offsetWidth;
// 	let height = piece.offsetHeight;
// 	piece.style.width = width + 'px';
// 	piece.style.height = height + 'px';
// 	piece.classList.add('dragguble');
//   // подготовить к перемещению
//   // 2. разместить на том же месте, но в абсолютных координатах
//   piece.style.position = 'absolute';
//   moveAt(e);
//   // переместим в body, чтобы мяч был точно не внутри position:relative
//   document.body.append(piece);

//   piece.style.zi = 1000; // показывать мяч над другими элементами

// 	let chessBoard = document.querySelector('.chess-board');
// 	let posInfo = chessBoard.getBoundingClientRect();
// 	console.log(posInfo);
// 	let left = posInfo.x;
// 	let top = posInfo.y;
// 	let right = posInfo.x + posInfo.width;
// 	let bottom = posInfo.y + posInfo.height;
//   // передвинуть мяч под координаты курсора
//   // и сдвинуть на половину ширины/высоты для центрирования
//   function moveAt(e , left , right , top , bottom) {
// 		console.log(left);
// 		console.log(e.pageX);
// 		if(left < e.pageX && right > e.pageX){
// 			piece.style.left = e.pageX - piece.offsetWidth / 2 + 'px';
// 		}
// 		if(top < e.pageY && bottom > e.pageY){
// 			piece.style.top = e.pageY - piece.offsetWidth / 2 + 'px';
// 		}
//   }

//   // 3, перемещать по экрану
//   document.onmousemove = function(e) {
//     moveAt(e, left, right , top , bottom);
//   }

//   // 4. отследить окончание переноса
//   piece.onmouseup = function() {
// 		if(true){
// 			piece.style.position = 'relative';
// 		}

//     document.onmousemove = null;
//     piece.onmouseup = null;
//   }
// }});
/////////////////////////////////////////////////////////////