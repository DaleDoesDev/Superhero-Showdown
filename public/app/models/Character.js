import StateObject from "./StateObject.js";

class Character extends StateObject {
  constructor(name) {
    super();
    this.state = {
      name,
      score: 0,
      winStreak: 0,
      battleStats: {},
      biographyInfo: {},
    };
  }
}

const player = new Character("Player");
const enemy = new Character("Enemy");

export { player, enemy };
