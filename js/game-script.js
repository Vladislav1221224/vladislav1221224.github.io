class Player{
	constructor(nameValue){
		this.name = nameValue;

		this.side = this.name;
	}
	set name(value){
		this._name = value;
	}
	get name(){
		return this._name;
	}
	set side(value){
		this._side = value[0];
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
				if(currentPositionPieces[i][j] == this._side + 'p'){
					price += 1;
				}
				else if(currentPositionPieces[i][j] == this._side + 'q'){
					price += 9;
				}
				else if(currentPositionPieces[i][j] == this._side +'r'){
					price += 5;
				}
				else if(currentPositionPieces[i][j] == this._side +'b'){
					price += 3;
				}
				else if(currentPositionPieces[i][j] == this._side +'n'){
					price += 3;
				}
			}
		}
		return price;
	}
}
class Piece{
	constructor(name, pos){
		this.name = name;
		this.side = name[0];
		this.position = pos;
		this.addPiece(this.name);
	}
	set position(value){
		this._position = value;
	}
	get position(){
		return this._position;
	}
	set name(value) {
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
	addPiece(name){
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				let pieceName = currentPositionPieces[i][j];
				let side;
				if(pieceName[1] == name){
					if(pieceName[0] == 'w'){
						side = 'w';
					}
					else if(pieceName[0] == 'b'){
						side = 'b';
					}
					else{
						console.error('Error: side is not defined!');
					}
					let piece = document.createElement('img');
					piece.src='images/piecesPNG/' + side + name + '.png';
					piece.className = 'piece';
					squareHTMLArray[i][j].appendChild(piece);
				}
			}
		}
	}
}
class Pawn extends Piece{
	constructor(){
	super(side, {x, y})
		this.setPiece(side, this.name);
		this._name = 'p';
		console.log(this.name);
	}
}
//Pawn.name = 'pawn';
//new Pawn = ('white',{x:1,y:2});
//Massive of name of axes
var IDNUMBER = ['8','7','6','5','4','3','2','1'];
var IDLETTER = ['a','b','c','d','e','f','g','h'];

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
			tmp[1] = i;
		}
		if(idName[1] == IDNUMBER[i]){
			tmp[0] = i;
		}
	}
		return tmp;
}
//////////////////////////////////////////////////////////
//The function flips the chessboard
//////////////////////////////////////////////////////////
//Constant that holds the names of the sides
/*--->*/const SIDENAME = ['white','black'];/*<---*/
//Global variable, that holds, info about, which side is bottom of chessboard
/*--->*/let PlayerSide = SIDENAME[0];/*<---*/
function changePlayerSide(){
	console.log('SideName[0] = ' + SIDENAME[0]);
	console.log('SideName[1] = ' + SIDENAME[1]);
	console.log(PlayerSide == SIDENAME[1]);
	console.log(PlayerSide);
	if(PlayerSide == SIDENAME[0]){
		PlayerSide = SIDENAME[1];
	}
	else if(PlayerSide == SIDENAME[1]){
		PlayerSide = SIDENAME[0];
	}
	else{
		console.error('Error: PlayerSide has not changed')
	}
	console.log(PlayerSide);
}
function destroyTheChessBoard(){
	
}

function flipTheChessBoard(){
	if(selectPiece.name){
		currentPositionPieces[arrPos.x][arrPos.y] = selectPiece.name;
		clearSelectSquare();
	}
	let arr = [['0','0','0','0','0','0','0','0'],
						['0','0','0','0','0','0','0','0'],
						['0','0','0','0','0','0','0','0'],
						['0','0','0','0','0','0','0','0'],
						['0','0','0','0','0','0','0','0'],
						['0','0','0','0','0','0','0','0'],
						['0','0','0','0','0','0','0','0'],
						['0','0','0','0','0','0','0','0']];
	for(let i = 0; i < 8; i++){
		for(let j = 0; j < 8; j++){
			arr[7-i][7-j] = currentPositionPieces[i][j];
		}
	}
	for(let i = 0; i < 8; i++){
		for(let j = 0; j < 8; j++){
			currentPositionPieces[i][j] = arr[i][j];
		}
	}
	IDNUMBER.reverse();
	IDLETTER.reverse();
	changePlayerSide();
	console.log(PlayerSide);
	drawChess('myPos');
	console.log(PlayerSide);
}
function resetTheChessBoard(){
	if(selectPiece.name){
		currentPositionPieces[arrPos.x][arrPos.y] = selectPiece.name;
		clearSelectSquare();
	}
	console.log(currentPositionPieces);
	drawChess('clear');
	console.log(currentPositionPieces);
	drawChess('default');
	console.log(currentPositionPieces);
}
//////////////////////////////////////////////////////////
//Global variable for move a pieces
/*--->*/let selectPiece = {element: null, name: null}/*<---*/
/*--->*/let arrPos = {x: null, y: null}/*<---*/
//Get a squareA with piece and set this piece in squareB
//////////////////////////////////////////////////////////

//Veeeeeeeeeeeeeeerrrrrrrrrrrryyyyyyyyyyy big function, that set move destination of any piece
//////////////////////////////////////////////////////////
function setMoveDestination(){
	//Rule for Pawn

//Move conversion function for each side
	console.log('setMoveDestination is running');
	console.log(selectPiece.name);

	//Pawn
	if(selectPiece.name[1] == 'p'){
		console.log('Ето пешка');
		function destination(i,j){
			function mathPawn(x){
				if(selectPiece.name[0] != PlayerSide[0]){
					x = x;

				}
				else if(selectPiece.name[0] == PlayerSide[0]){
					x = -x;

				}
				return x;
			}

			let xx , yy;
			if(i == 0){
				xx = arrPos.x + mathPawn(j + 1);
				yy = arrPos.y;
			}
			else if(i == 1){
				xx = arrPos.x + mathPawn(1);
				yy = arrPos.y + 1;
			}
			else if(i == 2){
				xx = arrPos.x + mathPawn(1);
				yy = arrPos.y - 1;
			}
			return {xx,yy};
		}
		function isFirstMove(){
			let a = 1;
			if(arrPos.x == 1 && selectPiece.name[0] != PlayerSide[0]){
				a = 2;
			}
			else if(arrPos.x == 6 && selectPiece.name[0] == PlayerSide[0]){
				a = 2;
			}
			return a;
		}
		function isEnPassant(){

		}
		let a = 1;
		if(arrPos.x == 1 && selectPiece.name[0] != PlayerSide[0]){
			a = 2;
		}
		else if(arrPos.x == 6 && selectPiece.name[0] == PlayerSide[0]){
			a = 2;
		}
		for(let i = 0; i < 3; i++){
			if(i >= 1){
				a = 1;
			}
			for(let j = 0; j < isFirstMove(); j++){
				let xx = destination(i,j).xx;
				let yy = destination(i,j).yy;
				console.log(xx);
				console.log(yy);
				console.error('Tnj sajh')
				if(xx >= 0 && xx < 8 && yy >= 0 && yy < 8){
					console.error('Tnj sajh');
					let squareHasPiece = squareHTMLArray[xx][yy].querySelector('.piece');
					if(!(squareHasPiece) && i == 0){
						console.log('Пешка идет вперед');
						let moveDestination = document.createElement('div');
						console.log(moveDestination);
						moveDestination.className = 'move-destination';
						squareHTMLArray[xx][yy].appendChild(moveDestination);
					}
					else if(squareHasPiece && i > 0){
						let squareName = currentPositionPieces[xx][yy];
						if(squareName[0] != selectPiece.name[0]){
							let moveDestination = document.createElement('div');
							moveDestination.className = 'move-destination circle';
							squareHTMLArray[xx][yy].appendChild(moveDestination);
						}
						break;
					}
				}
			}
		}
	}
	//Bishop
	else if(selectPiece.name[1] == 'b'){
		console.log('Ето слон');
		function destination(i,j){
			let xx, yy;
			if(i == 0){
				xx = arrPos.x + (j + 1);
				yy = arrPos.y + (j + 1);
			}
			else if(i == 1){
				xx = arrPos.x - (j + 1);
				yy = arrPos.y + (j + 1);
			}
			else if(i == 2){
				xx = arrPos.x + (j + 1);
				yy = arrPos.y - (j + 1);
			}
			else if(i == 3){
				xx = arrPos.x - (j + 1);
				yy = arrPos.y - (j + 1);
			}
			return {xx,yy};
		}
		for(let i = 0; i < 4; i++){
			for(let j = 0; j < 8; j++){
				let xx = destination(i,j).xx;
				let yy = destination(i,j).yy;
				if(xx >= 0 && xx < 8 && yy >= 0 && yy < 8){
					squareHasPiece = squareHTMLArray[xx][yy].querySelector('.piece');
					if(!(squareHasPiece)){
						console.log('Слон идет');
						let moveDestination = document.createElement('div');
						moveDestination.className = 'move-destination';
						squareHTMLArray[xx][yy].appendChild(moveDestination);
					}
					else if(squareHasPiece){
						let squareName = currentPositionPieces[xx][yy];
						if(squareName[0] != selectPiece.name[0]){
							let moveDestination = document.createElement('div');
							moveDestination.className = 'move-destination circle';
							squareHTMLArray[xx][yy].appendChild(moveDestination);
						}
						break;
					}
				}
			}
		}

	}
	//Knight
	else if(selectPiece.name[1] == 'n'){
		console.log('Ето Конь');
			let possible=[[arrPos.x+2,arrPos.y+1],[arrPos.x+2,arrPos.y-1],[arrPos.x-2,arrPos.y+1],[arrPos.x-2,arrPos.y-1],[arrPos.x+1,arrPos.y+2],[arrPos.x+1,arrPos.y-2],[arrPos.x-1,arrPos.y+2],[arrPos.x-1,arrPos.y-2]]; 
			possible.forEach(([ xx , yy ])=>{
				if(xx >= 0 && xx < 8 && yy >= 0 && yy < 8){
					squareHasPiece = squareHTMLArray[xx][yy].querySelector('.piece');
					if(!(squareHasPiece)){
						console.log('Конь идет');
						let moveDestination = document.createElement('div');
						moveDestination.className = 'move-destination';
						squareHTMLArray[xx][yy].appendChild(moveDestination);
					}
					else if(squareHasPiece){
						let squareName = currentPositionPieces[xx][yy];
						if(squareName[0] != selectPiece.name[0]){
							let moveDestination = document.createElement('div');
							moveDestination.className = 'move-destination circle';
							squareHTMLArray[xx][yy].appendChild(moveDestination);
						}
					}
				}
			});
	}
	//Rook
	else if(selectPiece.name[1] == 'r'){
		console.log('Ето тура');
		function destination(i,j){
			let xx, yy;
			if(i == 0){
				xx = arrPos.x + (j + 1);
				yy = arrPos.y;
			}
			else if(i == 1){
				xx = arrPos.x - (j + 1);
				yy = arrPos.y;
			}
			else if(i == 2){
				xx = arrPos.x;
				yy = arrPos.y + (j + 1);
			}
			else if(i == 3){
				xx = arrPos.x;
				yy = arrPos.y - (j + 1);
			}
			return {xx,yy};
		}
		for(let i = 0; i < 4; i++){
			for(let j = 0; j < 8; j++){
				let xx = destination(i,j).xx;
				let yy = destination(i,j).yy;
				if(xx >= 0 && xx < 8 && yy >= 0 && yy < 8){
					squareHasPiece = squareHTMLArray[xx][yy].querySelector('.piece');
					if(!(squareHasPiece)){
						console.log('Тура идет');
						let moveDestination = document.createElement('div');
						moveDestination.className = 'move-destination';
						squareHTMLArray[xx][yy].appendChild(moveDestination);
					}
					else if(squareHasPiece){
						let squareName = currentPositionPieces[xx][yy];
						if(squareName[0] != selectPiece.name[0]){
							let moveDestination = document.createElement('div');
							moveDestination.className = 'move-destination circle';
							squareHTMLArray[xx][yy].appendChild(moveDestination);
						}
						break;
					}
				}
			}
		}
		/*for(let i = 0; i < 8; i++){
			console.log(arrPos);
			let x = arrPos.x + (i + 1);
			let y = arrPos.y
			console.log('pos: ' + x + ' / ' + y);
			if(0 <= x && x < 8 && 0 <= y && y < 8){
				squareHasPiece = squareHTMLArray[x][y].querySelector('.piece');
				if(!(squareHasPiece)){
					console.log('Слон идет по');
					let moveDestination = document.createElement('div');
					moveDestination.className = 'move-destination';
					squareHTMLArray[x][y].appendChild(moveDestination);
				}
				else if(squareHasPiece){
					let squareName = currentPositionPieces[x][y];
					if(squareName[0] != selectPiece.name[0]){
						let moveDestination = document.createElement('div');
						moveDestination.className = 'move-destination circle';
						squareHTMLArray[x][y].appendChild(moveDestination);
					}
					break;
				}
			}
		}

		for(let i = 0; i < 8; i++){
			console.log(arrPos);
			let x = arrPos.x - (i + 1);
			let y = arrPos.y;
			console.log('pos: ' + x + ' / ' + y);
			if(0 <= x && x < 8 && 0 <= y && y < 8){
				squareHasPiece = squareHTMLArray[x][y].querySelector('.piece');
				if(!(squareHasPiece)){
					console.log('Слон идет по');
					let moveDestination = document.createElement('div');
					moveDestination.className = 'move-destination';
					squareHTMLArray[x][y].appendChild(moveDestination);
				}
				else if(squareHasPiece){
					let squareName = currentPositionPieces[x][y];
					if(squareName[0] != selectPiece.name[0]){
						let moveDestination = document.createElement('div');
						moveDestination.className = 'move-destination circle';
						squareHTMLArray[x][y].appendChild(moveDestination);
					}
					break;
				}
			}
		}


		for(let i = 0; i < 8; i++){
			console.log(arrPos);
			let x = arrPos.x;
			let y = arrPos.y - (i + 1);
			console.log('pos: ' + x + ' / ' + y);
			if(0 <= x && x < 8 && 0 <= y && y < 8){
				squareHasPiece = squareHTMLArray[x][y].querySelector('.piece');
				if(!(squareHasPiece)){
					console.log('Слон идет по');
					let moveDestination = document.createElement('div');
					moveDestination.className = 'move-destination';
					squareHTMLArray[x][y].appendChild(moveDestination);
				}
				else if(squareHasPiece){
					let squareName = currentPositionPieces[x][y];
					if(squareName[0] != selectPiece.name[0]){
						let moveDestination = document.createElement('div');
						moveDestination.className = 'move-destination circle';
						squareHTMLArray[x][y].appendChild(moveDestination);
					}
					break;
				}
			}
		}

		for(let i = 0; i < 8; i++){
			console.log(arrPos);
			let x = arrPos.x;
			let y = arrPos.y + (i + 1);
			console.log('pos: ' + x + ' / ' + y);
			if(0 <= x && x < 8 && 0 <= y && y < 8){
				squareHasPiece = squareHTMLArray[x][y].querySelector('.piece');
				if(!(squareHasPiece)){
					console.log('Слон идет по');
					let moveDestination = document.createElement('div');
					moveDestination.className = 'move-destination';
					squareHTMLArray[x][y].appendChild(moveDestination);
				}
				else if(squareHasPiece){
					let squareName = currentPositionPieces[x][y];
					if(squareName[0] != selectPiece.name[0]){
						let moveDestination = document.createElement('div');
						moveDestination.className = 'move-destination circle';
						squareHTMLArray[x][y].appendChild(moveDestination);
					}
					break;
				}
			}
		}*/
	}
	//Queen
	else if(selectPiece.name[1] == 'q'){
		function destination(i,j){
			let xx, yy;
			if(i == 0){
				xx = arrPos.x + (j + 1);
				yy = arrPos.y;
			}
			else if(i == 1){
				xx = arrPos.x - (j + 1);
				yy = arrPos.y;
			}
			else if(i == 2){
				xx = arrPos.x;
				yy = arrPos.y + (j + 1);
			}
			else if(i == 3){
				xx = arrPos.x;
				yy = arrPos.y - (j + 1);
			}
			else if(i == 4){
				xx = arrPos.x + (j + 1);
				yy = arrPos.y + (j + 1);
			}
			else if(i == 5){
				xx = arrPos.x - (j + 1);
				yy = arrPos.y + (j + 1);
			}
			else if(i == 6){
				xx = arrPos.x + (j + 1);
				yy = arrPos.y - (j + 1);
			}
			else if(i == 7){
				xx = arrPos.x - (j + 1);
				yy = arrPos.y - (j + 1);
			}
			return {xx,yy};
		}
		for(let i = 0; i < 8; i++){
			for(let j = 0; j < 8; j++){
				let xx = destination(i,j).xx;
				let yy = destination(i,j).yy;
				if(xx >= 0 && xx < 8 && yy >= 0 && yy < 8){
					squareHasPiece = squareHTMLArray[xx][yy].querySelector('.piece');
					if(!(squareHasPiece)){
						console.log('Тура идет');
						let moveDestination = document.createElement('div');
						moveDestination.className = 'move-destination';
						squareHTMLArray[xx][yy].appendChild(moveDestination);
					}
					else if(squareHasPiece){
						let squareName = currentPositionPieces[xx][yy];
						if(squareName[0] != selectPiece.name[0]){
							let moveDestination = document.createElement('div');
							moveDestination.className = 'move-destination circle';
							squareHTMLArray[xx][yy].appendChild(moveDestination);
						}
						break;
					}
				}
			}
		}
	}
	//King
	else if(selectPiece.name[1] == 'k'){
		function destination(i){
			let xx, yy;
			if(i == 0){
				xx = arrPos.x + 1;
				yy = arrPos.y;
			}
			else if(i == 1){
				xx = arrPos.x - 1;
				yy = arrPos.y;
			}
			else if(i == 2){
				xx = arrPos.x;
				yy = arrPos.y + 1;
			}
			else if(i == 3){
				xx = arrPos.x;
				yy = arrPos.y - 1;
			}
			else if(i == 4){
				xx = arrPos.x + 1;
				yy = arrPos.y + 1;
			}
			else if(i == 5){
				xx = arrPos.x - 1;
				yy = arrPos.y + 1;
			}
			else if(i == 6){
				xx = arrPos.x + 1;
				yy = arrPos.y - 1;
			}
			else if(i == 7){
				xx = arrPos.x - 1;
				yy = arrPos.y - 1;
			}
			return {xx,yy};
		}
		for(let i = 0; i < 8; i++){
			let xx = destination(i).xx;
			let yy = destination(i).yy;
			if(xx >= 0 && xx < 8 && yy >= 0 && yy < 8){
				squareHasPiece = squareHTMLArray[xx][yy].querySelector('.piece');
				if(!(squareHasPiece)){
					console.log('Король идет');
					let moveDestination = document.createElement('div');
					moveDestination.className = 'move-destination';
					squareHTMLArray[xx][yy].appendChild(moveDestination);
				}
				else if(squareHasPiece){
					let squareName = currentPositionPieces[xx][yy];
					if(squareName[0] != selectPiece.name[0]){
						let moveDestination = document.createElement('div');
						moveDestination.className = 'move-destination circle';
						squareHTMLArray[xx][yy].appendChild(moveDestination);
					}
				}
			}
		}
	}
}
function clearMoveDestination(){
	for (let i = 0; i < 8; i++) {
		for (let j = 0; j < 8; j++) {
			let square = document.querySelector('.move-destination');
			if(square){
				square.remove();
			}
		}
	}
}
//////////////////////////////////////////////////////////

//Function, that select and unselect square
//////////////////////////////////////////////////////////
function selectSquare(element){
	for(let i = 0; i < 8; i++){
		for(let j = 0; j < 8; j++){
			$(squareHTMLArray[i][j]).removeClass('choose-square');
		}
	}
	clearMoveDestination();
	$(element).addClass('choose-square');
	arrPos = getPosOfSquareFromArr(element);
	selectPiece.name = currentPositionPieces[arrPos.x][arrPos.y];
	currentPositionPieces[arrPos.x][arrPos.y] = '0';
	console.log('Name of piece = ' + selectPiece.name);
	selectPiece.element = element.querySelector('.piece');
	console.log('Square is selected(' + arrPos.x + '/' + arrPos.y + ')');
	console.log(element); 
	console.log('Работает selectSquare');
	setMoveDestination();
}
function clearSelectSquare(){
	arrPos.x = null;
	arrPos.y = null;
	selectPiece.element = null;
	selectPiece.name = null;
	for(let i = 0; i < 8; i++){
		for(let j = 0; j < 8; j++){
			$(squareHTMLArray[i][j]).removeClass('choose-square');
		}
	}
	console.log('clearSelectSquare работает')
	console.log(selectPiece);
}
//////////////////////////////////////////////////////////

//Functions, which will be used for move a pieces by players
//////////////////////////////////////////////////////////
function movePiece(element){
	console.log('клик');
	if(element.querySelector('.piece')){
		console.log('Ми получаем фигуру!!!');
		if(!(selectPiece.element)){
			selectSquare(element);
			console.log('Фигура получена');
		}
		else if(selectPiece.element){
			let pos;
			pos = getPosOfSquareFromArr(element);
			console.log(pos);
			let name = currentPositionPieces[pos.x][pos.y];
			if(pos.x == arrPos.x && pos.y == arrPos.y){
				currentPositionPieces[arrPos.x][arrPos.y] = selectPiece.name;
				clearMoveDestination();
				clearSelectSquare();
				console.log('Фигура отменена');
			}
			else if(selectPiece.name[0] == name[0]){
				console.log(selectPiece.name[0] + name[0]);
				currentPositionPieces[arrPos.x][arrPos.y] = selectPiece.name;
				selectSquare(element);
				console.log('Фигура сменена');
			}
			else if((selectPiece.name[0] != name[0]) && element.querySelector('.move-destination')){
				console.log(selectPiece.name[0] + name[0]);
				eatPiece(element);
				clearSelectSquare();
			}
			else{
				currentPositionPieces[arrPos.x][arrPos.y] = selectPiece.name;
				clearSelectSquare();
				clearMoveDestination();
				console.error('Ничего не случилось');
			}
		}
		else{
			console.log('select или clear square не работают')
		}
	}
	else if(selectPiece.element){
		console.log('Ми ставим фигуру!!!');
		if(element.querySelector('.piece')){
			let pos = {x: null,y: null};
			pos = getPosOfSquareFromArr(element);
			console.log(pos);
			let name = currentPositionPieces[pos.x][pos.y];
			if(selectPiece.name[0] == name[0]){
				selectSquare(element);
			}
		}
		else if(!element.querySelector('.piece')){
			setPiece(element);
		}
		else{
			console.error('SetPiece не работает!!!');
		}
	}
	else{
		console.log('Нихера не работает')
	}
}
function setPiece(element){
	if(!(element.querySelector('.piece'))){
		console.log('Фигури нету!!!')
		if(element.querySelector('.move-destination')){
			element.append(selectPiece.element);
			let pos = getPosOfSquareFromArr(element);
			console.log(pos);
			currentPositionPieces[pos.x][pos.y] = selectPiece.name;
			console.log(currentPositionPieces[pos.x][pos.y]);
			clearSelectSquare();
			clearMoveDestination();
			console.log('setPiece сработал');
		}
		else{
			console.log('Не допустимий ход!!!')
		}
	}
}
function eatPiece(element){
	if(element.querySelector('.move-destination')){
		if(element.querySelector('.piece')){
			element.querySelector('.piece').remove();
			setPiece(element);
		}
		else{
			console.error('Error: EatPiece не работает!!!')
		}
	}
	else{
		console.error('Error: EatPiece не работает!!!')
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
/*--->*/let currentPositionPieces = [[],[],[],[],[],[],[],[]];/*<---*/

//Massive of HTML Objects
/*--->*/let squareHTMLArray = [[],[],[],[],[],[],[],[]];/*<---*/

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
	console.log(currentPositionPieces);
	let pawn = new Piece('p');
	let king = new Piece('k');
	let queen = new Piece('q');
	let rook = new Piece('r');
	let bishop = new Piece('b');
	let knight = new Piece('n');
	console.log('Функция startGame');
	console.log(currentPositionPieces);
	white.pricePlayer = white.pricePlayerPieces();

	black._pricePlayer = black.pricePlayerPieces();
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
	let chessBoard = document.querySelector('.chess-board');
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
				console.log(DefaultStartPosition);
				movePiece(squareHTMLArray[i][j]);
				console.log(DefaultStartPosition);
			}
		}
	}
	console.log(squareHTMLArray);
	///////////////////////////////////////////////////////////////////////////
	let white = new Player('white');
	let black = new Player('black');
	if(value == 'default'){
		PlayerSide = SIDENAME[0];
		for(let i = 0; i < 8; i++){
			for(let j = 0; j < 8; j++){
				currentPositionPieces[i][j] = DefaultStartPosition[i][j];
			}
		}
		startGame(white,black);
	}
	else if(value == 'empty'){
		PlayerSide = SIDENAME[0];
		startGame(white,black);
	}
	else if(value == 'white'){
		PlayerSide = SIDENAME[0];
		currentPositionPieces = DefaultStartPosition;
		startGame(white,black);
	}
	else if(value == 'black'){
		PlayerSide = SIDENAME[1];
		currentPositionPieces = DefaultStartPosition;
		startGame(white,black);
		flipTheChessBoard();
	}
	else if(value == 'myPos'){
		let myStartPos = [['0','0','0','0','0','0','0','0'],
		['0','0','0','0','0','0','0','0'],
		['0','0','0','0','0','0','0','0'],
		['0','0','0','0','0','0','0','0'],
		['0','0','0','0','0','0','0','0'],
		['0','0','0','0','0','0','0','0'],
		['0','0','0','0','0','0','0','0'],
		['0','0','0','0','0','0','0','0']];
		if(currentPositionPieces){
			for(let i = 0; i < 8; i++){
				for(let j = 0; j < 8; j++){
					myStartPos[i][j] = currentPositionPieces[i][j];
				}
			}	
		}
		for(let i = 0; i < 8; i++){
			for(let j = 0; j < 8; j++){
				currentPositionPieces[i][j] = myStartPos[i][j];
			}
		}
		startGame(white,black);
	}
	else if(value == 'clear'){
		currentPositionPieces = [['0','0','0','0','0','0','0','0'],
														['0','0','0','0','0','0','0','0'],
														['0','0','0','0','0','0','0','0'],
														['0','0','0','0','0','0','0','0'],
														['0','0','0','0','0','0','0','0'],
														['0','0','0','0','0','0','0','0'],
														['0','0','0','0','0','0','0','0'],
														['0','0','0','0','0','0','0','0']];
														for(let i = 0; i < 8; i++){
															for(let j = 0; j < 8; j++){
																squareHTMLArray[i][j].remove();
															}
														}
	}

}
//////////////////////////////////////////////////////////
 drawChess('default');

 document.querySelector('.flip-chess-board').onclick = function(){
	flipTheChessBoard();
 }
 document.querySelector('.reset-chess-board').onclick = function(){
	resetTheChessBoard();
 }

 //Animations
 /////////////////////////////////////////////////////////////
 for(let i = 0; i < 8; i++){
	for(let j = 0; j < 8; j++){
		$(squareHTMLArray[i][j]).mouseover(function(){
			if(squareHTMLArray[i][j].querySelector('.move-destination')  && !(squareHTMLArray[i][j].querySelector('.circle'))){
					element = squareHTMLArray[i][j].querySelector('.move-destination');
					element.style.width = 50 + '%';
					element.style.height = 50 + '%';
			}
			else if(squareHTMLArray[i][j].querySelector('.move-destination')  && squareHTMLArray[i][j].querySelector('.circle')){
				element = squareHTMLArray[i][j].querySelector('.circle');
				let width = squareHTMLArray[i][j].offsetWidth;
				element.style.outlineOffset = -(width) * 54/100*80/100 + 'px';
				element.style.outlineWidth = width * 50/100*80/100 + 'px';
		}
		});
		$(squareHTMLArray[i][j]).mouseout(function(){
			if(squareHTMLArray[i][j].querySelector('.move-destination')  && !(squareHTMLArray[i][j].querySelector('.circle'))){
				element = squareHTMLArray[i][j].querySelector('.move-destination');
				element.style.width = 35 + '%';
				element.style.height = 35 + '%';
			}
			else if(squareHTMLArray[i][j].querySelector('.move-destination')  && squareHTMLArray[i][j].querySelector('.circle')){
				element = squareHTMLArray[i][j].querySelector('.circle');
				element.style.outlineWidth = 5 + 'px';
				element.style.outlineOffset = -5 + 'px';
		}
		});
	}
}
let chessBoard = document.querySelector('.chess-board');
console.log(chessBoard);
let posInfo = chessBoard.getBoundingClientRect();
console.log(posInfo);
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