
export class Cell {
	constructor(pos, color, chessboard) {
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
	drawDestination(value,side) {
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
			console.log('check is draw')
			let player;
			for (let i = 0; i < 2; i++) {
				if (this.chessboard.player[i].side == side) {
					player = this.chessboard.player[i];
					console.log('player is getted ' + this.chessboard.player[i].side)
				}
			}
			if (player) {
				console.log('draw the checkArray of ' + player.side)
				console.log(this.html)
				player.checkMateArray[this.position.y][this.position.x] = 1;
				console.log(player.checkMateArray[this.position.y][this.position.x])
			}
		}
		else {
			console.error('Not defined this \'value\'');
			return 0;
		}
	}
	drawCell(pos, color) {
		this.position = pos;
		this.ID = pos;
		let innerElements = '';
		if (color == 'white' || color == 'black') { }
		else { console.error('Error: color must be \'white\' or \'black\''); }

		if (pos.x === 0) {
			innerElements += `<div class="notation" id="number">${this.ID[1]}</div>`;
		}
		if (pos.y === 7) {
			innerElements += `<div class="notation" id="letter">${this.ID[0]}</div>`;
		}
		this.html = `<div class="square ${color}-square" id="${this.ID}">${innerElements}</div>`;
	}
}