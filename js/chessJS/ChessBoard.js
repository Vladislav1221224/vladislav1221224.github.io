import { Cell } from "./cells.js";
import { Player } from "./Player.js";

		//Constant that holds the names of the sides
/*--->*/const SIDENAME = ['white', 'black'];/*<---*/
//Start position for chess
let DefaultStartPosition = [
	['br', 'bn', 'bb', 'bq', '0', '0', 'bn', 'br'],
	['bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp'],
	['0', '0', '0', '0', '0', 'bq', 'bb', 'bn'],
	['0', '0', '0', '0', 'bk', 'bb', '0', 'wr'],
	['0', '0', 'wb', '0', '0', 'br', '0', '0'],
	['0', '0', '0', 'wq', '0', '0', '0', '0'],
	['wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp'],
	['wr', 'wn', 'wb', '0', 'wk', 'wb', 'wn', 'wr']
];
let DefaultStartPosition1 = [
	['br', 'bn', 'bb', 'bq', 'bk', 'bb', 'bn', 'br'],
	['bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp'],
	['0', '0', '0', '0', '0', '0', '0', '0'],
	['0', '0', '0', '0', '0', '0', '0', '0'],
	['0', '0', 'wb', '0', '0', '0', '0', '0'],
	['0', '0', '0', '0', '0', '0', '0', '0'],
	['wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp'],
	['wr', 'wn', 'wb', 'wq', 'wk', 'wb', 'wn', 'wr']
];

// //For drag(in developing)
// let chessBoard = document.querySelector('.chess-board');
// let posInfo = chessBoard.getBoundingClientRect();
// console.log(posInfo);

class ChessBoard {
	constructor(value) {

		this._cellsArr = [[], [], [], [], [], [], [], []];

		this.currentPositionPieces = [[], [], [], [], [], [], [], []];

		this._player = [];
		this.drawChessBoard(value);
		this._playerSide = 'white';
		for (let i = 0; i < this.player.length; i++) {
			this.player[i].drawCheckMateArray();
		}
						//Global variable for move a pieces
		/*--->*/this.selectPiece/*<---*/
	}
	get player() {
		return this._player;
	}
	set html(value) {
		this._html = value;
	}
	get html() {
		return this._html;
	}
	//That's flag for changing a player move side
	///////////////////////////////////////
	set chessBoardSide(value) {
		this._chessBoardSide = value;
	}
	get chessBoardSide() {
		return this._chessBoardSide;
	}
	get playerSide() {
		return this._playerSide;
	}
	///////////////////////////////////////

	set isGame(value) {
		this._isGame = value;
	}
	get isGame() {
		return this._isGame;
	}
	get cellsArr() {
		return this._cellsArr;
	}
	isCheckMate(player) {
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				$(this.cellsArr[i][j].html).removeClass('check');
			}
		}
		if (this.isGame) {
			let winner;
			let pos = player.king.position;
			let isCheckMate = player.isCheckMate();
			console.log('Is CheckMate ' + isCheckMate)
			if (isCheckMate > 0) {
				$(this.cellsArr[pos.y][pos.x].html).addClass('check');
				if (isCheckMate == 2) {
					for (let i = 0; i < 2; i++) {
						if (this.player[i].side != player.side) {
							winner = this.player[i];
						}
					}
					console.log('ISCHECKMATE')
				}
			}
			if (winner) {
				this._winner = winner;
				console.log(this._winner)
			}
		}
	}
	get checkMate() {
		return this._winner;
	}
	changePlayerSide() {
		if (this._playerSide == SIDENAME[0]) {
			this._playerSide = SIDENAME[1];
		}
		else if (this._playerSide == SIDENAME[1]) {
			this._playerSide = SIDENAME[0];
		}
		else {
			console.error('Error: PlayerSide has not changed')
		}
	}
	changeChessBoardSide() {
		if (this.chessBoardSide == SIDENAME[0]) {
			this.chessBoardSide = SIDENAME[1];
		}
		else if (this.chessBoardSide == SIDENAME[1]) {
			this.chessBoardSide = SIDENAME[0];
		}
		else {
			console.error('Error: chessBoardSide has not changed')
		}
	}
	viewChessBoardCells(arr) {
		let myArr = [[], [], [], [], [], [], [], []];
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				myArr[i][j] = arr[i][j];
			}
		}
		console.log(myArr);
	}
	flipTheChessBoard() {
		if (this.selectPiece) {
			this.clearSelectSquare();
		}
		this.viewChessBoardCells(this.cellsArr);
		let arr = [[], [], [], [], [], [], [], []];
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				arr[7 - i][7 - j] = this.cellsArr[j][i];
			}
		}
		this.viewChessBoardCells(arr);
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				this.cellsArr[i][j] = arr[i][j];
			}
		}

		this.viewChessBoardCells(this.cellsArr);
		Cell.IDNUMBER.reverse();
		Cell.IDLETTER.reverse();
		this.changeChessBoardSide();
		console.log(this.chessBoardSide)
		this._player = [];
		this.drawChessBoard('myPos');
		this.viewChessBoardCells(this.cellsArr);
	}

	resetTheChessBoard() {
		if (this.selectPiece) {
			this.clearSelectSquare();
		}
		this.drawChessBoard('default');
	}

	//Draw a chess)) The main function!!!
	drawChessBoard(value) {
		this.html = document.querySelector('.chess-board');

		///////////////////////////////////////////////////////////////////////////
		if (value == 'default') {
			this.drawCells();
			this.chessBoardSide = SIDENAME[0];
			for (let i = 0; i < 8; i++) {
				for (let j = 0; j < 8; j++) {
					this.currentPositionPieces[j][i] = DefaultStartPosition[i][j];
				}
			}
			this.isGame = true;
			this._playerSide = SIDENAME[0];
			this.startGame();
		}
		else if (value == 'empty') {
			this.drawCells();
			this.isGame = true;
			this.chessBoardSide = SIDENAME[0];
			this.startGame();
		}
		else if (value == 'white') {
			this.drawCells();
			this.isGame = true;
			this.chessBoardSide = SIDENAME[0];
			this.currentPositionPieces = DefaultStartPosition;
			this.startGame();
		}
		else if (value == 'black') {
			this.drawCells();
			this.isGame = true;
			this.currentPositionPieces = DefaultStartPosition;
			this.startGame();
			this.flipTheChessBoard();
		}
		else if (value == 'myPos') {
			let myStartPos = [[], [], [], [], [], [], [], []];
			if (this.cellsArr[0][0]) {
				for (let i = 0; i < 8; i++) {
					for (let j = 0; j < 8; j++) {
						if (this.cellsArr[i][j].piece) {
							myStartPos[i][j] = this.cellsArr[i][j].piece.side[0];
							if (this.cellsArr[i][j].piece.name == 'knight') {
								myStartPos[i][j] += 'n'
							}
							else {
								myStartPos[i][j] += this.cellsArr[i][j].piece.name[0];
							}
						}
					}
				}
			}
			for (let i = 0; i < 8; i++) {
				for (let j = 0; j < 8; j++) {
					this.currentPositionPieces[i][j] = myStartPos[i][j];
				}
			}
			this.isGame = true;
			this.drawCells();
			this.startGame();
			console.log(this.cellsArr)
		}
		else if (value == 'clear') {
			for (let i = 0; i < 8; i++) {
				for (let j = 0; j < 8; j++) {
					this.cellsArr.html[i][j].remove();
				}
			}
		}
		else if (value == 'test') {
			this.drawCells();
			this.chessBoardSide = SIDENAME[0];
			for (let i = 0; i < 8; i++) {
				for (let j = 0; j < 8; j++) {
					this.currentPositionPieces[i][j] = DefaultStartPosition[i][j];
				}
			}
			this.isGame = false;
			this._playerSide = SIDENAME[0];
			this.startGame()
		}
		for (let i = 0; i < 2; i++) {
			this.player[i].drawCheckMateArray();
		}
		let player;
		for (let i = 0; i < 2; i++) {
			if (this.player[i].side == this.playerSide) {
				player = this.player[i];
			}
		}
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				$(this.cellsArr[i][j].html).removeClass('check');
			}
		}
		console.log(player)
		this.isCheckMate(player);

		this.clearSelectSquare();
		this.clearMoveDestination();
	}

	//Draw a cells and initialize cells events
	drawCells() {
		let chessBoard = document.querySelector('.chess-board');
		let out = '';
		//Set all events and functions for all squares
		///////////////////////////////////////////////////////////////////////////
		let color = 'white';
		function changeColor() {
			if (color == 'black') {
				color = 'white';
			} else if (color == 'white') {
				color = 'black';
			}
		}
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				let pos = { x: j, y: i };
				let cell = new Cell(pos, color, this);
				out += cell.html;
				this.cellsArr[i][j] = cell;
				changeColor();
			}
			changeColor();
		}
		chessBoard.innerHTML = out;
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				let pos = { x: j, y: i };
				let square = document.getElementById(`${Cell.IDLETTER[pos.x]}${Cell.IDNUMBER[pos.y]}`);
				this.cellsArr[pos.y][pos.x].html = square;
			}
		}

		//Select a square event
		//////////////////////////////////
		let chessboard = this;
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				let square = document.getElementById(`${Cell.IDLETTER[i]}${Cell.IDNUMBER[j]}`);
				square.onclick = function () {
					chessboard.movePiece(square);
				};
			}
		}
		//////////////////////////////////
		this.setAnimation();
		console.log(this);
	}

	movePiece(element) {
		let chessboard = this;
		if (this.checkMate == undefined) {
			console.log('is do')
			//Function, that select and unselect square
			//////////////////////////////////////////////////////////
			function selectSquare(element) {
				function select(square) {
					if (chessboard.selectPiece) {
						$(chessboard.selectPiece.html).removeClass('choose-square');
						chessboard.clearMoveDestination();
					}
					chessboard.selectPiece = square;
					$(element).addClass('choose-square');
					chessboard.selectPiece.piece.moveDestination('move');
				}
				let square = chessboard.getSquareFromArr(element);
				if (chessboard.isGame) {
					if (square.piece.side == chessboard.playerSide) {
						select(square);
					}
				}
				else {
					select(square);
				}
				console.log(square);
				console.log(square.piece);
			}
			//////////////////////////////////////////////////////////


			function setPiece(element) {
				if (!(element.querySelector('.piece'))) {
					console.log('Фигури нету!!!')
					if (element.querySelector('.move-destination')) {
						element.append(chessboard.selectPiece.piece.html);
						let square = chessboard.getSquareFromArr(element);
						square.piece = chessboard.selectPiece.piece;
						chessboard.selectPiece.piece.position = square.position;
						console.log(chessboard.selectPiece.piece.position);
						let side = chessboard.selectPiece.piece.side;
						chessboard.selectPiece.piece = undefined;
						for (let i = 0; i < 2; i++) {
							chessboard.player[i].drawCheckMateArray();
						}
						let player;
						for (let i = 0; i < 2; i++) {
							if (chessboard.player[i].side != side) {
								player = chessboard.player[i];
							}
						}
						for (let i = 0; i < 8; i++) {
							for (let j = 0; j < 8; j++) {
								$(chessboard.cellsArr[i][j].html).removeClass('check');
							}
						}
						console.log(player)
						chessboard.isCheckMate(player);

						chessboard.clearSelectSquare();
						chessboard.clearMoveDestination();
						chessboard.changePlayerSide();
						console.log('setPiece сработал');
					}
					else {
						console.log('Не допустимий ход!!!');
					}
				}
			}


			function eatPiece(element) {
				if (element.querySelector('.move-destination')) {
					if (element.querySelector('.piece')) {
						let square = chessboard.getSquareFromArr(element);
						square.piece.html.remove();
						for (let i = 0; i < 2; i++) {
							if (chessboard.player[i].side == square.piece.side) {
								let arr = [];
								for (let j = 0; j < chessboard.player[i].figures.length; j++) {
									if (chessboard.player[i].figures[j] == square.piece) {
										delete chessboard.player[i].figures[j];
									}
									else {
										arr.push(chessboard.player[i].figures[j]);
									}
								}
								console.log(arr)
								chessboard.player[i]._figures = arr;
							}
						}
						delete square.piece;

						setPiece(element);
					}
					else {
						console.error('Error: EatPiece не работает!!!')
					}
				}
				else {
					console.error('Error: EatPiece не работает!!!')
				}
			}
			console.log('клик');
			if (element.querySelector('.piece')) {
				if (!(chessboard.selectPiece)) {
					selectSquare(element);
				}
				else if (chessboard.selectPiece) {
					let square = chessboard.getSquareFromArr(element);
					if (square.position.x == chessboard.selectPiece.position.x && square.position.y == chessboard.selectPiece.position.y) {
						chessboard.clearSelectSquare();
						console.log('Фигура отменена');
					}
					else if (square.piece && chessboard.selectPiece.piece.side == square.piece.side) {

						selectSquare(element);
						console.log('Фигура сменена');
					}
					else if (square.piece && chessboard.selectPiece.side != square.piece.side && element.querySelector('.move-destination')) {
						eatPiece(element);
					}
				}
			}
			else if (!element.querySelector('.piece')) {
				let square = chessboard.getSquareFromArr(element);
				if (!square.piece && element.querySelector('.move-destination')) {
					setPiece(element);
				}
				else {
					chessboard.clearSelectSquare();
					chessboard.clearMoveDestination();
					console.error('Ничего не случилось');
				}
			}
			else {
				console.log('select или clear square не работают')
			}
		}
	}
	getSquareFromArr(element) {
		let cell;
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				if (this.cellsArr[i][j].html == element) {
					cell = this.cellsArr[i][j];
					console.log("Cell получена!!!")
				}
			}
		}
		return cell;
	}
	clearSelectSquare() {
		if (this.selectPiece) {
			$(this.selectPiece.html).removeClass('choose-square');
			this.clearMoveDestination();
			this.selectPiece = undefined;
		}
	}
	clearMoveDestination() {
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				let element = this.cellsArr[i][j].html.querySelector('.move-destination');
				if (element) {
					element.remove();
				}
			}
		}
	}
	//Animations
	setAnimation() {
		let chessboard = this;
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				$(chessboard.cellsArr[i][j].html).mouseover(function () {
					if (chessboard.cellsArr[i][j].html.querySelector('.move-destination') && !(chessboard.cellsArr[i][j].html.querySelector('.circle'))) {
						let element = chessboard.cellsArr[i][j].html.querySelector('.move-destination');
						element.style.width = 50 + '%';
						element.style.height = 50 + '%';
					}
					else if (chessboard.cellsArr[i][j].html.querySelector('.move-destination') && chessboard.cellsArr[i][j].html.querySelector('.circle')) {
						let element = chessboard.cellsArr[i][j].html.querySelector('.circle');
						let width = chessboard.cellsArr[i][j].html.offsetWidth;
						element.style.outlineOffset = -(width) * 54 / 100 * 80 / 100 + 'px';
						element.style.outlineWidth = width * 50 / 100 * 80 / 100 + 'px';
					}
				});
				$(chessboard.cellsArr[i][j].html).mouseout(function () {
					if (chessboard.cellsArr[i][j].html.querySelector('.move-destination') && !(chessboard.cellsArr[i][j].html.querySelector('.circle'))) {
						let element = chessboard.cellsArr[i][j].html.querySelector('.move-destination');
						element.style.width = 35 + '%';
						element.style.height = 35 + '%';
					}
					else if (chessboard.cellsArr[i][j].html.querySelector('.move-destination') && chessboard.cellsArr[i][j].html.querySelector('.circle')) {
						let element = chessboard.cellsArr[i][j].html.querySelector('.circle');
						element.style.outlineWidth = 5 + 'px';
						element.style.outlineOffset = -5 + 'px';
					}
				});
			}
		}
	}
	startGame() {
		let white = new Player('white', this);
		let black = new Player('black', this);
	};
}

export { ChessBoard };