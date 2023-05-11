
export default class Cell {
	constructor(pos, color, chessboard) {
		this.position = {x:null,y:null};
		if (typeof pos.x == 'number' && typeof pos.y == 'number') {
			if (color == 'white' || color == 'black') {
				this._chessboard = chessboard;
				this.drawCell(pos, color);
			}
			else { console.error('Error: color must be \'white\' or \'black\''); }
		}
		else { console.error('Error: pos must have elements {x,y}'); }
	}
	//ID list
	static IDNUMBER = ['8', '7', '6', '5', '4', '3', '2', '1'];
	static IDLETTER = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];


	get chessboard() {
		return this._chessboard;
	}

	set ID(value) {
		this._ID = Cell.IDLETTER[value.x] + Cell.IDNUMBER[value.y];
	}
	get ID() {
		return this._ID;
	}
	set position(value) {
		this._position = value;
	}
	get position() {
		return this._position;
	}
	get html() {
		return this._html;
	}
	set piece(value) {
		this._piece = value;
	}
	get piece() {
		return this._piece;
	}
	drawDestination(value,piece) {
		if (value == 'set' || value == 'eat') {
			let moveDestination = document.createElement('div');
			if (value == 'eat') {
				moveDestination.className = 'move-destination circle';
			}
			else if (value == 'set') {
				moveDestination.className = 'move-destination';
			}
			this.html.appendChild(moveDestination);
		}
		else if (value == 'check') {
			piece.checkMateArray[this.position.x][this.position.y] = 1;
		}
		else {
			console.error('Not defined this \'value\'');
			return 0;
		}
	}
	drawCell(pos, color) {
		this.position = pos;
		this.ID = this.position;
		let cell = document.createElement('div');
		let innerElements = '';
		if (color == 'white' || color == 'black') {			cell.className = `square ${color}-square`;
		cell.id = this.ID; }
		else { console.error('Error: color must be \'white\' or \'black\''); }

		if ((this.chessboard.chessBoardSide == 'white' && pos.y == 7) || (this.chessboard.chessBoardSide == 'black' && pos.y == 0)) {
			innerElements += `<div class="notation" id="letter">${this.ID[0]}</div>`;
		}
		if ((this.chessboard.chessBoardSide == 'white' && pos.x == 0) || (this.chessboard.chessBoardSide == 'black' && pos.x == 7)) {
			innerElements += `<div class="notation" id="number">${this.ID[1]}</div>`;
		}
		this._html = cell;
		this._html.innerHTML = innerElements;
	}
}
