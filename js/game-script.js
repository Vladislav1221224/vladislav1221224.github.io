class Player{
	constructor(nameValue){
		this.name = nameValue;
		this.side = this.name;
		let pawn = new Pawn(this.side);
		let king = new King(this.side);
		let queen = new Queen(this.side);
		let rook = new Rook(this.side);
		let bishop = new Bishop(this.side);
		let knight = new Knight(this.side);
	}
	set name(value){
		this._name = value;
	}
	get name(){
		return this._name;
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
		let price = 0;
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				if(CurrentPositionPieces[i][j] == this._side + 'p'){
					price += 1;
				}
				else if(CurrentPositionPieces[i][j] == this._side + 'q'){
					price += 9;
				}
				else if(CurrentPositionPieces[i][j] == this._side +'r'){
					price += 5;
				}
				else if(CurrentPositionPieces[i][j] == this._side +'b'){
					price += 3;
				}
				else if(CurrentPositionPieces[i][j] == this._side +'n'){
					price += 3;
				}
			}
		}
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
				if(CurrentPositionPieces[i][j] == side + 'p'){
					let pawn = document.createElement('img');
					pawn.src='images/piecesPNG/' + side + 'p.png';
					pawn.className = 'piece';
					squareHTMLArray[i][j].append(pawn);
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
				if(CurrentPositionPieces[i][j] == side + 'k'){
					let king = document.createElement('img');
					king.src='images/piecesPNG/' + side + 'k.png';
					king.className = 'piece';
					squareHTMLArray[i][j].append(king);
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
				if(CurrentPositionPieces[i][j] == side + 'q'){
					let queen = document.createElement('img');
					queen.src='images/piecesPNG/' + side + 'q.png';
					queen.className = 'piece';
					squareHTMLArray[i][j].append(queen);
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
				if(CurrentPositionPieces[i][j] == side +'r'){
					let rook = document.createElement('img');
					rook.src='images/piecesPNG/'+ side +'r.png';
					rook.className = 'piece';
					squareHTMLArray[i][j].append(rook);
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
				if(CurrentPositionPieces[i][j] == side +'b'){
					let bishop = document.createElement('img');
					bishop.src='images/piecesPNG/'+ side +'b.png';
					bishop.className = 'piece';
					squareHTMLArray[i][j].append(bishop);
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
				if(CurrentPositionPieces[i][j] == side +'n'){
					let knight = document.createElement('img');
					knight.src='images/piecesPNG/'+ side +'n.png';
					knight.className = 'piece';
					squareHTMLArray[i][j].append(knight);
				}
			}
		}
	}
}
//Massive of name of axes
const IDNUMBER = ['8','7','6','5','4','3','2','1'];
const IDLETTER = ['a','b','c','d','e','f','g','h'];

//Function setter and getter id
//////////////////////////////////////////////////////////
function setID(x,y){
	let idName = IDLETTER[x] + IDNUMBER[y];
	return idName;
}
function getID(idName){
	let tmp = [];
	for(let i = 0; i < 8;i++){
		if(idName[0] == IDLETTER[i]){
			tmp[0] = i;
		}
		if(idName[1] == IDNUMBER[i]){
			tmp[1] = i;
		}
	}
		return tmp;
}
//////////////////////////////////////////////////////////

//Global variable for move a pieces
/*--->*/let selectPiece = {element: null, name: undefined}/*<---*/
/*--->*/let arrPos = {x: null, y: null}/*<---*/
//Get a squareA with piece and set this piece in squareB
//////////////////////////////////////////////////////////

function selectSquare(element){
	for(let i = 0; i < 8; i++){
		for(let j = 0; j < 8; j++){
			$(squareHTMLArray[i][j]).removeClass('choose-square');
		}
	}
	$(element).addClass('choose-square');

	selectPiece.name = CurrentPositionPieces[arrPos.x][arrPos.y];
	CurrentPositionPieces[arrPos.x][arrPos.y] = '0';
	console.log('currentPiece = ' + selectPiece.name);
	selectPiece.element = element.querySelector('.piece');
	console.log('Square is selected(' + arrPos.x + '/' + arrPos.y + ')');
	console.log(element); 
}
//Functions, which will be used for move a pieces by players
//////////////////////////////////////////////////////////
function getPiece(element){

	arrPos = getPosOfSquareFromArr(element);
	//Variable for check the side of piece
	let name = CurrentPositionPieces[arrPos.x][arrPos.y];
	console.log(name);
	if(selectPiece.name){
		if(selectPiece.name[0] == name[0]){
			
		}
	}
	//Get a piece, if the square has a piece
	else if(element.querySelector('.piece')){
			if(!(element.classList.contains('choose-square'))){
				selectSquare(element);
			}
		//If the player select a selected square, that square will not be selected
		else if(element.classList.contains('choose-square')){
			console.log('Ето работает)');
			$(element).removeClass('choose-square');
			CurrentPositionPieces[arrPos.x][arrPos.y] = selectPiece.name;
			selectPiece.element = null;
			selectPiece.name = null;
			console.log('Square is unselected(' + arrPos.x + '/' + arrPos.y + ')');
		}
	}

	//If piece is selected and player select the empty square or square with enemy piece
	else if(selectPiece.element /*&& element.querySelector('.move-destionation')/*&& currentSide == mySide*/){
		console.log('Piece will be setted in square');
		setPiece(element,selectPiece.element);
	}
	//If player don't select a piece and he is select an empty square on console will be displayed 'Not founded piece!'
	else{
		console.log('Not founded piece!');
	}
}

//The function will be run if the piece has been selected
//////////////////////////////////////////////////////////
//This function sets the piece to squareB
function setPiece(element, piece){

	arrPos = getPosOfSquareFromArr(element);
	let eatenPiece = element.querySelector('.piece');

	//If square has enemy piece, this function remove enemy piece and set your piece to square
	if(element.querySelector('.move-destination')){
		if(eatenPiece){
			console.log('Eat is do!(' + arrPos.x + '/' + arrPos.y + ')')
			eatPiece(element);
			for(let i = 0; i < 8; i++){
				for(let j = 0; j < 8; j++){
					$(squareHTMLArray[i][j]).removeClass('choose-square');
				}
			}
			selectPiece.element = null;
			selectPiece.name = null;
		}
		else if(piece){
			console.log('Set Piece is do!(' + arrPos.x + '/' + arrPos.y + ')')
			for(let i = 0; i < 8; i++){
				for(let j = 0; j < 8; j++){
					$(squareHTMLArray[i][j]).removeClass('choose-square');
				}
			}
			arrPos = null;
			arrPos = getPosOfSquareFromArr(element);
			element.append(piece);
			CurrentPositionPieces[arrPos.x][arrPos.y] = selectPiece.name;

			selectPiece.element = null;
			selectPiece.name = null;
		}
	}
	else{
		console.log('You can\'t set piece at this square!');
	}
}
//If squareB has enemy piece, that function remove this piece and set your piece to squareB
function eatPiece(squareB){
	arrPos = getPosOfSquareFromArr(squareB);
	let secondSide = CurrentPositionPieces[arrPos.x][arrPos.y];
	if(squareB.querySelector('.piece') && selectPiece.name[0] != secondSide[0]){
		let deletedElement = squareB.querySelector('.piece');
		deletedElement.remove();
		squareB.append(selectPiece.element);
		CurrentPositionPieces[arrPos.x][arrPos.y] = selectPiece.name;
	}
	else{
		console.error('Error: that)))')
	}
}
//////////////////////////////////////////////////////////

//Changing a side(...for game)
//////////////////////////////////////////////////////////
//let mySide = 'white';
let currentSide = 'white';
function changeSide(){
		if(currentSide === 'white'){
			currentSide = 'black';
			return currentSide;
		}
		else if (currentSide === 'black'){
			currentSide = 'white';
			return currentSide;
		}
		else{
			console.error('Side is not changed!!!');
		}
	}
//////////////////////////////////////////////////////////

//Start position of pieces
var DefaultStartPosition = [
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
/*--->*/var CurrentPositionPieces = [[],[],[],[],[],[],[],[]];/*<---*/
CurrentPositionPieces = DefaultStartPosition;

//Massive of HTML Objects
/*--->*/var squareHTMLArray = [[],[],[],[],[],[],[],[]];/*<---*/

//Get position of Massive of HTML Objects
//////////////////////////////////////////////////////////
function getPosOfSquareFromArr(element){
	let x;
	let y;
	for(let i = 0; i < 8; i++){
		for(let j = 0; j < 8; j++){
			if(squareHTMLArray[i][j] == element){
				x = i;
				y = j;
			}
		}
	}
	return {x,y};
}
//////////////////////////////////////////////////////////

//If value = 'default', chessboard draw a DefaultStartPosition of pieces
//////////////////////////////////////////////////////////
function startGame(white,black){
	white._pricePlayer = white.pricePlayerPieces();
	console.log(white._name + '^'+ white._side + ' price = ' + white._pricePlayer);

	black._pricePlayer = black.pricePlayerPieces();
	console.log(black._name + '^'+ black._side + ' price = ' + black._pricePlayer);
}
//////////////////////////////////////////////////////////

//Other functions
//////////////////////////////////////////////////////////
function isString (s) {
	return typeof s === 'string'
}

function isFunction (f) {
	return typeof f === 'function'
}

function isInteger (n) {
	return typeof n === 'number' &&
				 isFinite(n) &&
				 Math.floor(n) === n
}
//////////////////////////////////////////////////////////

//Draw a chess)) The main function!!!
//////////////////////////////////////////////////////////
function drawChess(value){
	var chessBoard = document.querySelector('.chess-board');
	let out = '';
	var sizeBoard = 8;
	let m = 0;
	for (let i = 0; i < sizeBoard; i++) {
		for (let j = 0; j < sizeBoard; j++) {
			let innerElements = '';
			if(m % 2 == 0){
				if(j === 0){
					innerElements += `<div class="notation" id="number">${IDNUMBER[i]}</div>`
				}
				if(i === 7){
					innerElements += `<div class="notation" id="letter">${IDLETTER[j]}</div>`
				}
				out += `<div class="square white-square" id="${setID(j,i)}">${innerElements}</div>`
			}
			else{
				if(j === 0){
					innerElements += `<div class="notation" id="number">${IDNUMBER[i]}</div>`
				}
				if(i === 7){
					innerElements += `<div class="notation" id="letter">${IDLETTER[j]}</div>`
				}
				out += `<div class="square black-square" id="${setID(j,i)}">${innerElements}</div>`
			}
			m++;
		}
		m++;
	}
	chessBoard.innerHTML = out;

	//Set all events and functions for all squares
	///////////////////////////////////////////////////////////////////////////
	for(let i = 0; i < 8; i++){
		for(let j = 0; j < 8; j++){
			let square = document.getElementById(`${IDLETTER[i]}${IDNUMBER[j]}`);
			let id = getID(square.id);
			squareHTMLArray[id[0]][id[1]] = square;
		}
	}
	for(let i = 0; i < 8; i++){
		for(let j = 0; j < 8; j++){
			squareHTMLArray[i][j].onclick = function(){
				getPiece(squareHTMLArray[i][j]);
			}
		}
	}
	console.log(squareHTMLArray);
	///////////////////////////////////////////////////////////////////////////
	let white = new Player('white');
	let black = new Player('black');
	if(value === 'default'){
		startGame(white,black);
	}
	else if(value === 'empty'){

	}
	else if(value === ''){

	}

}
//////////////////////////////////////////////////////////
 drawChess('default');


//In developing!!! Dragging the pieces
/////////////////////////////////////////////////////////////
/*document.querySelectorAll('.piece').forEach(element = function(piece){

piece.onmousedown = function(e) { // 1. отследить нажатие

  // подготовить к перемещению
  // 2. разместить на том же месте, но в абсолютных координатах
  piece.style.position = 'absolute';
  moveAt(e);
  // переместим в body, чтобы мяч был точно не внутри position:relative
  document.body.append(piece);

  piece.style.zIndex = 1000; // показывать мяч над другими элементами

  // передвинуть мяч под координаты курсора
  // и сдвинуть на половину ширины/высоты для центрирования
  function moveAt(e) {
    piece.style.left = e.pageX - piece.offsetWidth / 2 + 'px';
    piece.style.top = e.pageY - piece.offsetHeight / 2 + 'px';
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
}});*/
/////////////////////////////////////////////////////////////