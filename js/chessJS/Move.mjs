import ChessBoard from "./ChessBoard.mjs";
import { Piece } from "./Piece.mjs";



export default class Move {
	constructor(piece/*<--moveNotation*/, side, id, chessboard, A, B, startFen, capture, checkmate, Castling) {
		if (chessboard instanceof ChessBoard && piece instanceof Piece) {
			this._piece = piece;
			this._side = side;
			this._id = id;
			this._chessboard = chessboard;
			this._capture = capture;
			this.checkmate = checkmate;
			console.log("CHECkMaTe:" + checkmate)
			this.castling = Castling;
			this._start = A;
			this._end = B;
			this.notation = this.convertToMoveNotation(A, B);
		}
		else if (piece && side && id && this.isMoveNotation(chessboard, piece, side)) {
			let move = this.isMoveNotation(chessboard, piece, side);
			console.log(move);
		}
		else {
			console.error('This is not ChessBoard or moveNotation');
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

	//Fen of chessboard before the move
	get fen() {
		return this._fen;
	}

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
	//Side of move
	get side() {
		return this._side;
	}
	get id() {
		return this._id;
	}

	checkmate;

	castling;
	//Chessboard
	get chessboard() {
		return this._chessboard;
	}


	//Methods
	convertToCellNotation({ x, y }) {
		return Move.horizontalAxe[x] + Move.verticalAxe[y];
	}
	//Return true if variable fen is ID of cell
	isHorizontalAxe(id) {
		let bool = false;
		for (const key in Move.horizontalAxe) {
			if (Move.horizontalAxe.hasOwnProperty(key) && Move.horizontalAxe[key] == id.toLowerCase()) {
				bool = parseInt(key);
			}
		}
		return bool;
	}
	isVerticalAxe(id) {
		let bool = false;
		for (const key in Move.verticalAxe) {
			if (Move.verticalAxe.hasOwnProperty(key) && Move.verticalAxe[key] == id.toLowerCase()) {
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
	isMoveNotation(chessboard, notation, num) {
		//Pieces to moveNotation
		const PIECES = {
			'': 'p',
			'N': 'n',
			'B': 'b',
			'R': 'r',
			'Q': 'q',
			'K': 'k'
		};
		let mychessboard = [
			['r', 'b', 'n', 'q', 'k', 'n', 'b', 'r'],
			['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
			['', '', '', '', '', '', '', ''],
			['', '', '', '', '', '', '', ''],
			['', '', '', '', '', '', '', ''],
			['', '', '', '', '', '', '', ''],
			['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
			['R', 'B', 'N', 'Q', 'K', 'N', 'B', 'R']
		];
		{
			console.log('is do')
			let bool = true;
			if (chessboard.length == 8) {
				for (let i = 0; i < chessboard.length; i++) {
					if(chessboard[i].length != 8){

						bool = false;
					}
				}
			}
			else{
				bool = false;
			}
			console.log(bool);
			if(bool){
				console.log('chessboard is setted');
				mychessboard = chessboard;
			}
		}
		function doMove(start, end) {
			mychessboard[end.x][end.y] = mychessboard[start.x][start.y];
			mychessboard[start.x][start.y] = '';
			console.log(mychessboard);
		}
		let bool = true;
		let tmp = notation;
		if (tmp && typeof (tmp) == 'string') {
			let piece = '';
			let side = 'white';
			if (num % 2) {
				side = 'black';
			}
			console.log(tmp)
			if (!this.isID(tmp[0] + tmp[1])) {
				let fig;
				for (const key in PIECES) {
					if (tmp[0] == key) {
						tmp = tmp.slice(1);
						fig = PIECES[key];
						break;
					}
				}
				if (fig) {
					piece = fig;
				}
				else {
					bool = false;
				}
			}
			else {
				piece = 'p';
			}
			let start = {};
			let end = this.isID(tmp[0] + tmp[1]);
			return { start, end };
		}
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
		if (this.checkmate && this.checkmate == 1) { console.log("Move.checkmate = " + this.checkmate); node += '+' }
		else if (this.checkmate && (this.checkmate == 'white' || this.checkmate == 'black')) {
			node += '# ';
		}
		return node;
	}
}