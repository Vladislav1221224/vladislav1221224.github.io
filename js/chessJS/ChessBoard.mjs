import Cell from "./Cell.mjs";
import Player from "./Player.mjs";
import { Pawn, King, Knight, Bishop, Rook, Queen, Piece } from "./Piece.mjs";
		//Constant that holds the names of the sides
/*--->*/const SIDENAME = ['white', 'black'];/*<---*/
//Start position for chess
let DefaultStartPosition = [
	['br', 'bn', 'bb', 'bq', 'bk', 'bb', 'bn', 'br'],
	['bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp'],
	['', '', '', '', '', '', '', ''],
	['', '', '', '', '', '', '', ''],
	['', '', '', '', '', '', '', ''],
	['', '', '', '', '', '', '', ''],
	['wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp'],
	['wr', 'wn', 'wb', 'wq', 'wk', 'wb', 'wn', 'wr']
];


//Test position
////////////////////////////////////////////////////////
let DefaultStartPositionFEN = "rkbqkbkr/pppppppp/8/8/8/8/PPPPPPPP/RKBQKBKR w KQkq -";
////////////////////////////////////////////////////////



export default class ChessBoard {
	constructor(value) {
		this._cellsArr = [[], [], [], [], [], [], [], []];

		this.currentPositionPieces = [[], [], [], [], [], [], [], []];
		this.isGame = true;
		this.player = [];
		this.playerSide = 'white';
		this.drawChessBoard(value);
		for (let i = 0; i < this.player.length; i++) {
			this.player[i].drawCheckMateArray();
		}
		document.oncontextmenu = function () {
			return false;
		};

		this.isSelect = false;

		//In developing
		/*-->*/this.isDeveloper = false;/*<--*/

		//FEN
		/*-->*/this.FEN;/*<--*/

		//For FEN
		/*-->*/this.castlingForFEN = '-';/*<--*/
		/*-->*/this.EnPassantForFEN = '-';/*<--*/

		/*-->*/this.moveArr = [];/*<--*/
		/*-->*/this.lastPosFEN;/*<--*/
		this.setCastlingForFEN();
		this.FEN = this.getFEN();
		this.setButtons();
	}

	//Variables
	///////////////////////////////////////
	//Keeps the figure, which was selected
	///////////////////////////////////////
	selectCell;
	///////////////////////////////////////

	//Array of players
	///////////////////////////////////////
	player;
	///////////////////////////////////////

	//HTML DOM of chessboard
	///////////////////////////////////////
	html;
	///////////////////////////////////////

	//Flag for developers
	///////////////////////////////////////
	isDeveloper;
	///////////////////////////////////////

	//That's flag set the side of the board for the player
	///////////////////////////////////////
	chessBoardSide;
	///////////////////////////////////////

	//That's flag for changing a player which must do a move
	///////////////////////////////////////
	playerSide;
	///////////////////////////////////////

	//That's flag for changing a player move side
	///////////////////////////////////////
	isGame;
	///////////////////////////////////////

	//If user select square, but don`t do dragging.This flag is true
	///////////////////////////////////////
	isSelect;
	///////////////////////////////////////
	///////////////////////////////////////

	//Methods
	///////////////////////////////////////
	//ARRAY OF CHESSBOARD CELLS AND FIGURES
	get cellsArr() {
		return this._cellsArr;
	}

	//Flag of checkMate value(has a player who's win before a checkMate)
	get checkMate() {
		return this._checkMate;
	}

	//Calls a methods "isCheckMate" of player and removes a class "check" of all squares
	isCheckMate(player) {

		this.clearCheck();

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
			//set a Winner to variable checkMate
			if (winner) {
				this._checkMate = winner;
				return true;
			}
			else {
				return false;
			}
		}
	}

	//Return true if player don't have moves
	isStalemate(player) {

	}
	//Change a flag "playerSide"
	changePlayerSide() {
		if (this.playerSide == SIDENAME[0]) {
			this.playerSide = SIDENAME[1];
		}
		else if (this.playerSide == SIDENAME[1]) {
			this.playerSide = SIDENAME[0];
		}
		else {
			console.error('Error: PlayerSide has not changed')
		}
	}

	//Change a flag "chessBoardSide"
	changeChessBoardSide() {
		if (this.chessBoardSide == SIDENAME[0]) {
			this.chessBoardSide = SIDENAME[1];
		}
		else if (this.chessBoardSide == SIDENAME[1]) {
			this.chessBoardSide = SIDENAME[0];
		}
		else {
			console.error('Error: SIDENAME is not defined!')
		}
	}

	//Turns the chessboard
	flipTheChessBoard() {
		this.clearSelectSquare();
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				if (this.chessBoardSide == 'black') {
					this.html.append(this.cellsArr[i][j].html);
				}
				else if (this.chessBoardSide == 'white') {
					this.html.append(this.cellsArr[7 - i][7 - j].html);
				}
			}
		}

		this.changeChessBoardSide();
		let chessboard = this;
		this.cellsArr.forEach((row) => {
			row.forEach((square) => {
				if ((chessboard.chessBoardSide == 'white' && square.position.y == 0) || (chessboard.chessBoardSide == 'black' && square.position.y == 7)) {
					let elem;
					if (square.html.querySelector('.notation')) {
						elem = square.html.querySelector('#letter');
						if (elem) {
							if (chessboard.chessBoardSide == 'white') {
								this.cellsArr[7][square.position.x].html.append(elem);
							}
							else if (chessboard.chessBoardSide == 'black') {
								this.cellsArr[0][square.position.x].html.append(elem);
							}
						}
					}
				}
				if ((chessboard.chessBoardSide == 'white' && square.position.x == 7) || (chessboard.chessBoardSide == 'black' && square.position.x == 0)) {
					let elem;
					if (square.html.querySelector('.notation')) {
						elem = square.html.querySelector('#number');
						if (elem) {
							if (chessboard.chessBoardSide == 'white') {
								this.cellsArr[square.position.y][0].html.append(elem);
							}
							else if (chessboard.chessBoardSide == 'black') {
								this.cellsArr[square.position.y][7].html.append(elem);
							}
						}
					}
				}
			})
		})
	}

	//Draw new chessboard
	resetTheChessBoard() {
		if (this.selectCell) {
			this.clearSelectSquare();
		}
		this.drawChessBoard('white');
	}

	//Draw a chess)) The main function!!!
	drawChessBoard(prop) {

		let side;

		for (let i = 0; i < 2; i++) {
			console.log('i = ' + i)
			console.log(this.player[0]);
			if (this.player[0]) {
				this.player[0].destroy();
			}
		}

		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				if (this.cellsArr[i][j]) {
					this.cellsArr[i][j].destroy();
				}
			}
		}

		let info;
		if (typeof prop == "string" && (prop == "white" || prop == "black")) { side = prop; }
		else if (this.isFEN(prop)) {
			info = this.getInfoFen(prop);
			side = info.side;
		}
		else { console.error("prop error!!!"); return 0 }

		this.html = document.createElement('div');
		this.html.classList = "chess-board";

		this.chessBoardSide = side;
		this.drawCells(side);
		if (this.isFEN(prop)) {
			this.setFEN(prop);
		}
		else {
			for (let i = 0; i < 8; i++) {
				for (let j = 0; j < 8; j++) {
					this.currentPositionPieces[j][i] = DefaultStartPosition[i][j];
				}
			}
			this.isGame = true;
			this.playerSide = side;
			this.drawPlayers();
			for (let i = 0; i < 2; i++) {
				console.log(this.player[i]);
				this.player[i].drawCheckMateArray();
			}
			let player;
			for (let i = 0; i < 2; i++) {
				if (this.player[i].side == this.playerSide) {
					player = this.player[i];
				}
			}
			this.isCheckMate(player);

			this.clearSelectSquare();
			this.clearMoveDestination();
		}
	}
	//Draw a cells and initialize cells events and logic of dragging by help cells events
	drawCells(chessBoardSide) {

		//Set all events and functions for all squares

		let color = 'white';
		function changeColor() {
			if (color == 'black') {
				color = 'white';
			} else if (color == 'white') {
				color = 'black';
			}
		}
		if (chessBoardSide == 'white') {
			for (let i = 0; i < 8; i++) {
				for (let j = 0; j < 8; j++) {
					let pos = { x: j, y: i };
					let cell = new Cell(pos, color, this);
					this.html.append(cell.html);
					this.cellsArr[i][j] = cell;
					changeColor();
				}
				changeColor();
			}
		} else if (chessBoardSide == 'black') {
			for (let i = 7; i >= 0; i--) {
				for (let j = 7; j >= 0; j--) {
					let pos = { x: j, y: i };
					let cell = new Cell(pos, color, this);
					this.html.append(cell.html);
					this.cellsArr[i][j] = cell;
					changeColor();
				}
				changeColor();
			}
		}

		//SELECT A SQUARE EVENTS
		//////////////////////////////////
		let chessboard = this;

		//For all elements on window
		document.querySelectorAll('*').forEach((element) => {
			element.onmousedown = function (mouse) {
				//If User click "leftMouseButton" outside the DOM element --> ChessBoard <-- selectCell is cancelled
				if (mouse.button == 0) {
					if (!chessboard.isChessBoard(mouse.clientX, mouse.clientY) && chessboard.selectCell) {
						let piece = chessboard.selectCell.piece;
						document.onmousemove = null;
						piece.html.onmouseup = null;
						piece.html.style.position = 'relative';
						piece.html.style.width = 100 + '%';
						piece.html.style.height = 100 + '%';
						piece.html.style.left = 0 + 'px';
						piece.html.style.top = 0 + 'px';
						chessboard.selectCell.html.append(chessboard.selectCell.piece.html);
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
				////If User click "rightMouseButton" selectCell is cancelled
				if (mouse.button == 2) {
					if (chessboard.selectCell) {
						let piece = chessboard.selectCell.piece;
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
						chessboard.selectCell.html.append(chessboard.selectCell.piece.html);
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
			//If player select a Cell and release a leftMouseButton outside the DOM element --> ChessBoard <-- selectCell is cancelled
			element.onmouseup = function (mouse) {
				if (mouse.button == 0) {
					if (chessboard.selectCell && !chessboard.isChessBoard(mouse.clientX, mouse.clientY)) {
						let piece = chessboard.selectCell.piece;
						document.onmousemove = null;
						piece.html.style.position = 'relative';
						piece.html.style.width = 100 + '%';
						piece.html.style.height = 100 + '%';
						piece.html.style.left = 0 + 'px';
						piece.html.style.top = 0 + 'px';
						if (!element.classList.contains('square')) {
							chessboard.selectCell.html.append(chessboard.selectCell.piece.html);
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

		//Mouse logic for each Cell
		///////////////////////////////////////////////////////////////////////
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				let square = this.cellsArr[j][i].html;

				square.onmousedown = function (mouse) {
					if (mouse.button == 0) {
						//If User window has DOM element with id "pawn-promotion-layout" User must select a piece on this element or click on any element for cancel this move
						if (document.querySelector('#pawn-promotion-layout')) {
							if (chessboard.selectCell) {
								let piece = chessboard.selectCell.piece;
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
							else {
								console.error('chessboard.selectCell not founded!!!')
							}
						}
						else {
							if (!chessboard.selectCell || chessboard.selectCell.html != square) {
								chessboard.movePiece(chessboard.cellsArr[j][i]);
							}
							if (chessboard.selectCell) {
								$(chessboard.html).addClass('dragging');
								document.querySelectorAll('.square').forEach((element) => {
									element.style.cursor = 'grabbing';
								})
								let piece = chessboard.selectCell.piece;
								if (!chessboard.isSelect || chessboard.selectCell.html == square) { chessboard.dragging(piece) }
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
						if (chessboard.selectCell) {
							let piece = chessboard.selectCell.piece;
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
			}
		}
		///////////////////////////////////////////////////////////////////////
		//////////////////////////////////
	}
	//Draw a players and figures
	drawPlayers() {
		let white = new Player('white', this);
		let black = new Player('black', this);
		this.player.push(white);
		this.player.push(black);
	}

	//Piece dragging
	dragging(piece) {
		if (piece && piece.html) {
			let chessboardInfo = this.html.getBoundingClientRect();
			let posInfo = piece.html.getBoundingClientRect();

			let width = posInfo.width;	//<--for limit a dragging on the chessboard
			let height = posInfo.height;	//<--for limit a dragging on the chessboard

			piece.html.style.width = width + 'px';
			piece.html.style.height = height + 'px';
			piece.html.ondragstart = function () {
				return false;
			};

			document.body.appendChild(piece.html);

			piece.html.style.position = 'absolute';

			piece.html.style.zIndex = 1000;

			//set a piece in mouse position
			//////////////////////////////////////
			document.onmousedown = function (e) {
				document.onmousedown = null;
				moveAt(e);
			}
			document.onmousemove = function (e) {
				moveAt(e);
			}
			//////////////////////////////////////

			//Function which set a piece in position of 'e' element
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

	//Moves methods
	//////////////////////////////////////////////////

	//This method get a square and control move rules
	movePiece(element) {
		let chessboard = this;
		if (this.checkMate == undefined) {
			//Function, that select and unselect square
			function selectSquare(element) {
				function select(square) {
					if (chessboard.selectCell) {
						$(chessboard.selectCell.html).removeClass('choose-square');
						chessboard.clearMoveDestination();
					}
					chessboard.selectCell = square;
					$(element).addClass('choose-square');
					chessboard.selectCell.piece.moveDestination('move');
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
			//Select a square with your piece
			if (element.piece && (JSON.stringify(element.position) === JSON.stringify(element.piece.position))) {
				if (!this.selectCell) {
					selectSquare(element);
				}
				else if (this.selectCell && element.html.querySelector('.move-destination')) {
					let square = element;
					element = square.html;
					console.log(this.selectCell.piece.canCastling == true)
					if (square.piece && this.selectCell.piece.name == 'king' && square.piece.name == 'rook' && this.selectCell.piece.side == square.piece.side && this.selectCell.piece.canCastling == true && square.piece.canCastling == true) {
						console.log('CASTLING IS IN...')
						this.doCastling(element, this.selectCell.piece);
					}
					//If square has enemy figure and move-destination
					else if (square.piece && this.selectCell.side != square.piece.side) {
						this.setPiece('change', element);
					}
					else {
						console.error('Ничего не работает');
					}
				}
				else if (element.position.x == this.selectCell.position.x && element.position.y == this.selectCell.position.y) {
					if (!this.isSelect) {
						this.selectCell.html.append(this.selectCell.piece.html);
						this.isSelect = true;
						document.onmousemove = null;
					}
					//If square is selected this select-square is cancel
					else {
						this.selectCell.html.append(this.selectCell.piece.html);
						this.clearSelectSquare();
					}
				}
				//If square has your figure selected square change
				else if (this.isSelect && this.selectCell.side !== element.piece.side) {
					this.selectCell.html.append(this.selectCell.piece.html);
					this.clearSelectSquare();
					selectSquare(element);
				}
				else {
					this.selectCell.html.append(this.selectCell.piece.html);
					this.clearSelectSquare();
				}
			}
			//If square without any piece
			else if (!element.piece && element.html.querySelector('.move-destination') || (element.piece && (JSON.stringify(element.position) !== JSON.stringify(element.piece.position)))) {
				let square = element;
				element = square.html;

				//Pawn promotion
				if (this.selectCell.piece.name == 'pawn' && ((this.selectCell.piece.side == 'white' && square.ID[1] == 8) || (this.selectCell.piece.side == 'black' && square.ID[1] == 1))) {
					this.pawnPromotion(square, this.selectCell.piece);
				}
				//Castling
				else if (this.selectCell.piece.name == 'king' && this.selectCell.piece.canCastling == true) {
					console.log('CASTLING IS IN...')
					let cell = chessboard.getSquareFromArr(element);
					let pos = { xx: cell.position.x, yy: cell.position.y };
					let arr = this.selectCell.piece.moveDestination('move', pos);
					console.log(arr);
					if (!arr) {
						console.log('is do castling')
						this.doCastling(element, this.selectCell.piece);
					}
					else {
						this.setPiece('change', element);
					}
				}
				else {
					this.setPiece('change', element);
				}
			}
			else if (chessboard.selectCell) {
				chessboard.selectCell.html.append(chessboard.selectCell.piece.html);
				chessboard.clearSelectSquare();
				chessboard.clearMoveDestination();
			}
			else {
				console.error('select или clear square не работают')
			}
		}
		else {
			console.error('CheckMate!!!')
		}
	}

	//Set a piece and destroy a enemy piece by help a method "eatPiece"
	setPiece(valueChangeSide, element, thisPiece) {
		if (element) {
			if (valueChangeSide && (valueChangeSide == 'change' || valueChangeSide == 'nochange')) {
				let square = this.getSquareFromArr(element);
				if (valueChangeSide == 'change') {
					this.lastPosFEN = this.getFEN();
					const soundMove = new Audio('sounds/move.mp3');
					soundMove.play();
					this.changePlayerSide();
				}
				//EatPiece logic
				if (square.piece && ((JSON.stringify(square.position) === JSON.stringify(square.piece.position)) || (this.selectCell.piece.name == 'pawn' && (JSON.stringify(square.position) !== JSON.stringify(square.piece.position))))) {
					this.eatPiece(element);
				}
				else if (square.piece && this.selectCell.name !== 'pawn' && (JSON.stringify(square.position) !== JSON.stringify(square.piece.position))) {
					square.piece = undefined;
				}

				//Set a piece logic
				if (!square.piece) {
					let piece;
					if (!thisPiece) {
						piece = this.selectCell.piece;
					}
					else if (thisPiece) {
						piece = thisPiece;
					}

					let side = piece.side;

					if (valueChangeSide == 'change') {
						let squareA = piece.square;
						let squareB = square;
						this.moveArr.push(this.getFENMove(squareA, squareB));
					}
					square.piece = piece;
					piece.position = square.position;
					piece.square.piece = undefined;
					piece.square = square;
					element.append(piece.html);
					//Do EnPassant and clear enPassant)))
					//\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
					this.setEnPassant(piece);
					//\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/


					//Prohibits Castling for a piece
					if (piece.name == 'rook' || piece.name == 'king') {
						piece.isCastling = false;
					}
					//Draw for all figures of player a checkmate array
					for (let i = 0; i < 2; i++) {
						this.player[i].drawCheckMateArray();
					}

					let player;
					for (let i = 0; i < 2; i++) {
						if (this.player[i].side != side) {
							player = this.player[i];
						}
					}

					this.clearCheck();

					//Checks for mate
					this.isCheckMate(player);
				}
				else {
					console.log('Не допустимий ход!!!');
				}
				//A FEN saving
				if (valueChangeSide == 'change') {
					this.setCastlingForFEN();
					/*For developing -->*/this.getFEN()/*<--*/
					this.clearSelectSquare();
				}
			}
		}
		else {
			console.error('"Element" is not founded');
		}
	}

	//Function, destroy piece
	eatPiece(element) {
		if (element) {
			let square;
			if (element.classList && element.classList.contains('square')) {
				square = this.getSquareFromArr(element);
			}
			else {
				square = element;
			}
			console.log('its do');
			square.piece.destroy();
		}
	}

	//Function, set EnPassant and delete all enPassant squares
	setEnPassant(piece, square) {
		this.EnPassantForFEN = '-';
		this.cellsArr.forEach((arrY) => {
			arrY.forEach((square) => {
				if (square.piece && square != square.piece.square) {
					square.piece = undefined;
				}
			})
		});
		if (piece && piece.name == 'pawn' && (piece.isEnPassant || square) && ((piece.side == 'white' && piece.square.ID[1] == 4) || (piece.side == 'black' && piece.square.ID[1] == 5))) {
			if (piece.side == 'white') {
				let squareEnPassant = this.cellsArr[piece.square.position.y + 1][piece.square.position.x];
				if (square) { squareEnPassant = square };
				squareEnPassant.piece = piece;
				this.EnPassantForFEN = squareEnPassant.ID;
			}
			else if (piece.side == 'black') {
				let squareEnPassant = this.cellsArr[piece.square.position.y - 1][piece.square.position.x];
				if (square) { squareEnPassant = square };
				squareEnPassant.piece = piece;
				this.EnPassantForFEN = squareEnPassant.ID;
			}
			piece.isEnPassant = false;
		}
	}

	//Do a Castling
	doCastling(element, king) {
		console.log(element)
		let lastFEN = this.getFEN();
		if (element.querySelector('.move-destination')) {
			let square = this.getSquareFromArr(element);
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
			console.error('Error: CastlingPiece не работает!!!')
		}
		this.lastPosFEN = lastFEN;
	}

	//Pawn promotion method
	pawnPromotion(thisSquare, piece) {

		//draw a div layout with figures for select
		//////////////////////////////////////////
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
		//////////////////////////////////////////

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
						piece.player._figures.push(newPiece);
					}
					else if (value == 2) {
						newPiece = new Knight(piece.side, piece.position, chessboard, piece.player, chessboard.cellsArr[piece.position.y][piece.position.x]);
						piece.player._figures.push(newPiece);
					}
					else if (value == 3) {
						newPiece = new Rook(piece.side, piece.position, chessboard, piece.player, chessboard.cellsArr[piece.position.y][piece.position.x]);
						piece.player._figures.push(newPiece);
					}
					else if (value == 4) {
						newPiece = new Bishop(piece.side, piece.position, chessboard, piece.player, chessboard.cellsArr[piece.position.y][piece.position.x]);
						piece.player._figures.push(newPiece);
					}
					chessboard.clearPawnPromotionLayout();
					chessboard.selectCell.piece = newPiece;
					chessboard.setPiece('change', thisSquare.html);
				}
				else if (mouse.button == 2) {
					chessboard.clearSelectSquare();
				}
			}
		});
	}
	//////////////////////////////////////////////////


	//Return a cell from an array "cellsArr"
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
		else if ((element.x >= 0 && element.x < 8) && (element.y >= 0 && element.y < 8)) {
			cell = this.cellsArr[element.y][element.x];
		}
		else if (this.isID(element)) {
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

	//return true if x and y is coordinates of DOM-element of this.html
	isChessBoard(x, y) {
		let chessboardInfo = this.html.getBoundingClientRect();
		if (x >= chessboardInfo.left && x <= chessboardInfo.right && y >= chessboardInfo.top && y <= chessboardInfo.bottom) { return true }
		else { return false }
	}


	//Cleaners
	//////////////////////////////////////////

	//Remove the DOM-element for pawnPromotion
	clearPawnPromotionLayout() {
		document.querySelectorAll('#pawn-promotion-layout').forEach((element) => {
			element.remove();
		});
	}

	//Remove class "choose-square"	from DOM-element --> selectCell.html <-- and set undefined to variable --> "selectCell" <--
	clearSelectSquare() {
		if (this.selectCell) {
			$(this.selectCell.html).removeClass('choose-square');
			this.clearMoveDestination();
			if (document.getElementById('pawn-promotion-layout')) {
				this.clearPawnPromotionLayout();
			}
			this.selectCell = undefined;
		}
		this.isSelect = false;
	}

	//Remove all DOM-elements with class "move-destination"
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

	//Remove class check of each cell which has this class
	clearCheck() {
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				if (this.cellsArr[i][j].html.classList.contains('check')) {
					$(this.cellsArr[i][j].html).removeClass('check');
				}
			}
		}
	}
	//////////////////////////////////////////


	//FEN methods
	////////////////////////////////////////////

	//Return true if this string is FEN
	isFEN(fen) {
		function error(num){
			for (let k = 0; k < fen.length; k++) {
				let tmp = '';
				if(k + 1 == num){
					tmp += '>>' + fen[num] + '<<';
					k++;
				}
				tmp += fen[k];
			}
			return tmp;
		}
		if (fen != "white" && fen != "black") {
			let flag = true;
			let probels = 0;
			let count = 0;
			let side;
			let row = 1;
			for (let i = 0; i < fen.length; i++) {
				if (fen[i] == ' ') {
					probels++;
					continue;
				}
				else if (fen[i] == '-') {
					if (fen[i + 1] && fen[i + 1] != ' ') {
						flag = false;
						break;
					}
					else {
						continue;
					}
				}
				else if (probels == 0 && !parseInt(fen[i]) && !this.isPieceFen(fen[i]) && !fen[i] == '/') {
					flag = false;
					break;
				}
				//Checks whether the number of figures and empty cells per one row is correct
				else if (probels == 0) {
					if (this.isPieceFen(fen[i])) {
						if((row == 1 || row == 8) && fen[i].toLowerCase() == 'p'){
							flag = false;
							break;
						}
						count++;
					}
					else if (parseInt(fen[i])) {
						count += parseInt(fen[i]);
					}
					if (count > 8) {
						flag = false;
						break;
					}
					else if (fen[i] == '/') {
						row++;
						count = 0;
					}
				}
				//Checks of side after first probel is --> 'w' or 'b' <--
				else if (probels == 1 && !this.isSideFen(fen[i])) {
					flag = false;
					break;
				}
				//Checks of part with castling-info is correct
				else if (probels == 2) {
					let tmp = '';
					while (fen[i] == ' ') {
						if (fen[i] == 'K' || fen[i] == 'k' || fen[i] == 'Q' || fen[i] == 'q') {
							for (let j = 0; j < tmp.length; j++) {
								if (tmp[j] && fen[i] == tmp[j]) {
									flag = false;
									break;
								}
							}
							tmp += fen[i];
						}
						else {
							flag = false;
							break;
						}
						i++;
					}
					if (!flag) { break }
				}
				//Checks if enPassant info is ID
				else if (probels == 3 && !this.isID(fen[i] + fen[i + 1])) {
					flag = false;
					break;
				}
				//Checks the pawn standing after the enPassant square
				else if (flag && probels == 3) {
					let itFen = fen[i] + fen[i + 1];
					if (itFen) {
						let rows = 8;
						let column = 1;
						let position = { x: null, y: null };

						for (const key in Cell.IDLETTER) {
							console.log("pos = " + itFen[0])
							if (Cell.IDLETTER.hasOwnProperty(key) && Cell.IDLETTER[key] === itFen[0].toLowerCase()) {
								if (side == 'black' && parseInt(itFen[1]) == 6) {
									position.y = parseInt(itFen[1]) - 1;
								}
								else if (side == 'white' && parseInt(itFen[1]) == 3) {
									position.y = parseInt(itFen[1]) + 1;
								}
								if (position.y != 4 && position.y != 5) {
									console.error(error(j));
									flag = false;
									break;
								}
								position.x = parseInt(key);
							}
						}
						if (flag) {
							console.log(position);
							let fenROW = '';
							for (let j = 0; j < fen.length; j++) {
								console.log(rows + "/" + position.y)
								if (rows == position.y) {
									fenROW += fen[j];
									console.log(fenROW);
									console.log(j);
									console.log(fen[j]);
									console.log(column + " ... " + position.x)
									if (column == position.x) {
										if (this.isPieceFen(fen[j])) {
											if (position.y == 4 && fen[j] != fen[j].toLowerCase()) {
												console.log(true)
												break;
											}
											else if (position.y == 5 && fen[j] != fen[j].toUpperCase()) {
												console.log(true)
												break;
											}
										}
										else {
											console.log('is false');
											flag = false;
											break;
										}
									}
									else if (parseInt(fen[j])) {
										column += parseInt(fen[j]) - 2;
									}
									else if (fen[j] == '/') {
										flag = false;
										break;
									}
									column++;
								}
								else if (fen[j] == '/') {
									rows--;
								}
							}
						}
					}
					break;
				}
				if (probels == 1) {
					side = this.isSideFen(fen[i]);
				}
			}

			return flag;
		}
		else {
			return false;
		}
	}

	//Return true if variable fen is ID of cell
	isID(fen) {
		if (fen && typeof fen == "string") {
			let bool = false;
			for (const key in Cell.IDLETTER) {
				if (Cell.IDLETTER.hasOwnProperty(key) && Cell.IDLETTER[key] === fen[0].toLowerCase()) {
					bool = true;
				}
			}
			if (bool) {
				bool = false;
				for (const key in Cell.IDNUMBER) {
					if (Cell.IDNUMBER.hasOwnProperty(key) && Cell.IDNUMBER[key] === fen[1].toLowerCase()) {
						bool = true;
					}
				}
			}
			return bool;
		}
	}

	//Return --> SIDE element <-- if variable is side in fen
	isSideFen(fen) {
		const SIDE = {
			'w': 'white',
			'b': 'black'
		}
		for (const key in SIDE) {
			if (SIDE.hasOwnProperty(key) && key === fen.toLowerCase()) {
				return SIDE[key];
			}
		}
		return false;
	}

	//Return true if 
	isPieceFen(fen) {
		const PIECES = {
			'p': 'p',
			'n': 'n',
			'b': 'b',
			'r': 'r',
			'q': 'q',
			'k': 'k'
		};
		for (const key in PIECES) {
			if (PIECES.hasOwnProperty(key) && PIECES[key] === fen.toLowerCase()) {
				return fen;
			}
		}
		return false;
	}

	//Get info --> FEN <--
	getInfoFen(fen) {
		if (this.isFEN(fen)) {
			let info = {
				position: '',
				side: '',
				castling: '',
				enPassant: ''
			}

			while (fen[0] != ' ') {
				info.position += fen[0];
				fen = fen.substring(1);
			}
			if (fen[0] == ' ') {
				console.log(fen);
				fen = fen.substring(1);
			}
			while (fen[0] != ' ') {
				console.log(fen);
				info.side = this.isSideFen(fen[0]);
				fen = fen.substring(1);
			}
			if (fen[0] == ' ') {
				fen = fen.substring(1);
			}
			while (fen[0] != ' ') {
				info.castling += fen[0];
				fen = fen.substring(1);
			}
			if (fen[0] == ' ') {
				fen = fen.substring(1);
			}
			while (fen[0] && fen[0] != ' ') {
				info.enPassant += fen[0];
				fen = fen.substring(1);
			}
			console.log(info);
			return info;
		} else {
			console.error('Error: fen is not correct!')
			return 0;
		}
	}

	//Castling info for FEN
	setCastlingForFEN() {
		let forFEN = '';
		for (let i = 0; i < this.player.length; i++) {
			if (this.player[i].king.isCastling) {
				for (let j = this.player[i].figures.length - 1; j >= 0; j--) {
					let piece = this.player[i].figures[j];
					if (piece.name == 'rook') {
						if (piece.isCastling) {
							if (piece.square.ID[0] == 'h') {
								if (this.player[i].side == 'white') {
									forFEN += 'K';
								}
								else if (this.player[i].side == 'black') {
									forFEN += 'k';
								}
							}
							else if (piece.square.ID[0] == 'a') {
								if (this.player[i].side == 'white') {
									forFEN += 'Q';
								}
								else if (this.player[i].side == 'black') {
									forFEN += 'q';
								}
							}
						}
					}
				};
			}
		}
		if (forFEN == '') { forFEN = '-' };
		this.castlingForFEN = forFEN;
	}

	//Read a FEN and draw a chessboard position
	setFEN(FEN) {
		if (FEN) {
			this.clearCheck();
			let currentPos = [['', '', '', '', '', '', '', ''],
			['', '', '', '', '', '', '', ''],
			['', '', '', '', '', '', '', ''],
			['', '', '', '', '', '', '', ''],
			['', '', '', '', '', '', '', ''],
			['', '', '', '', '', '', '', ''],
			['', '', '', '', '', '', '', ''],
			['', '', '', '', '', '', '', '']];

			let infoFEN = this.getInfoFen(FEN);
			console.log(infoFEN);
			let k = 0;
			for (let i = 0; i < 8; i++) {
				for (let j = 0; j < 8; j++) {
					let fen = infoFEN.position[k];
					if (fen == '/') { break }
					//If fen is number => j += fen - 1
					else if (!isNaN(parseInt(fen))) {
						j += parseInt(fen) - 1;
						k++;
						if (j >= 8) {
							break;
						}
						continue;
					}

					else if (this.isPieceFen(fen)) {
						let side;
						if (fen === fen.toUpperCase()) { side = 'w' }
						else if (fen === fen.toLowerCase()) { side = 'b' }
						currentPos[j][i] = side + fen.toLowerCase();
						k++;
					}
				}
				k++;
			}
			this.currentPositionPieces = currentPos;
			let length = this.player.length;
			for (let j = 0; j < length; j++) {
				this.player[this.player.length - 1].destroy();
			}

			this.drawPlayers();
			this.isGame = true;
			this.playerSide = infoFEN.side;
			//Set EnPassant
			{
				k = 0;
				for (let i = 0; i < FEN.length; i++) {
					if (FEN[i - 1] === ' ') {
						k++;
					}
					if (k === 3) {
						let fen = FEN[i] + FEN[i + 1];
						if (this.isID(fen)) {
							let square = this.getSquareFromArr(fen);
							console.log(square)
							if (square.ID[1] == 3) {
								this.setEnPassant(this.cellsArr[square.position.y - 1][square.position.x].piece, square);
							}
							else if (square.ID[1] == 6) {
								this.setEnPassant(this.cellsArr[square.position.y + 1][square.position.x].piece, square);
							}
						}
					}
				}
			}
			for (let i = 0; i < 2; i++) {
				this.player[i].drawCheckMateArray();
			}
			let player;
			for (let i = 0; i < 2; i++) {
				if (this.player[i].side == this.playerSide) {
					player = this.player[i];
				}
				if (this.player[i].side != this.playerSide) {
					if (this.player[i].isCheckMate() > 0) {
						this._checkMate = this.player[i];
						console.error("Error:The " + this.player[i].side + " side cannot has checkmate");
					}
				}
			}
			this.isCheckMate(player);
		}

	}

	//Write a FEN
	getFEN() {
		let thisFEN = '';
		for (let i = 0; i < 8; i++) {
			let fen = '';
			let num = 0;
			for (let j = 0; j < 8; j++) {
				if (this.cellsArr[i][j] && this.cellsArr[i][j].piece != undefined && (JSON.stringify(this.cellsArr[i][j].position) === JSON.stringify(this.cellsArr[i][j].piece.position))) {
					if (num > 0) { fen += num; num = 0 }
					let fenPiece = this.cellsArr[i][j].piece.name[0]
					if (this.cellsArr[i][j].piece.name === 'knight') {
						fenPiece = this.cellsArr[i][j].piece.name[1];
					}
					if (this.cellsArr[i][j].piece.side == 'white') { fen += fenPiece.toUpperCase() }
					else if (this.cellsArr[i][j].piece.side == 'black') { fen += fenPiece.toLowerCase() }
				}
				else {
					num++;
					if (j == 7) {
						fen += num;
					}
				}
			}
			if (i != 7) { fen += '/' }
			thisFEN += fen;
		}
		thisFEN += ' ' + this.playerSide[0] + ' ' + this.castlingForFEN + ' ' + this.EnPassantForFEN + ' ' + ' ';
		console.error(thisFEN);
		return thisFEN;
	}

	//Write a moves notation in arrat
	getFENMove(squareA, squareB) {
		if (!squareB instanceof Cell) {
			console.error('squareB has not class CELL');
		}
		else if (!squareA instanceof Cell) {
			console.error('squareA has not class CELL');
		}
		else {
			let fenA = squareA.ID;
			let fenB = squareB.ID;
			return fenA + fenB;
		}
	}
	////////////////////////////////////////////



	//Animations
	setAnimation() {
		let chessboard = this;
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				$(chessboard.cellsArr[i][j].html).mouseover(function () {
					if (chessboard.cellsArr[i][j].html.querySelector('.move-destination') && chessboard.cellsArr[i][j].html.querySelector('.circle')) {
						let element = chessboard.cellsArr[i][j].html.querySelector('.circle');
						let width = chessboard.cellsArr[i][j].html.offsetWidth;
						element.style.outlineOffset = -(width) * 54 / 100 * 80 / 100 + 'px';
						element.style.outlineWidth = width * 50 / 100 * 80 / 100 + 'px';
					}
				});
				$(chessboard.cellsArr[i][j].html).mouseout(function () {
					if (chessboard.cellsArr[i][j].html.querySelector('.move-destination') && chessboard.cellsArr[i][j].html.querySelector('.circle')) {
						let element = chessboard.cellsArr[i][j].html.querySelector('.circle');
						element.style.outlineWidth = 5 + 'px';
						element.style.outlineOffset = -5 + 'px';
					}
				});
			}
		}
	}

	//Buttons
	setButtons() {
		let chessboard = this;
		document.querySelector('.flip-chess-board').onclick = function () {
			chessboard.flipTheChessBoard();
		}
		document.querySelector('.reset-chess-board').onclick = function () {
			chessboard.resetTheChessBoard();
		}
		document.querySelector('.get-fen').onclick = function () {
			chessboard.getFEN();
		}

		document.querySelector('#set-previous-fen').onclick = function () {
			chessboard.setFEN(chessboard.lastPosFEN);
		}
		document.querySelector('#set-previous-fen').onclick = function () {
			chessboard.setFEN(chessboard.lastPosFEN);
		}
	}

	//Destroy this
	destroy() {
		for (let j = 0; j < this.player.length; j++) {
			this.player[j].destroy();
		}
		delete this;
	}
	///////////////////////////////////////
}
