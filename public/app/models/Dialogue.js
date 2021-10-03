import StateObject from "./StateObject.js";

class Dialogue extends StateObject {
  constructor() {
    super();
    this.state = {
      stage: 0,
      statsDisplayed: 0,
      icons: [
        //static arr of font awesome icons
        "fa-brain",
        "fa-dumbbell",
        "fa-running",
        "fa-shield-alt",
        "fa-burn",
        "fa-fist-raised",
      ],
    };
  }
}

const comicDialogue = new Dialogue();

export default comicDialogue;
