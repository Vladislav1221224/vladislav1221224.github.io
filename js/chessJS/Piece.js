class Piece {
	constructor(name, side, pos, thisChessBoard) {
		this.name = name;
		this.side = side;
		this.position = pos;
		this._chessboard = thisChessBoard;
		this.addPiece();
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
		this.chessboard.cellsArr[this.position.x][this.position.y].piece = this;
		this.chessboard.cellsArr[this.position.x][this.position.y].html.appendChild(piece);
	}
}
class Pawn extends Piece {
	constructor(side, pos, chessboard) {
		super('pawn', side, pos, chessboard);
	}
	moveDestination(value) {
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
			for (let j = 0; j < max; j++) {
				let dest = destination(i, j);
				if (dest.xx >= 0 && dest.xx < 8 && dest.yy >= 0 && dest.yy < 8) {
					let square = chessboard.cellsArr[dest.xx][dest.yy];

					if (i == 0 && value == 'move') {
						if (!square.piece) {
							square.drawDestination('set');
						}
						else if (square.piece) {
							break;
						}
					}
					else if ((square.piece || value == 'check') && i > 0) {
						if (value == 'check' || square.piece.side != side) {
							if (value == 'move') {
								square.drawDestination('eat');
							}
							else if (value == 'check') {
								square.drawDestination('check', side);
							}
						}
					}

				}
			}
		}

	}
}
class Knight extends Piece {
	constructor(side, pos, chessboard) {
		super('knight', side, pos, chessboard);
	}
	moveDestination(value) {
		console.log('Ето Конь');
		let possible = [[this.position.x + 2, this.position.y + 1], [this.position.x + 2, this.position.y - 1], [this.position.x - 2, this.position.y + 1], [this.position.x - 2, this.position.y - 1], [this.position.x + 1, this.position.y + 2], [this.position.x + 1, this.position.y - 2], [this.position.x - 1, this.position.y + 2], [this.position.x - 1, this.position.y - 2]];
		possible.forEach(([xx, yy]) => {
			if (xx >= 0 && xx < 8 && yy >= 0 && yy < 8) {
				let square = this.chessboard.cellsArr[xx][yy];
				if (!square.piece) {
					if (value == 'move') {
						square.drawDestination('set');
					}
					else if (value == 'check') {
						square.drawDestination('check', this.side);
					}
				}
				else if (square.piece || value == 'check') {
					if (square.piece.side != this.side) {
						if (value == 'move') {
							square.drawDestination('eat');
						}
					}
					else if (value == 'check') {
						console.log('its do')
						square.drawDestination('check', this.side);
					}
				}
			}
		});
	}
}
class Bishop extends Piece {
	constructor(side, pos, chessboard) {
		super('bishop', side, pos, chessboard);
	}
	moveDestination(value) {
		let position = this.position;
		let side = this.side;
		console.log('Ето слон');
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
			for (let j = 0; j < 8; j++) {
				let pos = destination(i, j);
				if (pos.xx >= 0 && pos.xx < 8 && pos.yy >= 0 && pos.yy < 8) {
					let square = this.chessboard.cellsArr[pos.xx][pos.yy];
					console.log(square.piece)
					if (!square.piece) {
						if (value == 'move') {
							square.drawDestination('set');
						}
						else if (value == 'check') {
							square.drawDestination('check', side);
						}
					}
					else if (square.piece || value == 'check') {
						if (square.piece.side != this.side) {
							if (value == 'move') {
								square.drawDestination('eat');
							}
						}
						else if (value == 'check') {
							console.log('its do check bishop')
							square.drawDestination('check', side);
						}
						console.log('break is do')
						break;
					}
				}
			}
		}
	}
}
class Rook extends Piece {
	constructor(side, pos, chessboard) {
		super('rook', side, pos, chessboard);
	}
	moveDestination(value) {
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
			for (let j = 0; j < 8; j++) {
				let pos = destination(i, j);
				if (pos.xx >= 0 && pos.xx < 8 && pos.yy >= 0 && pos.yy < 8) {
					let square = this.chessboard.cellsArr[pos.xx][pos.yy];
					if (!square.piece) {
						if (value == 'move') {
							square.drawDestination('set');
						}
						else if (value == 'check') {
							square.drawDestination('check', side);
						}
					}
					else if (square.piece || value == 'check') {
						if (square.piece.side != this.side) {
							if (value == 'move') {
								square.drawDestination('eat');
							}
						}
						else if (value == 'check') {
							console.log('its do check rook')
							square.drawDestination('check', side);
						}
						console.log('break is do')
						break;
					}
				}
			}
		}
	}
}
class Queen extends Piece {
	constructor(side, pos, chessboard) {
		super('queen', side, pos, chessboard);
	}
	moveDestination(value) {
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
			for (let j = 0; j < 8; j++) {
				let pos = destination(i, j);
				if (pos.xx >= 0 && pos.xx < 8 && pos.yy >= 0 && pos.yy < 8) {
					let square = this.chessboard.cellsArr[pos.xx][pos.yy];
					if (!square.piece) {
						if (value == 'move') {
							square.drawDestination('set');
						}
						else if (value == 'check') {
							square.drawDestination('check', side);
						}
					}
					else if (square.piece || value == 'check') {
						if (square.piece.side != this.side) {
							if (value == 'move') {
								square.drawDestination('eat');
							}
						}
						else if (value == 'check') {
								console.log('its do check rook')
								square.drawDestination('check', side);
						}
						if (square.piece.name == 'king') {
						}
						else{
							break;
						}
					}
				}
			}
		}
	}
}
class King extends Piece {
	constructor(side, pos, chessboard) {
		super('king', side, pos, chessboard);
	}
	isCheck() {
		if (this.chessboard.isGame) {
			let anotherPlayer;
			let thisPlayer;
			for (let i = 0; i < 2; i++) {
				if (this.chessboard.player[i].side != this.side) {
					anotherPlayer = this.chessboard.player[i];
				}
				else if(this.chessboard.player[i].side == this.side){
					thisPlayer = this.chessboard.player[i];
				}
			}
			if(anotherPlayer.checkMateArray[this.position.x][this.position.y] == 1){
				if(thisPlayer.isCheckMate()){
					
				}
				else{

				}
			}
		}
	}
	moveDestination(value) {
		let position = this.position;
		let possible = [[position.x + 1, position.y + 1], [position.x + 1, position.y - 1], [position.x - 1, position.y + 1], [position.x - 1, position.y - 1], [position.x, position.y + 1], [position.x, position.y - 1], [position.x - 1, position.y], [position.x + 1, position.y]];
		let moves = false;
		possible.forEach(([xx, yy]) => {
			if (xx >= 0 && xx < 8 && yy >= 0 && yy < 8) {
				let square = this.chessboard.cellsArr[xx][yy];
				let player;
				for (let i = 0; i < 2; i++) {
					if (this.chessboard.player[i].side != this.side) {
						player = this.chessboard.player[i];
					}
				}
				console.log(player.checkMateArray[yy][xx])
				if(player.checkMateArray[yy][xx] == 0 || value == 'check'){
					console.log(this.chessboard.cellsArr[xx][yy].html)
				}
				if (player.checkMateArray[yy][xx] == 0 || value == 'check') {
					if (!square.piece) {
						if (value == 'move') {
							square.drawDestination('set');
						}
						else if (value == 'check') {
							square.drawDestination('check', this.side);
						}
					}
					else if (square.piece || value == 'check') {
						if (square.piece.side != this.side) {
							if (value == 'move') {
								square.drawDestination('eat');
							}
						}
						else if (value == 'check') {
							square.drawDestination('check', this.side);
						}
					}
				}
			}
		});

	}
}

export { Piece, Pawn, Knight, Bishop, Rook, Queen, King };