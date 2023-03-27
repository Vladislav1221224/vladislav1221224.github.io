import { Cell } from "./cells.js";
import { Player } from "./Player.js";
import { Pawn, King, Knight, Bishop, Rook, Queen } from "./Piece.js";
		//Constant that holds the names of the sides
/*--->*/const SIDENAME = ['white', 'black'];/*<---*/
//Start position for chess
let DefaultStartPosition = [
	['br', 'bn', 'bb', 'bq', 'bk', 'bb', 'bn', 'br'],
	['bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp'],
	['0', '0', '0', '0', '0', '0', '0', '0'],
	['0', '0', '0', '0', '0', '0', '0', '0'],
	['0', '0', '0', '0', '0', '0', '0', '0'],
	['0', '0', '0', '0', '0', '0', '0', '0'],
	['wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp'],
	['wr', 'wn', 'wb', 'wq', 'wk', 'wb', 'wn', 'wr']
];


//Test position
////////////////////////////////////////////////////////
let DefaultStartPosition1 = [
	['br', 'bn', 'bb', 'bq', 'bk', 'bb', 'bn', 'br'],
	['bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp'],
	['0', '0', '0', '0', '0', '0', '0', '0'],
	['0', '0', '0', '0', '0', '0', '0', '0'],
	['0', '0', '0', '0', '0', '0', '0', '0'],
	['0', '0', '0', '0', '0', '0', '0', '0'],
	['wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp'],
	['wr', 'wn', 'wb', 'wq', 'wk', 'wb', 'wn', 'wr']
];
////////////////////////////////////////////////////////





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
		document.oncontextmenu = function () {
			return false;
		};
		this.isSelect = false;
		this.isDeveloper = false;
	}

	//Global variable for move a pieces
	set selectPiece(value) {
		this._selectPiece = value;
	}
	get selectPiece() {
		return this._selectPiece;
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
	set isDeveloper(value){
		this._isDeveloper = value;
	}
	get isDeveloper(){
		return this._isdeveloper;
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

	set isSelect(value) {
		this._isSelect = value;
	}
	get isSelect() {
		return this._isSelect;
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
							if (this.cellsArr[i][j].piece.position.x == this.cellsArr[i][j].position.x && this.cellsArr[i][j].piece.position.y == this.cellsArr[i][j].position.y) {
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
			}
			for (let i = 0; i < 8; i++) {
				for (let j = 0; j < 8; j++) {
					this.currentPositionPieces[i][j] = myStartPos[i][j];
				}
			}
			this.isGame = true;
			this.drawCells();
			this.startGame();
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
		if(this.isDeveloper){console.log(player)};
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


		document.querySelectorAll('*').forEach((element) => {
			element.onmousedown = function (mouse) {
				if (mouse.button == 0) {
					if (!chessboard.isChessBoard(mouse.clientX, mouse.clientY) && chessboard.selectPiece) {
						console.log('HTML is cancelled');
						let piece = chessboard.selectPiece.piece;
						console.log(piece)
						document.onmousemove = null;
						piece.html.onmouseup = null;
						piece.html.style.position = 'relative';
						piece.html.style.width = 100 + '%';
						piece.html.style.height = 100 + '%';
						piece.html.style.left = 0 + 'px';
						piece.html.style.top = 0 + 'px';
						chessboard.selectPiece.html.append(chessboard.selectPiece.piece.html);
						chessboard.clearSelectSquare();
						$(chessboard.html).removeClass('dragging');
						document.querySelectorAll('.square').forEach((element) => {
							if (element.querySelector('.piece')) {
								element.style.cursor = 'grab';
							}
							else if (!element.querySelector('.piece')) {
								element.style.cursor = 'default';
							}
						})
					}
				}
				if (mouse.button == 2) {
					if (chessboard.selectPiece) {
						let piece = chessboard.selectPiece.piece;
						if (chessboard.isDeveloper) {
							console.log('HTML is cancelled');
							console.log(piece)
						}
						document.onmousemove = null;
						piece.html.onmouseup = null;
						piece.html.style.position = 'relative';
						piece.html.style.width = 100 + '%';
						piece.html.style.height = 100 + '%';
						piece.html.style.left = 0 + 'px';
						piece.html.style.top = 0 + 'px';
						chessboard.selectPiece.html.append(chessboard.selectPiece.piece.html);
						chessboard.clearSelectSquare();
						$(chessboard.html).removeClass('dragging');
						document.querySelectorAll('.square').forEach((element) => {
							if (element.querySelector('.piece')) {
								element.style.cursor = 'grab';
							}
							else if (!element.querySelector('.piece')) {
								element.style.cursor = 'default';
							}
						})
					}
				}
			}
			element.onmouseup = function (mouse) {
				if (mouse.button == 0) {
					if (chessboard.selectPiece && !chessboard.isChessBoard(mouse.clientX, mouse.clientY)) {
						let piece = chessboard.selectPiece.piece;
						document.onmousemove = null;
						piece.html.style.position = 'relative';
						piece.html.style.width = 100 + '%';
						piece.html.style.height = 100 + '%';
						piece.html.style.left = 0 + 'px';
						piece.html.style.top = 0 + 'px';
						if (!element.classList.contains('square')) {
							chessboard.selectPiece.html.append(chessboard.selectPiece.piece.html);
							chessboard.clearSelectSquare();
						}
						$(chessboard.html).removeClass('dragging');
						document.querySelectorAll('.square').forEach((element) => {
							if (element.querySelector('.piece')) {
								element.style.cursor = 'grab';
							}
							else if (!element.querySelector('.piece')) {
								element.style.cursor = 'default';
							}
						})
					}
				}
			}
		})
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				let square = document.getElementById(`${Cell.IDLETTER[i]}${Cell.IDNUMBER[j]}`);

				//Dragging logic
				///////////////////////////////////////////////////////////////////////
				square.onmousedown = function (mouse) {
					if (mouse.button == 0) {
						if (document.querySelector('#pawn-promotion-layout')) {
							//chessboard.movePiece(chessboard.cellsArr[j][i]);
							if (chessboard.selectPiece) {
								console.log('HTML is cancelled');
								let piece = chessboard.selectPiece.piece;
								console.log(piece)
								document.onmousemove = null;
								piece.html.onmouseup = null;
								piece.html.style.position = 'relative';
								piece.html.style.width = 100 + '%';
								piece.html.style.height = 100 + '%';
								piece.html.style.left = 0 + 'px';
								piece.html.style.top = 0 + 'px';
								piece.square.html.append(piece.html);
								chessboard.clearSelectSquare();
								$(chessboard.html).removeClass('dragging');
								document.querySelectorAll('.square').forEach((element) => {
									if (element.querySelector('.piece')) {
										element.style.cursor = 'grab';
									}
									else if (!element.querySelector('.piece')) {
										element.style.cursor = 'default';
									}
								})
							}
						}
						else {
							if (!chessboard.selectPiece || chessboard.selectPiece.html != square) {
								chessboard.movePiece(chessboard.cellsArr[j][i]);
							}
							if (chessboard.selectPiece) {
								$(chessboard.html).addClass('dragging');
								document.querySelectorAll('.square').forEach((element) => {
									element.style.cursor = 'grabbing';
								})
								let piece = chessboard.selectPiece.piece;
								if (!chessboard.isSelect || chessboard.selectPiece.html == square) { chessboard.dragging(piece)}
							}
						}
					}
				}
				square.onmousemove = function () {
					if (chessboard.html.classList.contains('dragging')) {
						square.style.cursor = 'grabbing';
					}
					else if (chessboard.cellsArr[j][i].piece && square.style.cursor != 'grabbing') {
						square.style.cursor = 'grab';
					}
					else if (!chessboard.cellsArr[j][i].piece && square.style.cursor != 'grabbing') {
						square.style.cursor = 'default';
					}
				}
				square.onmouseup = function (mouse) {
					if (mouse.button == 0) {
						if (chessboard.selectPiece) {
							let piece = chessboard.selectPiece.piece;
							document.onmousemove = null;
							piece.html.onmouseup = null;
							piece.html.style.position = 'relative';
							piece.html.style.width = 100 + '%';
							piece.html.style.height = 100 + '%';
							piece.html.style.left = 0 + 'px';
							piece.html.style.top = 0 + 'px';
							chessboard.movePiece(chessboard.cellsArr[j][i]);
							$(chessboard.html).removeClass('dragging');
							document.querySelectorAll('.square').forEach((element) => {
								if (element.querySelector('.piece')) {
									element.style.cursor = 'grab';
								}
								else if (!element.querySelector('.piece')) {
									element.style.cursor = 'default';
								}
							})
						}
					}
				}
				///////////////////////////////////////////////////////////////////////
			}
		}
		this.setAnimation();
	}
	//This method get a square and control move rules
	movePiece(element) {
		let chessboard = this;
		if (this.checkMate == undefined) {
			//Function, that select and unselect square
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
				let square = element;
				element = square.html;
				if (chessboard.isGame) {
					if (square.piece.side == chessboard.playerSide) {
						select(square);
					}
				}
				else {
					select(square);
				}
			}
			//Select a sqaure with your piece
			if (element.piece) {

				if (!this.selectPiece) {
					selectSquare(element);
				}
				else if (this.selectPiece && element.html.querySelector('.move-destination')) {
					let square = element;
					element = square.html;

					if (square.piece && this.selectPiece.piece.side == square.piece.side) {
						if (this.selectPiece.piece.name == 'king' && this.selectPiece.piece.isCastling == true && square.piece.name == 'rook' && square.piece.isCastling == true) {
							this.castling(element, this.selectPiece.piece);
						}
					}
					//If square has enemy figure and move-destination
					else if (square.piece && this.selectPiece.side != square.piece.side) {
						this.eatPiece(element);
						this.setPiece('change', element);
					}
					else {
						console.error('Ничего не работает');
					}
				}
				else if (element.position.x == this.selectPiece.position.x && element.position.y == this.selectPiece.position.y) {
					if (!this.isSelect) {
						this.selectPiece.html.append(this.selectPiece.piece.html);
						this.isSelect = true;
						document.onmousemove = null;
					}
					//If square is selected this select-square is cancel
					else {
						this.selectPiece.html.append(this.selectPiece.piece.html);
						this.clearSelectSquare();
					}
				}
				//If square has your figure selected square change
				else if (this.isSelect && this.selectPiece.side != element.piece.side) {
					this.selectPiece.html.append(this.selectPiece.piece.html);
					this.clearSelectSquare();
					selectSquare(element);
				}
				else {
					console.log('is cancelled')
					this.selectPiece.html.append(this.selectPiece.piece.html);
					this.clearSelectSquare();
				}
			}
			//If square without any piece
			else if (!element.piece && element.html.querySelector('.move-destination')) {
				let square = element;
				element = square.html;

				if (this.selectPiece.piece.name == 'pawn' && ((this.selectPiece.piece.side == 'white' && square.ID[1] == 8) || (this.selectPiece.piece.side == 'black' && square.ID[1] == 1))) {
					this.pawnPromotion(square, this.selectPiece.piece);
				}
				else if (this.selectPiece.piece.name == 'king' && this.selectPiece.piece.isCastling == true) {
					let cell = chessboard.getSquareFromArr(element);
					let pos = { xx: cell.position.x, yy: cell.position.y };
					let arr = this.selectPiece.piece.moveDestination('move', pos);
					if (arr) {
						this.castling(element, this.selectPiece.piece);
					}
					else {
						this.setPiece('change', element);
					}
				}
				else {
					this.setPiece('change', element);
				}
			}
			else {
				if (chessboard.selectPiece) {
					chessboard.selectPiece.html.append(chessboard.selectPiece.piece.html);
				}
				chessboard.clearSelectSquare();
				chessboard.clearMoveDestination();
			}
		}
		else {
			console.error('select или clear square не работают')
		}
	}

	pawnPromotion(thisSquare, piece) {
		console.log('pawnPromotion is draw!!!');
		//draw a div layout with figures for select
		let block = document.createElement('div');
		block.id = ('pawn-promotion-layout');
		let side = piece.side;
		let name = [['q'], ['n'], ['r'], ['b']];
		let innerElements = '';
		for (let i = 0; i < name.length; i++) {
			let pieceHTML = '<img src="images/piecesPNG/' + side[0] + name[i] + '.png" class = "piece"></img>';
			innerElements += `<div class="nav-component-pawn-promotion" value=${i + 1}>${pieceHTML}</div>`;
		}
		block.innerHTML = innerElements;
		let posInfo = thisSquare.html.getBoundingClientRect();

		let top = posInfo.top - posInfo.width / 1.6;
		let left = posInfo.left;
		let width = posInfo.width;
		let height = posInfo.height * 4;
		if (side != this.chessBoardSide) {
			top = top - height * 3 / 4;
		}
		block.style.top = top + 'px';
		block.style.left = left + 'px';
		block.style.width = width + 'px';
		block.style.height = height + 'px';
		this.html.appendChild(block);

		//set a piece on square(off dragging);
		document.onmousemove = null;
		piece.html.onmouseup = null;
		piece.html.style.position = 'relative';
		piece.html.style.width = 100 + '%';
		piece.html.style.height = 100 + '%';
		piece.html.style.left = 0 + 'px';
		piece.html.style.top = 0 + 'px';
		piece.square.html.append(piece.html);
		this.clearMoveDestination();

		//pawn-promotion-div logic of select a figure
		let chessboard = this;
		document.querySelectorAll('.nav-component-pawn-promotion').forEach(function (element) {
			element.onclick = function (mouse) {
				if (mouse.button == 0) {
					let value = element.getAttribute('value');
					let newPiece;
					let square = piece.square;
					chessboard.eatPiece(square);
					if (value == 1) {
						newPiece = new Queen(piece.side, piece.position, chessboard, piece.player, chessboard.cellsArr[piece.position.y][piece.position.x]);
					}
					else if (value == 2) {
						newPiece = new Knight(piece.side, piece.position, chessboard, piece.player, chessboard.cellsArr[piece.position.y][piece.position.x]);
					}
					else if (value == 3) {
						newPiece = new Rook(piece.side, piece.position, chessboard, piece.player, chessboard.cellsArr[piece.position.y][piece.position.x]);
					}
					else if (value == 4) {
						newPiece = new Bishop(piece.side, piece.position, chessboard, piece.player, chessboard.cellsArr[piece.position.y][piece.position.x]);
					}
					chessboard.clearPawnPromotionLayout();
					chessboard.selectPiece.piece = newPiece;
					chessboard.setPiece('change', thisSquare.html);
				}
				else if (mouse.button == 2) {
					chessboard.clearSelectSquare();
				}
			}
		});
	}

	setPiece(valueChangeSide, element, thisPiece) {
		if (valueChangeSide && (valueChangeSide == 'change' || valueChangeSide == 'nochange')) {
			if (!(element.querySelector('.piece'))) {
				if (valueChangeSide == 'change') {
					this.changePlayerSide();
					const soundMove = new Audio('sounds/move.mp3');
					soundMove.play();
				}
				let piece;
				if (!thisPiece) {
					piece = this.selectPiece.piece;
				}
				else if (thisPiece) {
					piece = thisPiece;
				}

				let square = this.getSquareFromArr(element);
				let side = piece.side;
				//Pawn rules)))
				//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
				this.cellsArr.forEach((arr) => {
					arr.forEach((square) => {
						if (square.piece && square != square.piece.square) {
							square.piece = undefined;
						}
					})
				});
				if (piece.name == 'pawn' && ((piece.side == 'white' && piece.square.ID[1] == 2) || (piece.side == 'black' && piece.square.ID[1] == 7))) {
					if ((piece.side == 'white' && square.ID[1] == 4) || (piece.side == 'black' && square.ID[1] == 5)) {
						if (piece.side == this.chessBoardSide) {
							this.cellsArr[square.position.y + 1][square.position.x].piece = piece;
						}
						else if (piece.side != this.chessBoardSide) {
							this.cellsArr[square.position.y - 1][square.position.x].piece = piece;
						}
					}
				}
				//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
				square.piece = piece;
				piece.position = square.position;
				piece.square.piece = undefined;
				piece.square = square;
				element.append(piece.html);
				if (piece.name == 'rook' || piece.name == 'king') {
					piece.isCastling = false;
				}

				for (let i = 0; i < 2; i++) {
					this.player[i].drawCheckMateArray();
				}
				let player;
				for (let i = 0; i < 2; i++) {
					if (this.player[i].side != side) {
						player = this.player[i];
					}
				}
				for (let i = 0; i < 8; i++) {
					for (let j = 0; j < 8; j++) {
						$(this.cellsArr[i][j].html).removeClass('check');
					}
				}
				this.isCheckMate(player);
			}
			else {
				console.log('Не допустимий ход!!!');
			}
			if (valueChangeSide == 'change') {
				this.clearSelectSquare();
			}
		}
	}
	//Function, delete enemy piece and set piece in "element"
	eatPiece(element) {
		if (element) {
			let square;
			if (element.classList && element.classList.contains('square')) {
				square = this.getSquareFromArr(element);
			}
			else {
				square = element;
			}
			square.piece.html.remove();
			for (let i = 0; i < 2; i++) {
				if (this.player[i].side == square.piece.side) {
					let arr = [];
					for (let j = 0; j < this.player[i].figures.length; j++) {
						if (this.player[i].figures[j] == square.piece) {
							this.player[i].figures[j] = undefined;
						}
						else {
							arr.push(this.player[i].figures[j]);
						}
					}
					this.player[i]._figures = arr;
				}
			}
			if (square.piece.square != square) {
				square.piece.square.piece = undefined;
			}
		}
	}
	castling(element, king) {
		if (element.querySelector('.move-destination')) {
			let square = this.getSquareFromArr(element);
			console.log('Castling РАБОТАЕТ!!!!!!!')
			if (king.side == 'white') {
				if (square.ID == 'g1' || square.ID == 'h1') {
					console.log('Ближняя сторона')
					let rook = this.getSquareFromArr('h1').piece;
					element = this.getSquareFromArr('g1').html;
					this.setPiece('nochange', element, king);
					element = this.getSquareFromArr('f1').html;
					this.setPiece('change', element, rook);
				}
				else if (square.ID == 'c1' || square.ID == 'a1') {
					console.log('Дальняя сторона')
					let rook = this.getSquareFromArr('a1').piece;
					element = this.getSquareFromArr('c1').html;
					this.setPiece('nochange', element, king);
					element = this.getSquareFromArr('d1').html;
					this.setPiece('change', element, rook);
				}
			}
			else if (king.side == 'black') {
				if (square.ID == 'g8' || square.ID == 'h8') {
					console.log('Ближняя сторона')
					let rook = this.getSquareFromArr('h8').piece;
					element = this.getSquareFromArr('g8').html;
					this.setPiece('nochange', element, king);
					element = this.getSquareFromArr('f8').html;
					this.setPiece('change', element, rook);
				}
				else if (square.ID == 'c8' || square.ID == 'a8') {
					console.log('Дальняя сторона')
					let rook = this.getSquareFromArr('a8').piece;
					element = this.getSquareFromArr('c8').html;
					this.setPiece('nochange', element, king);
					element = this.getSquareFromArr('d8').html;
					this.setPiece('change', element, rook);
				}
			}
			this.clearSelectSquare();
		}
		else {
			console.error('Error: EatPiece не работает!!!')
		}
	}
	//Piece dragging logic
	dragging(piece) {
		if (piece && piece.html) {
			let chessboardInfo = this.html.getBoundingClientRect();
			let posInfo = piece.html.getBoundingClientRect();
			let width = posInfo.width;
			let height = posInfo.height;
			piece.html.style.width = width + 'px';
			piece.html.style.height = height + 'px';
			piece.html.ondragstart = function () {
				return false;
			};

			document.body.appendChild(piece.html);
			piece.html.style.position = 'absolute';
			piece.html.style.zIndex = 1000; // показывать мяч над другими элементами
			document.onmousedown = function (e) {
				document.onmousedown = null;
				moveAt(e);
			}
			document.onmousemove = function (e) {
				moveAt(e);
			}
			// передвинуть мяч под координаты курсора
			// и сдвинуть на половину ширины/высоты для центрирования
			function moveAt(e) {
				if (chessboardInfo.left < e.pageX && chessboardInfo.right > e.pageX) {
					piece.html.style.left = e.pageX - piece.html.offsetWidth / 2 + 'px';
				}
				if (chessboardInfo.top < e.pageY && chessboardInfo.bottom > e.pageY) {
					piece.html.style.top = e.pageY - piece.html.offsetWidth / 2 + 'px';
				}
			}
		}
	}
	getSquareFromArr(element) {
		let cell;
		if (element.classList && element.classList.contains('square')) {
			for (let i = 0; i < 8; i++) {
				for (let j = 0; j < 8; j++) {
					if (this.cellsArr[i][j].html == element) {
						cell = this.cellsArr[i][j];
					}
				}
			}
		}
		else if (element.x >= 0 && element.y >= 0) {
			cell = this.cellsArr[element.y][element.x];
		}
		else if (typeof element == 'string' && element.length == 2) {
			for (let i = 0; i < 8; i++) {
				for (let j = 0; j < 8; j++) {
					if (this.cellsArr[i][j].ID == element) {
						cell = this.cellsArr[i][j];
					}
				}
			}
		}
		else {
			return 0;
		}
		return cell;
	}
	clearPawnPromotionLayout() {
		document.querySelectorAll('#pawn-promotion-layout').forEach((element) => {
			element.remove();
		});
	}
	clearSelectSquare() {
		if (this.selectPiece) {
			$(this.selectPiece.html).removeClass('choose-square');
			this.clearMoveDestination();
			if (document.getElementById('pawn-promotion-layout')) {
				this.clearPawnPromotionLayout();
			}
			this.selectPiece = undefined;
		}
		this.isSelect = false;
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

	isChessBoard(x, y) {
		let chessboardInfo = this.html.getBoundingClientRect();
		if (x >= chessboardInfo.left && x <= chessboardInfo.right && y >= chessboardInfo.top && y <= chessboardInfo.bottom) { return true }
		else { return false }
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