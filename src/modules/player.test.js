import { Player } from "./player";

describe("testing all individual functions inside the Player factory", () => {
  const player1 = Player("One");
  const player2 = Player("Two");
  const enemyBoard = player2.getBoard();
  player1.attack(enemyBoard, 2, 2);

  test("testing if attack works", () => {
    expect(enemyBoard.getGrid()[2][2]).toBe("miss");
  });
});