import ChessBoard from "../ChessBoard.mjs";
import Move from "../Move.mjs";
import parsePGN from './modules/parser.mjs';

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
			this.tags.FEN = chessboard.moves[0].fen;
			if (chessboard.winner) {
				this.tags.Result = chessboard.winner;
			}
			for (let i = 1; i < chessboard.moves.length; i++) {
				console.log(chessboard.moves[i]);
				this.moves[i - 1] = chessboard.moves[i].info.notation;
			}
			this.PGN = this.convertObjToPGN(this.tags);
			console.log(this.PGN);
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
				this.moves = moves;
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
	moves = [];
	//converter to PGN
	convertObjToPGN(obj) {
		let pgn = '';
		for (const key in obj) {
			if (key == 'white') {
				pgn += '[' + 'White' + ' \"' + obj[key].name + '\"]\n';
				pgn += '[' + 'WhiteElo' + ' \"' + obj[key].elo + '\"]\n';
			}
			else if (key == 'black') {
				pgn += '[' + 'Black' + ' \"' + obj[key].name + '\"]\n';
				pgn += '[' + 'BlackElo' + ' \"' + obj[key].elo + '\"]\n';
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
		console.log(pgn);
		return pgn;
	}
	isPGN(pgn) {
		let result = parsePGN(pgn);
		console.log(result);
		if (result) {
			return result;
		}
		else {
			return false;
		}
	}
}