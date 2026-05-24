import { Player, Computer } from "./player";

describe("testing functions of the Player factory", () => {
	test("testing if attack works", () => {
		const player1 = Player("One");
		const player2 = Player("Two");
		const enemyBoard = player2.getPlayerBoard();

		player1.playerAttack(enemyBoard, 2, 2);

		expect(enemyBoard.getGrid()[2][2]).toBe("miss");
	});
});

describe("testing functions of the Computer factory", () => {
  test("test of computer basic attack", () => {
    const player = Player();
    const computer = Computer();
    const playerBoard = player.getPlayerBoard();

    computer.computerAttack(playerBoard);
    const attackLocation = computer.getLastAttack();
    const x = attackLocation[0];
    const y = attackLocation[1];

    expect(playerBoard.getGrid()[x][y]).toBe("miss");
  })
})
