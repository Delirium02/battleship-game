import Ship from "./ship";

function Gameboard() {
	const board = [];

	for (let i = 0; i < 10; i++) {
		const row = [];
		for (let j = 0; row.length < 10; j++) {
			row.push(null);
		}

		board.push(row);
	}

	return {
		getBoard: () => board,
	};
}
