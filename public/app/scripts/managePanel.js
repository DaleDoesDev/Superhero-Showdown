import comicDialogue from "../models/Dialogue.js";
import qSelect from "../utils/qSelect.js";
import { prepBattleArea } from "./prepBattleArea.js";

export default function managePanel() {
  let dialogue = qSelect(".comic-pane");
  let dialogueTxt = qSelect(".text");
  let btnTwo = qSelect(".btn:nth-of-type(2)");

  let stage = comicDialogue.getState("stage");

  if (stage === 0) {
    //update the left comic dialogue only once
    if (qSelect(".charName").textContent === "") {
      setTimeout(() => {
        dialogue.classList.add("fadeOut");
        setTimeout(() => {
          dialogue.classList.remove("fadeOut");
          dialogue.classList.add("fadeIn");
          dialogueTxt.innerHTML =
            "<p>After you have a character you'd like to see battle, click the <strong>BATTLE</strong> button. </p>";
          btnTwo.classList.remove("hiddenBtn"); //reveal Battle button
          btnTwo.classList.add("appear");
        }, 800);
      }, 600);
    }
  } else if (stage === 1) {
    dialogue.classList.add("fadeOut");
    setTimeout(() => {
      qSelect(".row").classList.add("col");
      setTimeout(prepBattleArea, 1000);
    }, 700);
  }
}
