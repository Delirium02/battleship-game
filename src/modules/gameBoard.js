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
			const coords = [];

			// Range checks
			if (x < 0 || x > 9 || y < 0 || y > 9) {
				throw new RangeError(
					"Cannot place ship: Coordinates must be between 0-9",
				);
			}

			if (orientation === "vertical" && x + length > 10) {
				throw new RangeError(
					"Out of bounds: Ship is too long for this column",
				);
			}
			if (orientation === "horizontal" && y + length > 10) {
				throw new RangeError(
					"Out of bounds: Ship is too long for this row",
				);
			}

			// Check the placement area is empty
			for (let i = 0; i < length; i++) {
				let checkX = orientation === "vertical" ? x + i : x;
				let checkY = orientation === "horizontal" ? y + i : y;
				coords.push({ x: checkX, y: checkY });

				if (grid[checkX][checkY] !== null) {
					throw new Error("Cannot place ship: Slot already occupied");
				}

				for (let j = -1; j <= 1; j++) {
					for (let k = -1; k <= 1; k++) {
						let adjX = checkX + j;
						let adjY = checkY + k;

						if (adjX >= 0 && adjX <= 9 && adjY >= 0 && adjY <= 9) {
							if (grid[adjX][adjY] !== null) {
								throw new Error(
									"Cannot place ship: Too close to another ship",
								);
							}
						}
					}
				}
			}

			// Place ship
			for (let i = 0; i < length; i++) {
				if (orientation === "vertical") grid[x + i][y] = ship;
				if (orientation === "horizontal") grid[x][y + i] = ship;
			}

			ships.push({
				ship: ship,
				coords: coords,
			});
		},

		receiveAttack: function (x, y) {
			if (x < 0 || x > 9 || y < 0 || y > 9) {
				throw new RangeError(
					"Cannot attack: Coordinates must be between 0-9",
				);
			}

			if (grid[x][y] !== null) {
				const cellValue = grid[x][y];
				cellValue.hit();

				if (cellValue.isSunk()) {
					const shipData = ships.find((entry) => entry.ship === cellValue);

					for (const { x: r, y: c } of shipData.coords) {
						for (let i = -1; i <= 1; i++) {
							for (let j = -1; j <= 1; j++) {
								let adjX = r + i;
								let adjY = c + j;

								if (
									adjX >= 0 &&
									adjX <= 9 &&
									adjY >= 0 &&
									adjY <= 9 &&
									grid[adjX][adjY] === null
								) {
									grid[adjX][adjY] = "miss";
								}
							}
						}
					}
				}

				grid[x][y] = "hit";
			} else {
				grid[x][y] = "miss";
			}

			const square = grid[x][y];
			return square;
		},

		allSunk: function () {
			return ships.every((entry) => entry.ship.isSunk());
		},
	};
}
