import ChessBoard from "./ChessBoard.mjs";
import { Piece } from "./Piece.mjs";


export default class Move {
	constructor(piece, A = { x, y }, B = { x, y }, chessboard, capture, pawnPromotion, Castling) {
		if (chessboard instanceof ChessBoard && piece instanceof Piece) {
			this._piece = piece;
			this._chessboard = ChessBoard;
			this._capture = capture;
			this.pawnPromotion = pawnPromotion;
			this.castling = Castling;
			this._start = A;
			this._end = B;
			this.notation = this.convertToMoveNotation(A, B);
		}
		else {
			console.error('This is not ChessBoard');
		}
	}
	static horizontalAxe = {
		0: 'a',
		1: 'b',
		2: 'c',
		3: 'd',
		4: 'e',
		5: 'f',
		6: 'g',
		7: 'h',
	}
	static verticalAxe = {
		7: '1',
		6: '2',
		5: '3',
		4: '4',
		3: '5',
		2: '6',
		1: '7',
		0: '8',
	}
	//Move node
	notation;

	//Start and finish squares
	get start() {
		return this._start;
	}
	get end() {
		return this._end;
	}

	//If piece is capture enemy piece
	get capture() {
		return this._capture;
	}
	//Which piece is do move
	get piece() {
		return this._piece;
	}
	
	pawnPromotion;

	castling;
	//Chessboard
	get chessboard() {
		return this._chessboard;
	}


	//Methods
	convertToCellNotation({ x, y }) {
		return Move.horizontalAxe[x] + Move.verticalAxe[y];
	}
	convertToMoveNotation(A = { x, y }, B = { x, y }) {
		let node = '';
		let b = this.convertToCellNotation(B);
		if (this.piece.name != 'pawn') {
			if (this.piece.name == 'knight') {
				node += 'N';
			}
			else {
				node += this.piece.name[0].toUpperCase();
			}
		}
		if (this.capture) {
			if (this.piece.name == 'pawn') {
				node += this.convertToCellNotation(A)[0];
			}
			node += 'x';
		}
		node += b;
		return node;
	}
}