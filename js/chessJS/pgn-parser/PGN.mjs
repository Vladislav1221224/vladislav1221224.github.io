import ChessBoard from "../ChessBoard.mjs";
import Move from "../Move.mjs";
import parsePGN from './modules/parser.mjs';
import FEN from "../Fen.mjs";


export default class PortableGameNotation {
	constructor(chessboard, white = { name: '?', elo: '?' }, black = { name: '?', elo: '?' }, event = '?', site = '?', date = '?', round = '?') {
		if (chessboard instanceof ChessBoard) {

			this.chessboard = chessboard;

			this.tags.Event = event;
			this.tags.Date = date;
			this.tags.Site = site;
			this.tags.Round = round;
			this.tags.white = white;
			this.tags.black = black;
			this.tags.FEN = chessboard.moves[0].fen.fen;
			if (chessboard.winner) {
				this.tags.Result = chessboard.winner;
			}
			for (let i = 1; i < chessboard.moves.length; i++) {
				this.moves[i - 1] = chessboard.moves[i].info.notation;
			}
			this.PGN = this.convertObjToPGN(this.tags);
		}
		else if (this.isPGN(chessboard)) {
			let pgn = this.isPGN(chessboard);

			this.PGN = chessboard;
			for (const key in pgn.str) {

				if (this.tags[key]) {

					if (key.toLowerCase() == 'white' || key.toLowerCase() == 'black') {
						this.tags[key].name = pgn.str[key];
					}
					else {
						this.tags[key] = pgn.str[key];
					}

				}
				else {

					if (key == 'WhiteElo') {
						this.tags.white.elo = pgn.str[key];
					}
					else if (key == 'BlackElo') {
						this.tags.black.elo = pgn.str[key];
					}
					else {
						this.tags[key] = pgn.str[key];
					}

				}
			}
			if (pgn.moves) {
				let moves = [];
				for (let i = 0; i < pgn.moves.length; i++) {
					moves[i] = pgn.moves[i];
				}
				this.moves.nodes = moves;
				this.moves.coordinates = this.getXYOfMovesNotationArr();
			}
		}
	}
	tags = {
		Event: '?',
		Site: '?',
		Date: '?',
		Round: '?',
		white: { name: 'white', elo: null },
		black: { name: 'black', elo: null },
		FEN: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w - -",
		Result: '*'
	};

	chessboard = undefined;
	PGN = undefined;
	moves = { nodes: [], coordinates: [] };
	//converter to PGN
	convertObjToPGN(obj) {
		let pgn = '';
		for (const key in obj) {
			if (key == 'white') {
				pgn += '[' + 'White' + ' \"' + obj[key].name + '\"]\n';
				if (obj[key].elo) {
					pgn += '[' + 'WhiteElo' + ' \"' + obj[key].elo + '\"]\n';
				}
			}
			else if (key == 'black') {
				pgn += '[' + 'Black' + ' \"' + obj[key].name + '\"]\n';
				if (obj[key].elo) {
					pgn += '[' + 'BlackElo' + ' \"' + obj[key].elo + '\"]\n';
				}
			}
			else {
				pgn += '[' + key + ' \"' + obj[key] + '\"]\n';
			}
		}
		{
			let tmp = '';
			for (let i = 0; i < this.moves.length; i++) {
				if (!(i % 2)) {
					tmp += `${((i) / 2) + 1}. `;
				}
				tmp += this.moves[i] + ' ';
			}
			pgn += tmp;
		}
		pgn += this.tags.Result;
		return pgn;
	}
	isPGN(pgn) {
		let result = parsePGN(pgn);
		if (result) {
			return result;
		}
		else {
			return false;
		}
	}
	getXYOfMovesNotationArr() {
		let XYmoves = [];
		const brd = FEN.fenToChessboardArr(this.tags.FEN);

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
		//Is correct board
		{
			console.log('is do')
			let bool = true;
			if (brd.length == 8) {
				let amountKingsW = 0;
				let amountKingsB = 0;

				for (let i = 0; i < brd.length; i++) {
					if (brd[i].length != 8) {

						bool = false;
					}
					else {
						for (let j = 0; j < brd.length; j++) {
							let isPiece = FEN.isPieceFen(brd[i][j].toLowerCase());
							if (!isPiece) {
								bool = false;
								break;
							}
							else {
								if (isPiece == 'k') {
									if (isPiece == isPiece.toLowerCase()) {
										amountKingsB++;
									}
									else if (isPiece == isPiece.toUpperCase()) {
										amountKingsW++;
									}
								}
							}
						}
					}
				}
				if (amountKingsW != 1 && amountKingsB != 1) {
					bool = false;
				}
			}
			else {
				bool = false;
			}
			console.log(bool);
			if (bool) {
				console.log('chessboard is setted');
				mychessboard = brd;
			}
		}

		function doMove(start, end) {
			mychessboard[end.y][end.x] = mychessboard[start.y][start.x];
			mychessboard[start.y][start.x] = '';
			console.log(mychessboard);
		}
		for (let k = 0; k < this.moves.nodes.length; k++) {
			let bool = true;

			let start = {};
			let end = {};
			let fen = '';
			let caption = false;

			const notation = this.moves.nodes[k];

			let tmp = notation;

			if (tmp && typeof (tmp) == 'string') {
				let piece = '';
				let side = 'white';
				if (k % 2) {
					side = 'black';
				}
				function getFigure(fig, side) {
					if (side == 'white') {
						return fig.toUpperCase();
					}
					else if (side == "black") {
						return fig.toLowerCase();
					}
					else {
						console.error("side is not defined");
					}
				}

				console.log(tmp)
				if (!FEN.isID(tmp[0] + tmp[1])) {
					console.log('1. ' + tmp + ' = isNotID');

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
						console.log(piece);
					}
					else {
						bool = false;
					}
				}
				else {
					console.log('1. ' + tmp + ' is pawn');
					piece = 'p';
				}
				console.log('2. ' + tmp);
				end = FEN.isID(tmp[0] + tmp[1]);
				if (piece.toLowerCase() == 'p') {
					start.x = FEN.isHorizontalAxe(tmp[0]);
				}
				if (mychessboard[end.x][end.y]) {
					caption = true;
				}
				console.log('tmp = ' + tmp);
				if (piece.toLowerCase() == 'p') {
					console.log('start is process ' + side);

					const endPosition = end;

					mychessboard[endPosition.y][endPosition.x] += '0';
					console.log(mychessboard);
					mychessboard[endPosition.y][endPosition.x] = mychessboard[endPosition.y][endPosition.x].slice(0, 1);
					function destination(caption, j) {
						function mathPawn(y) {
							if (side == 'white') {
								y = y;
							}
							else if (side == 'black') {
								y = -y;
							}
							return y;
						}

						let xx, yy;
						if (!caption) {
							xx = endPosition.x;
							yy = endPosition.y + mathPawn(j + 1);
						}
						else if (caption) {
							xx = start.x;
							yy = endPosition.y + mathPawn(1);
						}
						return { xx, yy };
					}
					function isFirstMove() {
						let y = 1;
						if ((endPosition.y == 3 && side == 'black') || (endPosition.y == 4 && side == 'white')) {
							y = 2;
						}
						return y;
					}
					let isTrue = false;
					if (!caption) {
						let max = isFirstMove();
						for (let j = 0; j < max; j++) {
							let pos = destination(false, j);
							console.log(pos);
							console.log(mychessboard);
							if (pos.xx >= 0 && pos.xx < 8 && pos.yy >= 0 && pos.yy < 8) {
								console.log(side);
								if (mychessboard[pos.yy][pos.xx] === getFigure('p', side)) {
									console.log('is defined!!!');
									start = { x: pos.xx, y: pos.yy };
									isTrue = true;
									break;
								}
							}
						}
					}
					else if (caption) {
						let pos = destination(true, 1);
						console.log(pos);
						if (pos.xx >= 0 && pos.xx < 8 && pos.yy >= 0 && pos.yy < 8) {
							if (mychessboard[pos.xx][pos.yy] === getFigure('p', side)) {
								console.log('is defined!!!');
								start = { x: pos.xx, y: pos.yy };
								isTrue = true;
								break;
							}
						}
					}
					if (!isTrue) {
						bool = false;
						break;
					}
				}
				else if (piece == 'n') {

				}
				else if (piece == 'b') {

				}
				else if (piece == 'r') {

				}
				else if (piece == 'q') {

				}
				else if (piece == 'k') {

				}
				console.log("bool = " + bool);
				console.log('is moves setted')
				console.log(start);
				console.log(end);
				doMove(start, end);
				console.log("CONVERTING IS DO")
				fen = FEN.chessBoardArrayToFEN(mychessboard, side, '-', '-');
				XYmoves[k] = { start, end, fen };
			}

		}
		return XYmoves;
	}
}