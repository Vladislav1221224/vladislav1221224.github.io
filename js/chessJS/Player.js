import { Pawn, King, Knight, Bishop, Rook, Queen } from "./Piece.js";

export class Player {
	constructor(side, chessboard) {
		this.side = side;
		this._chessboard = chessboard;
		this.drawPiece();

		//This for check the mate
		this._checkMateArray = [[], [], [], [], [], [], [], []];
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				this._checkMateArray[i][j] = 0;
			}
		}
	}
	get chessboard() {
		return this._chessboard;
	}
	set checkMateArray(value) {
		this._checkMateArray = value;
	}
	get checkMateArray() {
		return this._checkMateArray;
	}
	set king(value){
		this._king = value;
	}
	get king(){
		return this._king;
	}
	isCheckMate() {
		let anotherPlayer;
		let isCheckMate;
		for (let i = 0; i < 2; i++) {
			if(this.chessboard.player[i].side != this.side){
				anotherPlayer = this.chessboard.player[i];
			}
		}
		console.log(anotherPlayer);
		this.king.moveDestination('check');
		return isCheckMate;
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
				let pos = { x: i, y: j };
				let namePos = this.chessboard.currentPositionPieces[pos.y][pos.x];
				if (namePos) {
					if (namePos[0] == this.side[0]) {
						if (namePos[1] == 'p') {
							let pawn = new Pawn(this.side, pos, this.chessboard);
						}
						else if (namePos[1] == 'n') {
							let knight = new Knight(this.side, pos, this.chessboard);
						}
						else if (namePos[1] == 'b') {
							let bishop = new Bishop(this.side, pos, this.chessboard);
						}
						else if (namePos[1] == 'r') {
							let rook = new Rook(this.side, pos, this.chessboard);
						}
						else if (namePos[1] == 'q') {
							let queen = new Queen(this.side, pos, this.chessboard);
						}
						if (namePos[1] == 'k') {
							let king = new King(this.side, pos, this.chessboard);
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
				this._checkMateArray[i][j] = 0;
			}
		}
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				if (this.chessboard.cellsArr[i][j].piece) {
					console.log(i + '/' + j)
					console.log('its do ' + this.chessboard.cellsArr[i][j].piece.side + ' / ' + this.side)

					if (this.chessboard.cellsArr[i][j].piece.side == this.side) {
						console.log('is do drawCheckMate ' + i + '/' + j)
						console.log(this.chessboard.cellsArr[i][j].piece)
						this.chessboard.cellsArr[i][j].piece.moveDestination('check');
						console.log(this.checkMateArray)
					}
				}
			}
		}
		console.log(this.checkMateArray)
	}
}