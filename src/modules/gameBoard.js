import { Ship } from "./ship";

export function Gameboard() {
	const grid = [];
	const ships = [];

	for (let i = 0; i < 10; i++) {
		const row = [];
		for (let j = 0; row.length < 10; j++) {
			row.push(null);
		}

		grid.push(row);
	}

	return {
		// Create an empty grid
		getGrid: function () {
			return grid;
		},

		// Place ships
		placeShip: function (ship, x, y, orientation = "vertical") {
			const length = ship.getLength();

			// Range checks
			if (x < 0 || x > 9 || y < 0 || y > 9) {
				throw new RangeError(
					"Cannot place ship: Coordinates must be between 0-9",
				);
			}

			if (orientation === "vertical" && x + length >= 10) {
				throw new RangeError(
					"Out of bounds: Ship is too long for this column",
				);
			}
			if (orientation === "horizontal" && y + length >= 10) {
				throw new RangeError(
					"Out of bounds: Ship is too long for this row",
				);
			}

			// Check the placement area is empty
			for (let i = 0; i < length; i++) {
				let checkX = orientation === "vertical" ? x + i : x;
				let checkY = orientation === "horizontal" ? y + i : y;

				if (grid[checkX][checkY] !== null) {
					throw new Error("Cannot place ship: Slot already occupied");
				}
			}

			// Place ship
			for (let i = 0; i < length; i++) {
				if (orientation === "vertical") grid[x + i][y] = ship;
				if (orientation === "horizontal") grid[x][y + i] = ship;
			}

			ships.push(ship);
		},

		receiveAttack: function (x, y) {
			if (x < 0 || x > 9 || y < 0 || y > 9) {
				throw new RangeError(
					"Cannot attack: Coordinates must be between 0-9",
				);
			}

			let square = grid[x][y];

			if (square === "hit" || square === "miss") {
				throw new Error("This square has already been attacked");
			}

			if (square !== null) {
				square.hit();
				square = "hit";				
			} else {
				square = "miss";				
			}

			return square;
		},

		allSunk: function () {
			return ships.every((ship) => ship.isSunk());
		},
	};
}
