import { Pawn, King, Knight, Bishop, Rook, Queen } from "./Piece.js";

export class Player {
	constructor(side, chessboard) {
		this.side = side;
		this._chessboard = chessboard;
		this.chessboard._player.push(this);
		this._figures = [];
		this.drawPiece();
		this.checkMateArr = [[], [], [], [], [], [], [], []];
	}
	get figures() {
		return this._figures;
	}
	get chessboard() {
		return this._chessboard;
	}
	set king(value) {
		this._king = value;
	}
	get king() {
		return this._king;
	}
	set side(value) {
		this._side = value;
	}
	get side() {
		return this._side;
	}
	set pricePlayer(value) {
		this._pricePlayer = value;
	}
	get pricePlayer() {
		return this._pricePlayer;
	}
	set checkFigure(value) {
		this._checkFigure = value;
	}
	get checkFigure() {
		return this._checkFigure;
	}

	pricePlayerPieces() {
		let price = 0;
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				if (currentPositionPieces[i][j] == this._side + 'p') {
					price += 1;
				}
				else if (currentPositionPieces[i][j] == this._side + 'q') {
					price += 9;
				}
				else if (currentPositionPieces[i][j] == this._side + 'r') {
					price += 5;
				}
				else if (currentPositionPieces[i][j] == this._side + 'b') {
					price += 3;
				}
				else if (currentPositionPieces[i][j] == this._side + 'n') {
					price += 3;
				}
			}
		}
		return price;
	}
	drawPiece() {
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				let pos = { x: j, y: i };
				let namePos = this.chessboard.currentPositionPieces[j][i];
				if (namePos) {
					if (namePos[0] == this.side[0]) {
						if (namePos[1] == 'p') {
							let pawn = new Pawn(this.side, pos, this.chessboard, this);
							this._figures.push(pawn);
						}
						else if (namePos[1] == 'n') {
							let knight = new Knight(this.side, pos, this.chessboard, this);
							this._figures.push(knight);
						}
						else if (namePos[1] == 'b') {
							let bishop = new Bishop(this.side, pos, this.chessboard, this);
							this._figures.push(bishop);
						}
						else if (namePos[1] == 'r') {
							let rook = new Rook(this.side, pos, this.chessboard, this);
							this._figures.push(rook);
						}
						else if (namePos[1] == 'q') {
							let queen = new Queen(this.side, pos, this.chessboard, this);
							this._figures.push(queen);
						}
						else if (namePos[1] == 'k') {
							let king = new King(this.side, pos, this.chessboard, this);
							this._figures.push(king);
							this.king = king;
						}
					}
				}
			}
		}
	}
	drawCheckMateArray() {
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				this.checkMateArr[i][j] = 0;
			}
		}
		this.figures.forEach(element => {
			element.drawCheckMateArray();
			for (let i = 0; i < 8; i++) {
				for (let j = 0; j < 8; j++) {
					if (element.checkMateArray[i][j] == 1) {
						this.checkMateArr[i][j] = element.checkMateArray[i][j];
					}
				}
			}
		});
	}
	isCheckMate() {
		let anotherPlayer;
		let isCheckMate = 0;
		let checkAmount = 0;
		this.checkFigure = undefined;
		for (let i = 0; i < 2; i++) {
			if (this.chessboard.player[i].side != this.side) {
				anotherPlayer = this.chessboard.player[i];
			}
		}


		{
			let figure;
			for (let i = 0; i < anotherPlayer.figures.length; i++) {
				if (anotherPlayer.figures[i].checkMateArray[this.king.position.x][this.king.position.y] == 1) {
					figure = anotherPlayer.figures[i];
					console.log('figure is getted:')
					console.log(figure)
					checkAmount++;
				}
			}
			console.log('checkAmount: ' + checkAmount)
			if (checkAmount == 1) {
				this.checkFigure = figure;
				console.log('checkFigure is getted')
				console.log(this.checkFigure)
			}
			else if(checkAmount > 1){
				this.checkFigure = false;
			}
		}

		if (checkAmount > 0) {

			let checkMate = 2;

			let possible = [[this.king.position.x + 1, this.king.position.y + 1], [this.king.position.x + 1, this.king.position.y - 1], [this.king.position.x - 1, this.king.position.y + 1], [this.king.position.x - 1, this.king.position.y - 1], [this.king.position.x, this.king.position.y + 1], [this.king.position.x, this.king.position.y - 1], [this.king.position.x - 1, this.king.position.y], [this.king.position.x + 1, this.king.position.y]];

			possible.forEach(([xx, yy]) => {

				if (xx >= 0 && xx < 8 && yy >= 0 && yy < 8) {
					let pos = {x:xx,y:yy};
					let isCheck = 1;

					if (!this.chessboard.cellsArr[pos.y][pos.x].piece) {
						for (let i = 0; i < anotherPlayer.figures.length; i++) {
							if (anotherPlayer.figures[i].checkMateArray[pos.x][pos.y] == 1) {
								console.log(this.chessboard.cellsArr[pos.y][pos.x].html)
								console.log(anotherPlayer.figures[i])
								console.log('its not possible')
								isCheck = 2;
								break;
							}
						}
					}
					else if (this.chessboard.cellsArr[pos.y][pos.x].piece) {
						if (this.chessboard.cellsArr[pos.y][pos.x].piece.side == this.side) {
							console.log(this.chessboard.cellsArr[pos.y][pos.x].html)
							console.log('its not possible')
							isCheck = 2;
						}
						else if (this.chessboard.cellsArr[pos.y][pos.x].piece.side != this.side) {
							for (let i = 0; i < anotherPlayer.figures.length; i++) {
								if (anotherPlayer.figures[i].checkMateArray[pos.x][pos.y] == 1) {
									console.log(this.chessboard.cellsArr[pos.y][pos.x].html)
									console.log('its not possible')
									isCheck = 2;
									break;
								}
							}
						}
					}
					else {
						console.log(this.chessboard.cellsArr[pos.y][pos.x].html)
						console.log('possible')
					}
					console.log('isCheck: ' + isCheck)
					if (isCheck == 1) {
						checkMate = 1;
					}
				}
			});


			//Check, if piece can cover a king
			if (checkMate == 2 && checkAmount == 1) {
				let checkPos = {xx:this.king.position.x ,yy:this.king.position.y};
				let possible = this.checkFigure.moveDestination('move', checkPos);
				console.log(possible)
				possible.forEach(([xx, yy]) => {
					let dest = {xx,yy};
					for (let i = 0; i < this.figures.length; i++) {
						console.log('check')
						console.log(this.figures[i])
						let pos = this.figures[i].moveDestination('move',dest);
						console.log(pos)
						if (pos) {
							console.error('is can setted!')
							checkMate = 1;
							break;
						}
					}
				});
			}


			//Return 'isCheckMate' value
			if (checkMate > 0) {
				if (checkMate == 2) {
					isCheckMate = 2;
				}
				else if (checkMate == 1) {
					isCheckMate = 1;
				}
			}
			else {
				isCheckMate = 0;
			}
		}
		return isCheckMate;
	}
}