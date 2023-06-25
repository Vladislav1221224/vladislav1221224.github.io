import Cell from "./Cell.mjs";


export default class FEN {
	constructor(chessboard) {
		this._chessboard = chessboard;
		this._fen = this.getFEN();
		console.log(this.fen);
	}
	//Variables

	//FEN(Forsyth–Edwards Notation)
	get fen() {
		return this._fen;
	}
	get chessboard() {
		return this._chessboard;
	}




	//Methods

	//Return true if this string is FEN
	static isFEN(fen) {
		console.log(fen)
		function error(num) {
			let tmp = '';
			for (let k = 0; k < fen.length; k++) {
				if (k == num) {
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
				if (probels == 1 && row < 8) {
					flag = false;
					break;
				}
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
					console.log("THIS FALSE!!!")
					flag = false;
					break;
				}
				//Checks whether the number of figures and empty cells per one row is correct
				else if (probels == 0) {
					if (this.isPieceFen(fen[i])) {
						if ((row == 1 || row == 8) && fen[i].toLowerCase() == 'p') {
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
						let column = 0;
						let position = { x: null, y: null };

						if (this.isHorizontalAxe(itFen[0])) {
							if (side == 'white' && parseInt(itFen[1]) == 6) {
								console.log(itFen[1])
								position.y = (parseInt(itFen[1]) - 1) - 1;
								position.x = this.isHorizontalAxe(itFen[0]);
								console.log(true);
							}
							else if (side == 'black' && parseInt(itFen[1]) == 3) {
								position.y = (parseInt(itFen[1]) + 1) - 1;
								position.x = this.isHorizontalAxe(itFen[0]);
								console.log(true);
							}
							console.log("position.y = " + position.y);
							if (position.y != 3 && position.y != 4) {
								console.log("ID = " + itFen);
								console.log(position)
								console.log("x = " + this.isHorizontalAxe(itFen[0]));
								console.error(error(8 * parseInt(itFen[1]) + parseInt(this.isHorizontalAxe(itFen[0])) + 1));
								flag = false;
							}
						}
						if (flag) {
							let fenROW = '';
							for (let j = 0; j < fen.length; j++) {
								if (rows == position.y + 1) {
									fenROW += fen[j];
									console.log(column + ' / ' + position.x)
									if (column == position.x) {
										console.log(fen[j]);
										if (this.isPieceFen(fen[j])) {
											if (position.y == 3 && fen[j] != fen[j].toLowerCase()) {
												break;
											}
											else if (position.y == 4 && fen[j] != fen[j].toUpperCase()) {
												break;
											}
										}
										else {
											console.error('is do y = ' + position.y + '/ figure[' + j + ']: ' + fen[j] + ' / ' + fenROW);
											flag = false;
											break;
										}
									}
									else if (this.isPieceFen(fen[j])) {
										column++;
									}
									else if (parseInt(fen[j])) {
										column += parseInt(fen[j]);
									}
									else if (fen[j] == '/') {
										console.error('fen[' + j + '] = false: ' + fen[j]);
										flag = false;
										break;
									}
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
			if (probels < 3) {
				flag = false;
			}
			console.log('FLAG = ' + flag);
			return flag;
		}
		else {
			console.log("is flaGS");
			return false;
		}
	}
	//Return true if variable fen is ID of cell
	static isHorizontalAxe(id) {
		let bool = false;
		for (const key in Cell.IDLETTER) {
			if (Cell.IDLETTER.hasOwnProperty(key) && Cell.IDLETTER[key] == id.toLowerCase()) {
				bool = parseInt(key);
			}
		}
		return bool;
	}
	static isVerticalAxe(id) {
		let bool = false;
		for (const key in Cell.IDNUMBER) {
			if (Cell.IDNUMBER.hasOwnProperty(key) && Cell.IDNUMBER[key] == id.toLowerCase()) {
				bool = parseInt(key);
			}
		}
		return bool;
	}
	static isID(fen) {
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

	//Return --> SIDE element <-- if variable is side in fen
	static isSideFen(fen) {
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
	static isPieceFen(fen) {
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
	static getInfoFen(fen) {
		let info = {
			position: '',
			side: '',
			castling: '',
			enPassant: ''
		}
		if (FEN.isFEN(fen)) {
			while (fen[0] != ' ') {
				info.position += fen[0];
				fen = fen.substring(1);
			}
			if (fen[0] == ' ') {
				fen = fen.substring(1);
			}
			while (fen[0] != ' ') {
				info.side = FEN.isSideFen(fen[0]);
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
		}
		return info;
	}

	//Castling info for FEN
	setCastlingForFEN() {
		let forFEN = '';
		for (let i = 0; i < this.chessboard.player.length; i++) {
			if (this.chessboard.player[i].king.isCastling) {
				for (let j = this.chessboard.player[i].figures.length - 1; j >= 0; j--) {
					let piece = this.chessboard.player[i].figures[j];
					if (piece.name == 'rook') {
						if (piece.isCastling) {
							if (piece.square.ID[0] == 'h') {
								if (this.chessboard.player[i].side == 'white') {
									forFEN += 'K';
								}
								else if (this.chessboard.player[i].side == 'black') {
									forFEN += 'k';
								}
							}
							else if (piece.square.ID[0] == 'a') {
								if (this.chessboard.player[i].side == 'white') {
									forFEN += 'Q';
								}
								else if (this.chessboard.player[i].side == 'black') {
									forFEN += 'q';
								}
							}
						}
					}
				};
			}
		}
		if (forFEN == '') { forFEN = '-' };
		return forFEN;
	}

	//Read a FEN and draw a chessboard position
	static fenToChessboardArr(myFEN) {
		let currentPos = [['', '', '', '', '', '', '', ''],
		['', '', '', '', '', '', '', ''],
		['', '', '', '', '', '', '', ''],
		['', '', '', '', '', '', '', ''],
		['', '', '', '', '', '', '', ''],
		['', '', '', '', '', '', '', ''],
		['', '', '', '', '', '', '', ''],
		['', '', '', '', '', '', '', '']];

		let infoFEN = this.getInfoFen(myFEN);
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

				else if (FEN.isPieceFen(fen)) {
					let side;
					if (fen === fen.toUpperCase()) { side = 'w' }
					else if (fen === fen.toLowerCase()) { side = 'b' }
					currentPos[j][i] = side + fen.toLowerCase();
					k++;
				}
			}
			k++;
		}
		return currentPos;
	}
	//Convert chessboardArr to FEN
	// ||||||||||||||||||||||||||||||||
	// \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
	// ['r', 'b', 'n', 'q', 'k', 'n', 'b', 'r'],
	// ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
	// ['', '', '', '', '', '', '', ''],
	// ['', '', '', '', '', '', '', ''],
	// ['', '', '', '', '', '', '', ''],
	// ['', '', '', '', '', '', '', ''],
	// ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
	// ['R', 'B', 'N', 'Q', 'K', 'N', 'B', 'R']

	static chessBoardArrayToFEN(chessboardArray, side, enPassant, castling) {
		let thisFEN = '';
		for (let i = 0; i < 8; i++) {
			let fen = '';
			let num = 0;
			for (let j = 0; j < 8; j++) {
				if (chessboardArray[i][j] && chessboardArray[i][j] != '') {
					if (num > 0) { fen += num; num = 0 }
					let fenPiece = chessboardArray[i][j];
					if (chessboardArray[i][j].toUpperCase() === chessboardArray[i][j]) { fen += fenPiece.toUpperCase() }
					else if (chessboardArray[i][j].toLowerCase() === chessboardArray[i][j]) { fen += fenPiece.toLowerCase() }
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
		thisFEN += ' ' + side[0].toLowerCase() + ' ' + castling + ' ' + enPassant + ' ' + ' ';
		return thisFEN;
	}




	setFEN(myFEN) {
		if (!myFEN) {
			myFEN = this.fen;
		}
		this.chessboard.currentPositionPieces = FEN.fenToChessboardArr(myFEN);
		let infoFEN = FEN.getInfoFen(myFEN);
		let length = this.chessboard.player.length;
		for (let j = 0; j < length; j++) {
			this.chessboard.player[this.chessboard.player.length - 1].destroy();
		}
		this.chessboard.drawPlayers();
		this.chessboard.isGame = true;
		this.chessboard.playerSide = infoFEN.side;

		//Set castling
		if (infoFEN.castling != '-') {
			let castlfen = infoFEN.castling;
			for (let i = 0; i < castlfen.length; i++) {
				for (let j = 0; j < this.chessboard.player.length; j++) {
					if (castlfen[i] == castlfen[i].toUpperCase()) {
						if (this.chessboard.player[j].side == 'white') {
							if (castlfen[i] === 'Q') {
								let square = this.chessboard.getSquareFromArr('h1');
								if (square.piece && square.piece.name == 'rook') {
									square.piece.isCastling = true;
								}
							}
							else if (castlfen[i] === 'K') {
								let square = this.chessboard.getSquareFromArr('a1');
								if (square.piece && square.piece.name == 'rook') {
									square.piece.isCastling = true;
								}
							}
						}
					}
					else if (castlfen[i] == castlfen[i].toLowerCase()) {
						if (this.chessboard.player[j].side == 'black') {
							if (castlfen[i] === 'q') {
								let square = this.chessboard.getSquareFromArr('h8');
								if (square.piece && square.piece.name == 'rook') {
									square.piece.isCastling = true;
								}
							}
							else if (castlfen[i] === 'k') {
								let square = this.chessboard.getSquareFromArr('a8');
								if (square.piece && square.piece.name == 'rook') {
									square.piece.isCastling = true;
								}
							}
						}
					}
				}
			}
		}

		//Set EnPassant
		{
			let k = 0;
			for (let i = 0; i < myFEN.length; i++) {
				if (myFEN[i - 1] === ' ') {
					k++;
				}
				if (k === 3) {
					let fen = myFEN[i] + myFEN[i + 1];
					if (FEN.isID(fen)) {
						console.log(fen);
						let square = this.chessboard.getSquareFromArr(fen);
						if (square.ID[1] == '3') {
							this.chessboard.setEnPassant(this.chessboard.cellsArr[square.position.y - 1][square.position.x].piece, square);
							break;
						}
						else if (square.ID[1] == '6') {
							this.chessboard.setEnPassant(this.chessboard.cellsArr[square.position.y + 1][square.position.x].piece, square);
							break;
						}
					}
				}
			}
		}
		for (let i = 0; i < 2; i++) {
			this.chessboard.player[i].drawCheckMateArray();
		}
		let player;
		for (let i = 0; i < 2; i++) {
			if (this.chessboard.player[i].side == this.chessboard.playerSide) {
				player = this.chessboard.player[i];
			}
			if (this.chessboard.player[i].side != this.chessboard.playerSide) {
				if (this.chessboard.player[i].isCheckMate() > 0) {
					this.chessboard._checkMate = this.chessboard.player[i];
					console.error("Error:The " + this.chessboard.player[i].side + " side cannot has checkmate");
				}
			}
		}
		this.chessboard.isCheckMate(player);
	}
	//Write a FEN
	getFEN() {
		let thisFEN = '';
		for (let i = 0; i < 8; i++) {
			let fen = '';
			let num = 0;
			for (let j = 0; j < 8; j++) {
				if (this.chessboard.cellsArr[i][j] && this.chessboard.cellsArr[i][j].piece != undefined && (JSON.stringify(this.chessboard.cellsArr[i][j].position) === JSON.stringify(this.chessboard.cellsArr[i][j].piece.position))) {
					if (num > 0) { fen += num; num = 0 }
					let fenPiece = this.chessboard.cellsArr[i][j].piece.name[0];
					if (this.chessboard.cellsArr[i][j].piece.name === 'knight') {
						fenPiece = this.chessboard.cellsArr[i][j].piece.name[1];
					}
					if (this.chessboard.cellsArr[i][j].piece.side == 'white') { fen += fenPiece.toUpperCase() }
					else if (this.chessboard.cellsArr[i][j].piece.side == 'black') { fen += fenPiece.toLowerCase() }
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
		thisFEN += ' ' + this.chessboard.playerSide[0] + ' ' + this.setCastlingForFEN() + ' ' + this.chessboard.EnPassantForFEN + ' ' + ' ';
		console.error(thisFEN);
		return thisFEN;
	}
}