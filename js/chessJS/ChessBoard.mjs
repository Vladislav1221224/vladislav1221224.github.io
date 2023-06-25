import Cell from "./Cell.mjs";
import Player from "./Player.mjs";
import Move from "./Move.mjs";
import FEN from "./Fen.mjs";
import { Pawn, King, Knight, Bishop, Rook, Queen, Piece } from "./Piece.mjs";
import PortableGameNotation from "./pgn-parser/PGN.mjs";
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
	constructor(value, key) {
		if (value && key != undefined) {
			this._cellsArr = [[], [], [], [], [], [], [], []];
			this._key = key;
			this.currentPositionPieces = [[], [], [], [], [], [], [], []];
			this.isGame = true;
			this.player = [];
			this.playerSide = 'white';
			this.mode = "analyze";
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
			/*-->*/this.EnPassantForFEN = '-';/*<--*/

			this.FEN = new FEN(this);
			this.setButtons();
			this._moves.push({ name: undefined, fen: this.FEN })
			for (let i = 0; i < 8; i++) {
				for (let j = 0; j < 8; j++) {
					this._startPosition[i][j] = this.currentPositionPieces[i][j];
				}
			}
		}
		else {
			console.error('Error!!!');
		}
	}

	//Variables
	///////////////////////////////////////

	//Key
	get key() {
		return this._key;
	}
	//Start Position
	///////////////////////////////////////
	_startPosition = [[], [], [], [], [], [], [], []];
	get startPosition() {
		return this._startPosition;
	}
	///////////////////////////////////////

	//Keeps moves
	///////////////////////////////////////
	_moves = [];
	get moves() {
		return this._moves;
	}
	_moveNumber = 0;
	get moveNumber() {
		return this._moveNumber;
	}
	//HTML DOM of movesLayout
	///////////////////////////////////////
	get movesLayout() {
		return this._movesLayout;
	}
	///////////////////////////////////////

	//Keeps the figure, which was selected
	///////////////////////////////////////
	selectCell;
	///////////////////////////////////////

	//Array of players
	///////////////////////////////////////
	player;
	///////////////////////////////////////

	//HTML DOM of layout
	///////////////////////////////////////
	get layout() {
		return this._layout;
	}
	///////////////////////////////////////

	//HTML DOM of layout
	///////////////////////////////////////
	get boardLayout() {
		return this._boardLayout;
	}
	///////////////////////////////////////

	//List of modes for ChessBoard
	///////////////////////////////////////
	modeList = {
		//For analyze any games
		analyze: "analyze",
		//Analyze without change moves
		analyze_not_change: "analyze_n_c",
		//Not change moves and not setFEN
		game: "game",
	}
	///////////////////////////////////////

	//Mode of ChessBoard
	///////////////////////////////////////
	//mode;
	set mode(value) {
		let bool = false;
		for (const key in this.modeList) {
			if (value == key) {
				console.log(value + '= / =' + key);
				bool = true;
			}
		}
		if (bool) {
			this._mode = value;
		} else {
			return false;
		}
	}
	get mode() {
		return this._mode;
	}
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

	//ARRAY OF CHESSBOARD CELLS AND FIGURES
	///////////////////////////////////////
	get cellsArr() {
		return this._cellsArr;
	}
	///////////////////////////////////////

	//Flag of checkMate value(has a player who's win before a checkMate)
	///////////////////////////////////////
	get checkMate() {
		return this._checkMate;
	}
	///////////////////////////////////////
	///////////////////////////////////////

	//Methods
	///////////////////////////////////////

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
					for (let i = 0; i < this.player.length; i++) {
						if (this.player[i].side != player.side) {
							console.log("IS CHECKMATE!!! i = " + i)
							winner = i;
						}
					}
				}
				else if (isCheckMate == 1) {
					winner = 2;
				}
			}
			//set a Winner to variable checkMate
			if (winner != undefined) {
				if (winner == 0) {
					this._checkMate = 'white';
					return 'white';
				}
				else if (winner == 1) {
					this._checkMate = 'black';
					return 'black';
				}
				else if (winner == 2) {
					return 1;
				}
			}
			else {
				console.log('Is Falsadasdase!!!');
				return false;
			}
		}
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
		this.sliceMoves(1);
		this._moveNumber = 0;
		this.drawChessBoard('white');
	}

	//Draw a chess)) The main function!!!
	drawChessBoard(prop) {

		let side;

		for (let i = 0; i < 2; i++) {
			if (this.player[0]) {
				this.player[0].destroy();
			}
		}
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				if (this.cellsArr[i][j]) {
					this.cellsArr[i][j].html.remove();
					this.cellsArr[i][j] = undefined;
				}
			}
		}

		let info;
		if (typeof prop == "string" && (prop == "white" || prop == "black")) { side = prop; }
		else if (FEN.isFEN(prop)) {
			info = this.getInfoFen(prop);
			side = info.side;
		}
		else { console.error("prop error!!!"); return 0 }

		if (!this.html || !(this.html.classList.contains('chess-board'))) {
			this._layout = document.createElement('div');
			this.layout.classList = 'layout-chess-board';
			this.layout.id = this.key;
			this.layout.innerHTML = `<ul id="right-player-layout"></ul>
		<ul id="footer-player-layout">
		</ul>`;
			this._boardLayout = document.createElement('div');
			this._boardLayout.classList = "board-layout invisible";
			this._boardLayout.id = this._key;

			this.html = document.createElement('div');
			this.html.classList = "chess-board";
			this.html.id = this._key;
			this.html.append(this._boardLayout);
			this.layout.prepend(this.html);
			this._movesLayout = document.createElement('div');
			console.log(this.movesLayout);
			this.movesLayout.classList = "moves-layout";
			this.movesLayout.id = `${this.key}`;
			this.layout.querySelector('#footer-player-layout').append(this.movesLayout);
		}
		this.chessBoardSide = side;
		this.drawCells(side);
		if (FEN.isFEN(prop)) {
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
		this.setMouseEvents();
		this.setMouseEventsForChessBoard();
	}

	//SELECT A SQUARE MOUSE EVENTS
	//////////////////////////////////
	setMouseEvents() {
		let chessboard = this;
		//For all elements on window
		document.querySelectorAll('*').forEach((element) => {
			if (!element.classList.contains('square') && !element.classList.contains('piece') && !element.classList.contains('chess-board')) {
				element.onmousedown = function (mouse) {
					//If User click "leftMouseButton" outside the DOM element --> ChessBoard <-- selectCell is cancelled
					if (mouse.button == 0) {
						if (chessboard.selectCell && !chessboard.isChessBoard(mouse.clientX, mouse.clientY)) {
							console.log('IS CANCEL')
							let piece = chessboard.selectCell.piece;
							document.onmousemove = null;
							piece.html.onmouseup = null;
							piece.html.classList.remove('drag');
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
						else {
							console.log('else')
						}
					}
				}
			}
		})
		//If player select a Cell and release a leftMouseButton outside the DOM element --> ChessBoard <-- selectCell is cancelled
		document.addEventListener('mouseup', function (mouse) {

			if (mouse.button == 0) {
				console.log('isChessboard = ' + !chessboard.isChessBoard(mouse.clientX, mouse.clientY));
				if (chessboard.selectCell && !chessboard.isChessBoard(mouse.clientX, mouse.clientY)) {
					console.log('IS CANCEL')
					let piece = chessboard.selectCell.piece;
					document.onmousemove = null;
					piece.html.classList.remove('drag');
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
				else {
					console.log('else')
					console.log('is not cancell')
					console.log(!chessboard.isChessBoard(mouse.clientX, mouse.clientY));
				}
			}
			////If User click "rightMouseButton" selectCell is cancelled
			else if (mouse.button == 2) {
				console.log(chessboard.selectCell);
				if (chessboard.selectCell) {
					let piece = chessboard.selectCell.piece;
					if (chessboard.isDeveloper) {
					}
					document.onmousemove = null;
					piece.html.onmouseup = null;
					piece.html.classList.remove('drag');
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
				else {
					console.log('else')
				}
			}
		})
	}
	setMouseEventsForChessBoard() {
		let chessboard = this;
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
								piece.html.classList.add('drag');
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
							piece.html.classList.remove('drag');
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
	}
	//////////////////////////////////

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
			let chessboardInfo = this.html.getBoundingClientRect();//<--for limit a dragging piece on the chessboard
			let posInfo = piece.html.getBoundingClientRect();
			let width = posInfo.width;
			let height = posInfo.height;

			piece.html.style.width = width + 'px';
			piece.html.style.height = height + 'px';
			piece.html.ondragstart = function () {
				return false;
			};
			piece.html.style.left = '0px';
			piece.html.style.top = '0px';
			piece.html.style.position = 'absolute';
			document.body.appendChild(piece.html);
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
				if (chessboardInfo.left < e.clientX && chessboardInfo.right > e.clientX) {
					piece.html.style.left = e.pageX - piece.html.offsetWidth / 2 + 'px';
				}
				if (chessboardInfo.top < e.clientY && chessboardInfo.bottom > e.clientY) {
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
					if (this.mode != this.modeList.game || (this.mode == this.modeList.game && this.moveNumber == this.moves.length - 1)) {
						selectSquare(element);
					}
				}
				else if (this.selectCell && element.html.querySelector('.move-destination')) {
					let square = element;
					element = square.html;

					if (square.piece && this.selectCell.piece.name == 'king' && square.piece.name == 'rook' && this.selectCell.piece.side == square.piece.side && this.selectCell.piece.canCastling == true && square.piece.canCastling == true) {
						this.doCastling(element, this.selectCell.piece);
					}
					//If square has enemy figure and move-destination
					else if (square.piece && this.selectCell.side != square.piece.side) {
						console.log('is do 2')
						//Pawn promotion
						if (this.selectCell.piece.name == 'pawn' && ((this.selectCell.piece.side == 'white' && square.ID[1] == 8) || (this.selectCell.piece.side == 'black' && square.ID[1] == 1))) {
							this.pawnPromotion(square, this.selectCell.piece);
						}
						else {
							this.setPiece('change', element);
						}
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
					let cell = chessboard.getSquareFromArr(element);
					let pos = { xx: cell.position.x, yy: cell.position.y };
					let arr = this.selectCell.piece.moveDestination('move', pos);
					if (!arr) {
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
	setPiece(valueChangeSide, element, thisPiece, pawnPromotion) {
		if (element) {
			if (valueChangeSide && (valueChangeSide == 'change' || valueChangeSide == 'nochange')) {

				//For move-notation
				let notation = '';
				let capture = false;
				let pawnProm = false;
				let figure;
				let start;
				let end;
				if (pawnPromotion) {
					pawnProm = pawnPromotion;
				}
				let checkMate;
				let side;

				let square = this.getSquareFromArr(element);
				if (valueChangeSide == 'change') {
					this.clearSquareEffects();
					const soundMove = new Audio('sounds/move.mp3');
					soundMove.play();
					this.changePlayerSide();
					// this.selectCell.html.classList.add('last-move');
				}
				//EatPiece logic
				if (square.piece && ((JSON.stringify(square.position) === JSON.stringify(square.piece.position)) || (this.selectCell.piece.name == 'pawn' && (JSON.stringify(square.position) !== JSON.stringify(square.piece.position))))) {
					capture = true;
					notation += 'x';
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
					figure = piece;
					start = piece.square.position;
					end = square.position;
					if (piece.name == 'pawn') { if (notation == 'x') { notation = piece.square.ID[0].toLowerCase().concat(notation) } }
					else if (piece.name == 'knight') { notation = 'n'.concat(notation); }
					else { notation = piece.name[0].concat(notation) }
					side = piece.side;
					console.log(square);
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
					checkMate = this.isCheckMate(player);
					console.log("CHECKMATE = " + checkMate);
					if (!player.isHasMoves()) {
						console.log('Is StaleMate!!!');
						this._checkMate = 2;
					}

				}
				else {
				}
				//A FEN saving
				if (valueChangeSide == 'change') {
					this.clearSelectSquare();
					element.classList.add('last-move');
					this._moveNumber++;
					let move = undefined;
					console.log(this.moveNumber);
					//ADD RULE IF FIGURES CAN MOVE ON ANALYZE MODE
					if (((this.mode == this.modeList.analyze || this.mode == this.modeList.game) || this.moveNumber == this.moves.length) && this.movesLayout) {

						let idMove = document.createElement('b');
						idMove.className = 'move-notation';
						idMove.id = 'id';

						move = document.createElement('b');
						move.className = 'move-notation';

						notation += square.ID.toLowerCase();

						if (side == 'white') {
							idMove.innerHTML = `${(this.moveNumber + 1) / 2}.`;
						}
						else {
							idMove.innerHTML = '';
						}

						this.moves.forEach((element) => {
							console.log(element);
							if (element.html && element.html.classList.contains('active')) {
								element.html.classList.remove('active');
							}
						});

						if (this.mode == this.modeList.analyze && this.moves[this.moveNumber]) {
							console.log("SLICEMOVES");
							this.boardLayout.classList.add('invisible');
							this.sliceMoves(this.moveNumber);
						}
						if (side == 'white') {
							this.movesLayout.append(idMove);
						}

						this.movesLayout.append(move);
						move.classList.add('active');
						if (checkMate && (checkMate == 'white' || checkMate == 'black')) {
							let end = document.createElement('b');
							end.className = 'move-notation';
							end.id = 'id';
							if (checkMate == 'white') {
								end.innerHTML = '1-0';
							}
							else if (checkMate == 'black') {
								end.innerHTML = '0-1';
							}
							this.movesLayout.append(end);
						}
						let node = new Move(figure, side, this.moveNumber, this, start, end, new FEN(this).fen, capture, checkMate, pawnProm);

						move.innerHTML = `${node.notation}`;

						this.movesLayout.scrollLeft = this.movesLayout.scrollWidth;
						this.movesLayout.scrollTop = this.movesLayout.scrollHeight;

						let elem = { info: node, fen: new FEN(this), html: move };

						this._moves.push(elem);

						let chessboard = this;
						let num = this.moves.length - 1;
						elem.html.onclick = (function () {
							chessboard.clearSelectSquare();
							chessboard.moves.forEach((elem) => {
								if (elem.html) {
									elem.html.classList.remove('active');
								}
							}
							);
							chessboard.moves[num].fen.setFEN();
							chessboard._moveNumber = num;
							chessboard.boardLayout.classList.remove('invisible');
							if (chessboard.moves[num].html) {
								chessboard.moves[num].html.classList.add('active');
							}
							if (chessboard.moveNumber == chessboard.moves.length - 1) {
								chessboard.boardLayout.classList.add('invisible');
							}
						});
						console.log("MOVE IS ADDED!!!")
					}
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
		if (element.querySelector('.move-destination')) {
			let notation = (this.moveNumber + 1) + '. ';
			let square = this.getSquareFromArr(element);
			if (king.side == 'white') {
				if (square.ID == 'g1' || square.ID == 'h1') {
					let rook = this.getSquareFromArr('h1').piece;
					element = this.getSquareFromArr('g1').html;
					this.setPiece('nochange', element, king);
					element = this.getSquareFromArr('f1').html;
					this.setPiece('change', element, rook);
					notation += 'o-o';
					this._moves[this.moveNumber].name = notation;
				}
				else if (square.ID == 'c1' || square.ID == 'a1') {
					let rook = this.getSquareFromArr('a1').piece;
					element = this.getSquareFromArr('c1').html;
					this.setPiece('nochange', element, king);
					element = this.getSquareFromArr('d1').html;
					this.setPiece('change', element, rook);
					notation += 'o-o-o';
				}
			}
			else if (king.side == 'black') {
				if (square.ID == 'g8' || square.ID == 'h8') {
					let rook = this.getSquareFromArr('h8').piece;
					element = this.getSquareFromArr('g8').html;
					this.setPiece('nochange', element, king);
					element = this.getSquareFromArr('f8').html;
					this.setPiece('change', element, rook);
					notation += 'o-o';
				}
				else if (square.ID == 'c8' || square.ID == 'a8') {
					let rook = this.getSquareFromArr('a8').piece;
					element = this.getSquareFromArr('c8').html;
					this.setPiece('nochange', element, king);
					element = this.getSquareFromArr('d8').html;
					this.setPiece('change', element, rook);
					notation += 'o-o-o';
				}
			}
			this._moves[this.moveNumber - 1].name = notation;
			if (document.querySelector('.moves-player-layout')) {
				this._moves[this.moveNumber - 1].html.innerHTML = `${notation}`;
			}
			this.clearSelectSquare();
		}
		else {
			console.error('Error: CastlingPiece не работает!!!')
		}
	}

	//Pawn promotion method
	pawnPromotion(square, piece) {
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
		let posInfo = square.html.getBoundingClientRect();
		let top = posInfo.top - 44;
		let left = posInfo.left;
		if (side != this.chessBoardSide) {
			top = top + height;
		}
		block.style.top = top + 'px';
		block.style.left = left + 'px';
		block.style.width = posInfo.width + 'px';
		block.style.height = posInfo.height * 4 + 'px';
		this.html.append(block);
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
					chessboard.eatPiece(piece.square);
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
					if (square.piece) {
						chessboard.eatPiece(square);
					}
					piece.player._figures.push(newPiece);
					chessboard.clearPawnPromotionLayout();
					chessboard.setPiece('change', square.html, newPiece, true);
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
						console.log(cell);
					}
				}
			}
		}
		else {
			return 0;
		}
		console.log(cell);
		return cell;
	}

	//return true if x and y is coordinates of DOM-element of this.html
	isChessBoard(x, y) {
		let chessboardInfo = this.html.getBoundingClientRect();
		if (x >= chessboardInfo.left && x <= chessboardInfo.right && y >= chessboardInfo.top && y <= chessboardInfo.bottom) {
			console.log('is true'); return true
		}
		else { console.log('is true'); return false }
	}


	//Cleaners
	//////////////////////////////////////////

	//Remove the DOM-element for pawnPromotion
	clearPawnPromotionLayout() {
		document.querySelectorAll('#pawn-promotion-layout').forEach((element) => {
			element.remove();
		});
	}

	//Remove all classes, except "square" and "(white) or (black)-square"
	clearSquareEffects() {
		this.clearCheck();
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				if (this.cellsArr[i][j].html.classList.contains('last-move')) {
					$(this.cellsArr[i][j].html).removeClass('last-move');
				}
			}
		}
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

	//Return info if >>move<< is move-notation
	// isMove(move) {
	// 	let info = { figure: null, capture: false, cell: { x: null, y: null }, destination: { x: null, y: null }, other: '' };
	// 	let notation = move;
	// 	let flag = false;
	// 	for (let i = notation.length - 1; i > 0; i--) {
	// 		console.log(notation[i]);
	// 		if (flag) {
	// 			break;
	// 		}
	// 		else if (notation[i] == '+' || notation[i] == '#' || !parseInt(notation[i])) {
	// 			console.log('is slice[' + i + ']: ' + notation[i]);
	// 			notation.slice(0, -1);
	// 			flag = true;
	// 		}
	// 		else if (this.isID(notation[i - 1] + notation[i])) {
	// 			flag = true;
	// 		}
	// 		else {
	// 			return false;
	// 		}
	// 	}
	// 	console.log(notation);
	// 	//figure
	// 	{
	// 		let figures = {
	// 			'B': 'bishop',
	// 			'N': 'knight',
	// 			'K': 'king',
	// 			'Q': 'queen',
	// 			'R': 'rook'
	// 		}
	// 		for (const key in figures) {
	// 			console.log(move[0] + ' / ' + key);
	// 			if (figures.hasOwnProperty(key) && key == move[0].toUpperCase()) {
	// 				info.figure = figures[key];
	// 				console.log(info.figure);
	// 			}
	// 			else if (move[move.length - 1] + move[move.length]) {

	// 			}
	// 		}
	// 		for (let i = 0; i < move.length; i++) {
	// 			if (move[i] == 'x' && i <= move.length - 2) {
	// 				info.capture = true;
	// 			}
	// 		}
	// 		if (move[2] == 'x') {
	// 			info.capture = true;
	// 			info.cell.x = this.isHorizontalAxe(move[1]);
	// 			if (!info.cell.x) {
	// 				info.cell.y = this.isVerticalAxe(move[1]);
	// 			}
	// 		}
	// 		console.log(info);
	// 	}
	// 	return info;
	// }

	//Return true if variable fen is ID of cell
	isHorizontalAxe(id) {
		let bool = false;
		for (const key in Cell.IDLETTER) {
			if (Cell.IDLETTER.hasOwnProperty(key) && Cell.IDLETTER[key] == id.toLowerCase()) {
				bool = parseInt(key);
			}
		}
		return bool;
	}
	isVerticalAxe(id) {
		let bool = false;
		for (const key in Cell.IDNUMBER) {
			if (Cell.IDNUMBER.hasOwnProperty(key) && Cell.IDNUMBER[key] == id.toLowerCase()) {
				bool = parseInt(key);
			}
		}
		return bool;
	}
	isID(fen) {
		if (fen && fen != '' && fen != '-' && typeof fen == "string" && fen.length == 2) {
			let pos = { x: undefined, y: undefined };
			pos.x = this.isHorizontalAxe(fen[0]);
			pos.y = this.isVerticalAxe(fen[1]);
			console.error(pos);
			if (pos.x === false || pos.y === false) {
				return false;
			} else {
				return pos;
			}
		}
		else {
			return false;
		}
	}

	sliceMoves(i) {
		let size = this.movesLayout.childNodes.length;
		for (let j = 0; j < size; j++) {
			if (this.moves[i - 1].html && this.moves[i - 1].html.innerHTML == this.movesLayout.childNodes[this.movesLayout.childNodes.length - 1].innerHTML) {
				break;
			}
			else {
				this.movesLayout.childNodes[this.movesLayout.childNodes.length - 1].remove();
			}
		}
		let arr = this.moves.slice(0, i);
		this._moves = arr;
	}
	////////////////////////////////////////////

	//Draw a game with moves
	setGame(moves, startfen) {
		if (Array.isArray(moves)) {
			this._playerSide = 'white';
			if (startfen) {
				new PGN(this).setFEN(startfen);
			}

			this.sliceMoves(1);

			for (let k = 0; k < moves.length; k++) {
				let figure = this.cellsArr[moves[k].start.y][moves[k].start.x].piece;
				this.setPiece('change',this.cellsArr[moves[k].end.y][moves[k].end.x].html,figure);
			}
		}
	};


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
		let rightNav = this.layout.querySelector('#right-player-layout');
		let flip = document.createElement('li');
		flip.id = "flip-chess-board";
		flip.innerHTML = `<img width="18px" src="images/flip.png" alt="no image">`;
		rightNav.append(flip);
		let reset = document.createElement('li');
		reset.id = "reset-chess-board";
		reset.innerHTML = "reset";
		rightNav.append(reset);
		let share = document.createElement('li');
		share.id = "get-fen";
		share.innerHTML = `<img width="18px" src="images/share.png" alt="no image">`;
		rightNav.append(share);

		let footerNav = this.layout.querySelector('#footer-player-layout');
		let arrowsLayout = document.createElement('li');
		arrowsLayout.id = 'n-p-layout';
		footerNav.prepend(arrowsLayout);
		let next = document.createElement('div');
		next.id = 'set-next-fen';
		next.innerHTML = '>';
		arrowsLayout.prepend(next);
		let previus = document.createElement('div');
		previus.id = 'set-previous-fen';
		previus.innerHTML = '<';
		arrowsLayout.prepend(previus);
		flip.onclick = function () {
			chessboard.flipTheChessBoard();
		}
		reset.onclick = function () {
			chessboard.resetTheChessBoard();
		}
		//
		share.onclick = function (mouse) {
			if (mouse.button == 0) {
				console.log('is open')
				let layout = document.createElement('div');
				layout.id = 'window-background';
				layout.innerHTML = `<div class="share-menu-wrapper"><button id="close-window"><div class="close"></div></button>
				<div id="share-menu">
				<b id="share-menu-fen-heading">FEN</b>
				<input class="input" id="fen-input" readonly="readonly" type="text" value="gwesk">
				<b id="share-menu-pgn-heading">PGN</b>
				<textarea class="input" id="pgn-input" readonly="readonly" type="text">asdfkk</textarea>
				</div>
				</div>`;
				document.querySelector('.base-layout').append(layout);
				let fenInput = document.querySelector('#fen-input');
				let pgnInput = document.querySelector('#pgn-input');
				fenInput.value = chessboard.moves[chessboard.moveNumber].fen.fen;
				pgnInput.innerHTML = new PortableGameNotation(chessboard, { name: '?', value: '?' }, { name: '?', value: '?' }, '?', '?', '?', '?', '?').PGN;
				document.querySelector('#close-window').onclick = function (mouse) {
					if (mouse.button == 0) {
						document.querySelector('#window-background').remove();
					}
				};
				fenInput.onclick = function () {
					if (mouse.button == 0) {
					}
				};
			}
		}
		// share.onclick = function () {
		// 	var text = chessboard.moves[chessboard.moveNumber].fen;
		// 	let top = share.getBoundingClientRect().top + 25;
		// 	let left = share.getBoundingClientRect().left;
		// 	navigator.clipboard.writeText(text)
		// 		.then(() => {
		// 			if (!document.querySelector('.ms-copy')) {
		// 				let message = document.createElement('div');
		// 				message.className = 'ms-copy invisible';
		// 				message.innerHTML = "Copied!";
		// 				message.style.top = top + 'px';
		// 				message.style.left = left + 'px';
		// 				document.querySelector('.base-layout').append(message);
		// 				setTimeout(
		// 					() => {
		// 						message.classList.remove('invisible');
		// 					},
		// 					100
		// 				);
		// 				setTimeout(
		// 					() => {
		// 						message.classList.add('invisible');
		// 					},
		// 					2 * 1000
		// 				);
		// 				setTimeout(
		// 					() => {
		// 						message.remove();
		// 					},
		// 					3 * 1000
		// 				);
		// 			}
		// 			console.log('Text copied to clipboard');
		// 		})
		// 		.catch(err => {
		// 			console.error('Error in copying text: ', err);
		// 		});
		// }
		//
		previus.onclick = function () {
			console.log("MoveNUM = " + chessboard.moveNumber);
			if (chessboard.moveNumber > 0) {
				chessboard.clearSelectSquare();
				chessboard.moves[chessboard.moveNumber].html.classList.remove('active');
				chessboard.moves[chessboard.moveNumber - 1].fen.setFEN();
				chessboard._moveNumber--;
				chessboard.boardLayout.classList.remove('invisible');
				if (chessboard.moves[chessboard.moveNumber].html) {
					chessboard.moves[chessboard.moveNumber].html.classList.add('active');
				}
			}

		}

		next.onclick = function () {
			console.log("MoveNUM = " + chessboard.moveNumber);
			if (chessboard.moveNumber + 1 < chessboard.moves.length) {
				chessboard.clearSelectSquare();
				if (chessboard.moves[chessboard.moveNumber].html) {
					chessboard.moves[chessboard.moveNumber].html.classList.remove('active');
				}
				chessboard.moves[chessboard.moveNumber + 1].fen.setFEN();
				chessboard._moveNumber++;
				chessboard.moves[chessboard.moveNumber].html.classList.add('active');
				if (chessboard.moveNumber == chessboard.moves.length - 1) {
					chessboard.boardLayout.classList.add('invisible');
				}
				console.log(chessboard.html);
			}
		}
	}

	//Destroy this
	destroy() {
		for (let j = 0; j < this.player.length; j++) {
			this.player[0].destroy();
		}
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				this.cellsArr[i][j] = null;
			}
		}
		this.layout.remove();
		delete this;
	}
	///////////////////////////////////////
}