export function Ship(name, length) {
  let hits = 0;

  return {
    getName() {
      return name;
    },

    hitShip() {
      hits++;
    },

    isSunk() {
      return hits >= length;
    }
  }
};