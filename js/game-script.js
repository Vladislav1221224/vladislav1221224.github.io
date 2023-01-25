class Player{
	constructor(sideValue){
		this.side = sideValue;
		let pawn = new Pawn(this.side);
		let king = new King(this.side);
		let queen = new Queen(this.side);
		let rook = new Rook(this.side);
		let bishop = new Bishop(this.side);
		let knight = new Knight(this.side);
		//console.log('White price = ' + pricePlayerPieces());
	}
	set side(value){
		this._side = value;
		}
	get side(){
		return this._side;
	}
	set pricePlayer(value){
		this._pricePlayer = value;
		}
	get pricePlayer(){
		return this._pricePlayer;
	}
	pricePlayerPieces(){
		let price = '1';
		//for (let i = 0; i < 8; i++) {
			//for (let j = 0; j < 8; j++) {
				//if(DefaultStartPosition[i][j] == this.side + 'p'){
				//	price += Pawn.price;
				//}
				//else if(BoardPositionPieces[i][j] == this.side + 'k'){
					//this.pricePlayer = King.price;
				//}
			//}
		//}
		return price;
	}
}
class Pawn{
	constructor(side){
		this.setPiece(side);
	}
	set price(value) {
		this.price = 1;
  }
	get price(){
		return this._price;
	}
	setPiece(side){
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				if(BoardPositionPieces[i][j] == side + 'p'){
					let pawn = document.createElement('img');
					pawn.src='images/piecesPNG/' + side + 'p.png';
					pawn.className = "piece";
					square[i][j].appendChild(pawn);
				}
			}
		}
	}
	Move(X,Y){

	}
}
class King{
	constructor(side){
		this.setPiece(side);
	}

	setPiece(side){
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				if(BoardPositionPieces[i][j] == side + 'k'){
					let king = document.createElement('img');
					king.src='images/piecesPNG/' + side + 'k.png';
					king.className = "piece";
					square[i][j].appendChild(king);
				}
			}
		}
	}
}
class Queen{
	constructor(side){
		this.setPiece(side);
	}
	set price(value) {
		value = 9;
  }
	get price(){
		return this._price;
	}
	setPiece(side){
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				if(BoardPositionPieces[i][j] == side + 'q'){
					let queen = document.createElement('img');
					queen.src='images/piecesPNG/' + side + 'q.png';
					queen.className = "piece";
					square[i][j].appendChild(queen);
				}
			}
		}
	}
}
class Rook{
	constructor(side){
		this.setPiece(side);
	}
	set price(value) {
		value = 5;
  }
	get price(){
		return this._price;
	}
	setPiece(side){
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				if(BoardPositionPieces[i][j] == side +'r'){
					let rook = document.createElement('img');
					rook.src='images/piecesPNG/'+ side +'r.png';
					rook.className = "piece";
					square[i][j].appendChild(rook);
				}
			}
		}
	}
}
class Bishop{
	constructor(side){
		this.setPiece(side);
	}
	set price(value) {
		value = 3;
  }
	get price(){
		return this._price;
	}
	setPiece(side){
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				if(BoardPositionPieces[i][j] == side +'b'){
					let bishop = document.createElement('img');
					bishop.src='images/piecesPNG/'+ side +'b.png';
					bishop.className = "piece";
					square[i][j].appendChild(bishop);
				}
			}
		}
	}
}
class Knight{
	constructor(side){
		this.setPiece(side);
	}
	set price(value) {
		value = 3;
  }
	get price(){
		return this._price;
	}
	setPiece(side){
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				if(BoardPositionPieces[i][j] == side +'n'){
					let knight = document.createElement('img');
					knight.src='images/piecesPNG/'+ side +'n.png';
					knight.className = "piece knight";
					square[i][j].appendChild(knight);
				}
			}
		}
	}
}
function TranslateID(idName){
	let X,Y;
	let idNumber = ['1','2','3','4','5','6','7','8'];
	let idLetter = ['a','b','c','d','e','f','g','h'];
	for (let i = 0; i < 8; i++) {
		if(idName[0] === idNumber[i])
		{
			X = i;
		}
	}
		for (let i = 0; i < 8; i++) {
			if(idName[1] === idLetter[i])
			{
				Y = i;
			}
		}
		console.log('Координати: ', X + Y);
	return X, Y;
}
function MovePiece(){
	let x = 1;
	let y = 1;
	let square = this.document.querySelector('.square');
	if(this.square.innerHTMl.querySelector('.piece')){
		this.square.classList.add('.active');
	};
}
//Start position of pieces
let DefaultStartPosition = [
	['br','bn','bb','bq','bk','bb','bn','br'],
	['bp','bp','bp','bp','bp','bp','bp','bp'],
	['0', '0', '0', '0', '0', '0', '0', '0' ],
	['0', '0', '0', '0', '0', '0', '0', '0' ],
	['0', '0', '0', '0', '0', '0', '0', '0' ],
	['0', '0', '0', '0', '0', '0', '0', '0' ],
	['wp','wp','wp','wp','wp','wp','wp','wp'],
	['wr','wn','wb','wq','wk','wb','wn','wr']
];
//For Statistic Info and Save a Game Position
/*--->let BoardPositionPieces = [[],[],[],[],[],[],[],[]];<---*/
BoardPositionPieces = DefaultStartPosition;
//Massive of HTML Objects
/*--->*/let square = [[],[],[],[],[],[],[],[]];/*<---*/
function drawChess(){
	let chessBoard = document.querySelector('.chess-board');
	let out = '';
	let sizeBoard = 8;
	let m = 0;
		for (let i = 0; i < sizeBoard; i++) {
			for (let j = 0; j < sizeBoard; j++) {
				if(m % 2 == 0){
					out = `<div class="square white-square" data-x="${j}" data-y="${i}"></div>`
				}
				else{
					out = `<div class="square black-square" data-x="${j}" data-y="${i}"></div>`
				}
				m++;
			}
			m++;
		}
		chessBoard.innerHTML = out;
		document.querySelectorAll('.chess-board').forEach(function(element){
			element.addEventListener('onclick',MovePiece);
		});
		for (let i = 0; i < sizeBoard; i++) {
			for (let j = 0; j < sizeBoard; j++) {
				
			}
		}
		let white = new Player('w');
		let black = new Player('b');
	}
 drawChess();
EventOnClick = addEventListener(square[i][j].onclick) = TranslateID(square[i][j].id);
 function ChooseSquare(e){
	e.className += 'choose-square';
}
/*var piece = document.getElementById(square[i][j]);

piece.onmousedown = function(e) { // 1. отследить нажатие

  // подготовить к перемещению
  // 2. разместить на том же месте, но в абсолютных координатах
  piece.style.position = 'absolute';
  moveAt(e);
  // переместим в body, чтобы мяч был точно не внутри position:relative
  document.body.appendChild(ball);

  piece.style.zIndex = 1000; // показывать мяч над другими элементами

  // передвинуть мяч под координаты курсора
  // и сдвинуть на половину ширины/высоты для центрирования
  function moveAt(e) {
    piece.style.left = e.pageX - ball.offsetWidth / 2 + 'px';
    piece.style.top = e.pageY - ball.offsetHeight / 2 + 'px';
  }

  // 3, перемещать по экрану
  document.onmousemove = function(e) {
    moveAt(e);
  }

  // 4. отследить окончание переноса
  piece.onmouseup = function() {
    document.onmousemove = null;
    piece.onmouseup = null;
  }
}*/