
export class Cell {
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
	set html(value) {
		this._html = value;
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
			console.error('is draw')
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
		let innerElements = '';
		if (color == 'white' || color == 'black') { }
		else { console.error('Error: color must be \'white\' or \'black\''); }

		if (pos.y == 7) {
			innerElements += `<div class="notation" id="letter">${this.ID[0]}</div>`;
		}
		if (pos.x == 0) {
			innerElements += `<div class="notation" id="number">${this.ID[1]}</div>`;
		}
		this.html = `<div class="square ${color}-square" id="${this.ID}">${innerElements}</div>`;
	}
}