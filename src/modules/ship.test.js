import { Ship } from "./ship";

describe("Testing Ship factory function", () => {
	// getName() test
	test("get the name of the ship", () => {
		const ship = Ship("Destroyer", 2);
		expect(ship.getName()).toBe("Destroyer");
	});

	// getHits() test
	test("hits counter goes up when ship is hit", () => {
		const ship = Ship("Destroyer", 2);
		ship.hit();
		expect(ship.getHits()).toBe(1);
	});

	// isSunk() tests
	test("isSunk should return true if the ship is sunk and false if not", () => {
		const ship = Ship("Cruiser", 5);
		ship.hit();
		ship.hit();
		ship.hit();
		ship.hit();
		ship.hit();
		expect(ship.isSunk()).toBe(true);
	});

	test("does not sink if hits are less than length", () => {
		const ship = Ship("Cruiser", 5);
		ship.hit();
		ship.hit();
		expect(ship.isSunk()).toBe(false);
	});
});
