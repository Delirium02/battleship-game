export function Ship(name, length) {
  let hits = 0;

  return {
    getName() {
      return name;
    },

    hit() {
      hits++;
    },

    // added getHits() to return number of hits;
    getHits() {
      return hits;
    },

    getLength() {
      return length;
    },

    isSunk() {
      return hits >= length;
    }
  }
};