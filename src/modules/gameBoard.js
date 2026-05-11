import Ship from "./ship";

export function Gameboard() {
	const board = [];

	for (let i = 0; i < 10; i++) {
		const row = [];
		for (let j = 0; row.length < 10; j++) {
			row.push(null);
		}

		board.push(row);
	}

	return {
		placeShip: (ship, x, y, orientation) => {
      const length = ship.getLength();

      // safety checks for invalid placements
			if (x < 0 || x > 9 || y < 0 || y > 9) {
				throw new RangeError("Coordinates X and Y must be between 0-9");
			}
      for (let i = 0; i < length; i++) {
        const targetRow = orientation === 'vertical' ? x + i : x;
        const targetCol = orientation === 'horizontal' ? y + i : y;

        if (board[targetRow][targetCol] !== null) {
          throw new RangeError("Cannot place ship: Slot already occupied!");
        }
      }

      // find the location and add ship
			if (orientation === "horizontal") {
				if (y + length >= 10) {
					throw new RangeError(
						"Coordinate Y must remain between 0-9",
					);
				}
				for (let i = 0; i < length; i++) {
					board[x][y + i] = ship;
				}
			}
			if (orientation === "vertical") {
				if (x + length >= 10) {
					throw new RangeError(
						"Coordinate X must remain between 0-9",
					);
				}
				for (let i = 0; i < length; i++) {
					board[x + i][y] = ship;
				}
			}
		},

		getBoard: () => board,
	};
}
