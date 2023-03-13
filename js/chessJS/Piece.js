class Piece {
	constructor(name, side, pos, thisChessBoard, player) {
		this.name = name;
		this.side = side;
		this.position = pos;
		this._chessboard = thisChessBoard;
		this.player = player;
		this._checkMateArray = [[], [], [], [], [], [], [], []];
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				this._checkMateArray[i][j] = 0;
			}
		}
		this.addPiece();
		this.drawCheckMateArray();
	}
	get chessboard() {
		return this._chessboard;
	}
	set position(pos) {
		this._position = pos;
	}
	get position() {
		return this._position;
	}
	set name(value) {
		this._name = value;
	}
	get name() {
		return this._name;
	}
	set side(value) {
		this._side = value;
	}
	get side() {
		return this._side;
	}
	set html(value) {
		this._html = value;
	}
	get html() {
		return this._html;
	}
	set checkMateArray(value) {
		this._checkMateArray = value;
	}
	get checkMateArray() {
		return this._checkMateArray;
	}
	set player(value) {
		this._player = value;
	}
	get player() {
		return this._player;
	}
	drawCheckMateArray() {
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				this.checkMateArray[i][j] = 0;
			}
		}
		this.moveDestination('check');
	}
	canMove(pos) {
		let checkPos = { xx: this.player.king.position.x, yy: this.player.king.position.y };
		let isPossible;
		if (this.player.checkFigure) {
			let possible = this.player.checkFigure.moveDestination('move', checkPos);
			possible.forEach((position) => {
				let xx = position[0];
				let yy = position[1];
				if (xx == pos.xx && yy == pos.yy) {
					console.log('is true')
					isPossible = true;
				}
			});
			if (!isPossible) {
				console.log('is false')
				isPossible = false;
			}
		}
		else {
			console.log('is true')
			isPossible = true;
		}
		return isPossible;
	}
	setDestin(square, option) {
		let pos = { xx: square.position.x, yy: square.position.y };
		let chessBoard = this.chessboard;
		let thisPos = this.position;
		let thisPlayer = this.player;
		let anotherPlayer;
		for (let i = 0; i < 2; i++) {
			if (this.chessboard.player[i].side != thisPlayer.side) {
				anotherPlayer = this.chessboard.player[i];
			}
		}



		function isCheck() {

			////////////////////////////////////////////////////////////////////
			let piece;
			if (chessBoard.cellsArr[pos.yy][pos.xx].piece) {
				piece = chessBoard.cellsArr[pos.yy][pos.xx].piece;
			}
			////////////////////////////////////////////////////////////////////
			let checkAmount = thisPlayer.isCheckMate('get');
			////////////////////////////////////////////////////////////////////
			chessBoard.cellsArr[pos.yy][pos.xx].piece = chessBoard.cellsArr[thisPos.y][thisPos.x].piece;
			chessBoard.cellsArr[thisPos.y][thisPos.x].piece = undefined;
			////////////////////////////////////////////////////////////////////
			anotherPlayer.drawCheckMateArray();
			let isCheck = thisPlayer.isCheckMate('get');
			////////////////////////////////////////////////////////////////////
			chessBoard.cellsArr[thisPos.y][thisPos.x].piece = chessBoard.cellsArr[pos.yy][pos.xx].piece;
			if (piece) { chessBoard.cellsArr[pos.yy][pos.xx].piece = piece }
			else { chessBoard.cellsArr[pos.yy][pos.xx].piece = undefined }
			////////////////////////////////////////////////////////////////////
			anotherPlayer.drawCheckMateArray();
			thisPlayer.isCheckMate();
			if (isCheck <= checkAmount) {
				console.log('is true');
				return true;
			}
			else {
				console.log('is false');
				return false;
			}
		}



		if (this.player.checkFigure != false) {
			if (!square.piece) {
				if (isCheck()) {
					if (this.canMove(pos)) {
						//For other figures
						if (!option) {
							square.drawDestination('set');
						}
						//For pawns
						else if (option == 'set') {
							square.drawDestination('set');
						}
						return false;
					}
				}
			}
			else if (square.piece) {
				if (square.piece.side != this.side) {
					if (isCheck()) {
						if (this.canMove(pos)) {
							//For other figures
							if (!option) {
								square.drawDestination('eat');
							}
							//For pawns
							else if (option == 'eat') {
								square.drawDestination('eat');
							}
						}
					}
				}
				return true;
			}
		}
	}
	addPiece() {
		let side = this.side[0];
		let name;
		if (this.name == 'knight') {
			name = 'n';
		}
		else {
			name = this.name[0];
		}
		let piece = document.createElement('img');
		piece.src = 'images/piecesPNG/' + side + name + '.png';
		piece.className = 'piece';
		this.html = piece;
		this.chessboard.cellsArr[this.position.y][this.position.x].piece = this;
		this.chessboard.cellsArr[this.position.y][this.position.x].html.appendChild(piece);
	}
}
class Pawn extends Piece {
	constructor(side, pos, chessboard, player) {
		super('pawn', side, pos, chessboard, player);
	}
	moveDestination(value, destin) {
		if (destin) {
			if (!destin.xx && !destin.yy) {
				console.error('destin must be {xx: ** ,yy: **}');
			}
		}
		let chessboard = this.chessboard;
		let position = this.position;
		let side = this.side;
		function destination(i, j) {
			function mathPawn(y) {
				if (side != chessboard.chessBoardSide) {
					y = y;
				}
				else if (side == chessboard.chessBoardSide) {
					y = -y;

				}
				return y;
			}

			let xx, yy;
			if (i == 0) {
				xx = position.x;
				yy = position.y + mathPawn(j + 1);
			}
			else if (i == 1) {
				xx = position.x + 1;
				yy = position.y + mathPawn(1);
			}
			else if (i == 2) {
				xx = position.x - 1;
				yy = position.y + mathPawn(1);
			}
			return { xx, yy };
		}
		function isFirstMove() {
			let y = 1;
			if (position.y == 1 && side != chessboard.chessBoardSide) {
				y = 2;
			}
			else if (position.y == 6 && side == chessboard.chessBoardSide) {
				y = 2;
			}
			return y;
		}
		function isEnPassant() {

		}
		for (let i = 0; i < 3; i++) {
			let max = isFirstMove();
			if (i > 0) {
				max = 1;
			}
			let arr = [[this.position.x, this.position.y]];
			for (let j = 0; j < max; j++) {
				let pos = destination(i, j);
				if (pos.xx >= 0 && pos.xx < 8 && pos.yy >= 0 && pos.yy < 8) {
					let square = chessboard.cellsArr[pos.yy][pos.xx];
					if (destin && value == 'move') {
						if (!square.piece && i == 0) {
							arr.push([pos.xx, pos.yy]);
						}
						else if (square.piece && i > 0) {
							console.log(square.html);
							console.log(pos)
							console.log(destin)
							if (pos.xx == destin.xx && pos.yy == destin.yy) {
								console.log('arr is return')
								return arr;
							}
						}
					}
					else if (value == 'check' && i > 0) {
						square.drawDestination('check', this);
					}
					else if (value == 'move') {
						if (i == 0) {
							this.setDestin(square, 'set');
						}
						else if (i > 0) {
							this.setDestin(square, 'eat');
						}
					}
				}
			}
		}
	}
}
class Knight extends Piece {
	constructor(side, pos, chessboard, player) {
		super('knight', side, pos, chessboard, player);
	}
	moveDestination(value, destin) {
		let possible = [[this.position.x + 2, this.position.y + 1], [this.position.x + 2, this.position.y - 1], [this.position.x - 2, this.position.y + 1], [this.position.x - 2, this.position.y - 1], [this.position.x + 1, this.position.y + 2], [this.position.x + 1, this.position.y - 2], [this.position.x - 1, this.position.y + 2], [this.position.x - 1, this.position.y - 2]];
		let isReturn = false;
		let arr = [[this.position.x, this.position.y]];
		possible.forEach(([xx, yy]) => {
			let pos = { xx, yy }
			if (pos.xx >= 0 && pos.xx < 8 && pos.yy >= 0 && pos.yy < 8) {
				let square = this.chessboard.cellsArr[pos.yy][pos.xx];
				if (destin && value == 'move') {
					if (!square.piece) {
					}
					else if (square.piece) {
						if (pos.xx == destin.xx && pos.yy == destin.yy) {
							console.log('arr is return')
							isReturn = true;
						}
					}
				}
				else if (value == 'check') {
					square.drawDestination('check', this);
				}
				else if (value == 'move') {
					this.setDestin(square);
				}
			}
		});
		console.log(isReturn);
		if (isReturn) {
			return arr;
		}
	}
}
class Bishop extends Piece {
	constructor(side, pos, chessboard, player) {
		super('bishop', side, pos, chessboard, player);
	}
	moveDestination(value, destin) {
		let position = this.position;
		function destination(i, j) {
			let xx, yy;
			if (i == 0) {
				xx = position.x + (j + 1);
				yy = position.y + (j + 1);
			}
			else if (i == 1) {
				xx = position.x - (j + 1);
				yy = position.y + (j + 1);
			}
			else if (i == 2) {
				xx = position.x + (j + 1);
				yy = position.y - (j + 1);
			}
			else if (i == 3) {
				xx = position.x - (j + 1);
				yy = position.y - (j + 1);
			}
			return { xx, yy };
		}
		for (let i = 0; i < 4; i++) {
			let arr = [[this.position.x, this.position.y]];
			for (let j = 0; j < 8; j++) {
				let pos = destination(i, j);
				if (pos.xx >= 0 && pos.xx < 8 && pos.yy >= 0 && pos.yy < 8) {
					let square = this.chessboard.cellsArr[pos.yy][pos.xx];
					if (destin && value == 'move') {
						if (!square.piece) {
							arr.push([pos.xx, pos.yy]);
						}
						else if (square.piece && square.piece.name != 'king') {
							if (pos.xx == destin.xx && pos.yy == destin.yy) {
								return arr;
							}
							else {
								break;
							}
						}
						else if (pos.xx == destin.xx && pos.yy == destin.yy) {
							return arr;
						}
					}
					else if (value == 'check') {
						if (!square.piece) {
							square.drawDestination('check', this);
						}
						else if (square.piece.name == 'king') {
							square.drawDestination('check', this);
						}
						else if (square.piece.side == this.side) {
							square.drawDestination('check', this);
							break;
						}
						else if (square.piece.side != this.side) {
							square.drawDestination('check', this);
							break;
						}
					}
					else if (value == 'move') {
						let isBreak = this.setDestin(square);
						console.log(isBreak)
						if (isBreak) {
							break;
						}
					}
				}
				else {
					break;
				}
			}
		}
	}
}
class Rook extends Piece {
	constructor(side, pos, chessboard, player) {
		super('rook', side, pos, chessboard, player);
	}
	moveDestination(value, destin) {
		let position = this.position;
		let side = this.side;
		function destination(i, j) {
			let xx, yy;
			if (i == 0) {
				xx = position.x + (j + 1);
				yy = position.y;
			}
			else if (i == 1) {
				xx = position.x - (j + 1);
				yy = position.y;
			}
			else if (i == 2) {
				xx = position.x;
				yy = position.y + (j + 1);
			}
			else if (i == 3) {
				xx = position.x;
				yy = position.y - (j + 1);
			}
			return { xx, yy };

		}
		for (let i = 0; i < 4; i++) {
			let arr = [[this.position.x, this.position.y]];
			for (let j = 0; j < 8; j++) {
				let pos = destination(i, j);
				if (pos.xx >= 0 && pos.xx < 8 && pos.yy >= 0 && pos.yy < 8) {
					let square = this.chessboard.cellsArr[pos.yy][pos.xx];
					if (destin && value == 'move') {
						if (!square.piece) {
							arr.push([pos.xx, pos.yy]);
						}
						else if (square.piece && square.piece.name != 'king') {
							if (pos.xx == destin.xx && pos.yy == destin.yy) {
								return arr;
							}
							else {
								break;
							}
						}
						else if (pos.xx == destin.xx && pos.yy == destin.yy) {
							return arr;
						}
					}
					else if (value == 'check') {
						if (!square.piece) {
							square.drawDestination('check', this);
						}
						else if (square.piece.name == 'king') {
							square.drawDestination('check', this);
						}
						else if (square.piece.side == this.side) {
							square.drawDestination('check', this);
							break;
						}
						else if (square.piece.side != this.side) {
							square.drawDestination('check', this);
							break;
						}
					}
					else if (value == 'move') {
						let isBreak = this.setDestin(square);
						console.log(isBreak)
						if (isBreak) {
							break;
						}
					}
				}
				else {
					break;
				}
			}
		}
	}
}
class Queen extends Piece {
	constructor(side, pos, chessboard, player) {
		super('queen', side, pos, chessboard, player);
	}
	moveDestination(value, destin) {
		let position = this.position;
		let side = this.side;
		function destination(i, j) {
			let xx, yy;
			if (i == 0) {
				xx = position.x + (j + 1);
				yy = position.y;
			}
			else if (i == 1) {
				xx = position.x - (j + 1);
				yy = position.y;
			}
			else if (i == 2) {
				xx = position.x;
				yy = position.y + (j + 1);
			}
			else if (i == 3) {
				xx = position.x;
				yy = position.y - (j + 1);
			}
			else if (i == 4) {
				xx = position.x + (j + 1);
				yy = position.y + (j + 1);
			}
			else if (i == 5) {
				xx = position.x - (j + 1);
				yy = position.y + (j + 1);
			}
			else if (i == 6) {
				xx = position.x + (j + 1);
				yy = position.y - (j + 1);
			}
			else if (i == 7) {
				xx = position.x - (j + 1);
				yy = position.y - (j + 1);
			}
			return { xx, yy };
		}
		for (let i = 0; i < 8; i++) {
			let arr = [[this.position.x, this.position.y]];
			for (let j = 0; j < 8; j++) {
				let pos = destination(i, j);
				if (pos.xx >= 0 && pos.xx < 8 && pos.yy >= 0 && pos.yy < 8) {
					let square = this.chessboard.cellsArr[pos.yy][pos.xx];
					if (destin && value == 'move') {
						if (!square.piece) {
							arr.push([pos.xx, pos.yy]);
						}
						else if (square.piece && square.piece.name != 'king') {
							if (pos.xx == destin.xx && pos.yy == destin.yy) {
								return arr;
							}
							else {
								break;
							}
						}
						else if (pos.xx == destin.xx && pos.yy == destin.yy) {
							return arr;
						}
					}
					else if (value == 'check') {
						if (!square.piece) {
							square.drawDestination('check', this);
						}
						else if (square.piece.name == 'king') {
							square.drawDestination('check', this);
						}
						else if (square.piece.side == this.side) {
							square.drawDestination('check', this);
							break;
						}
						else if (square.piece.side != this.side) {
							square.drawDestination('check', this);
							break;
						}
					}
					else if (value == 'move') {
						let isBreak = this.setDestin(square);
						if (isBreak) {
							break;
						}
					}
				}
				else {
					break;
				}
			}
		}
	}
}
class King extends Piece {
	constructor(side, pos, chessboard, player) {
		super('king', side, pos, chessboard, player);
	}
	possibleMove(pos) {
		let isPossible = true;
		let player;
		for (let i = 0; i < 2; i++) {
			if (this.chessboard.player[i].side != this.side) {
				player = this.chessboard.player[i];
			}
		}
		for (let i = 0; i < player.figures.length; i++) {
			if (player.figures[i].checkMateArray[pos.xx][pos.yy] == 0) {
				if (this.chessboard.cellsArr[pos.yy][pos.xx].piece) {
					if (this.chessboard.cellsArr[pos.yy][pos.xx].piece.side != this.side) {
						isPossible = true;
					}
					else {
						isPossible = false;
						break;
					}
				}
			}
			else {
				isPossible = false;
				break;
			}
		}
		return isPossible;
	}
	moveDestination(value) {
		let position = this.position;
		let possible = [[position.x + 1, position.y + 1], [position.x + 1, position.y - 1], [position.x - 1, position.y + 1], [position.x - 1, position.y - 1], [position.x, position.y + 1], [position.x, position.y - 1], [position.x - 1, position.y], [position.x + 1, position.y]];
		possible.forEach(([xx, yy]) => {
			if (xx >= 0 && xx < 8 && yy >= 0 && yy < 8) {
				let square = this.chessboard.cellsArr[yy][xx];
				if (value == 'check') {
					if (!square.piece) {
						square.drawDestination('check', this);
					}
					else if (square.piece) {
						if (square.piece.side != this.side) {
							square.drawDestination('check', this);
						}
					}
				}
				else if (value == 'move' && this.possibleMove({ xx, yy })) {
					if (!square.piece) {
						square.drawDestination('set');
					}
					else if (square.piece) {
						if (square.piece.side != this.side) {
							square.drawDestination('eat');
						}
					}
				}
			}
		});

	}
}

export { Piece, Pawn, Knight, Bishop, Rook, Queen, King };