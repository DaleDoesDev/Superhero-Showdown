import comicDialogue from "../models/Dialogue.js";
import getCharacterId from "../utils/getCharacterId.js";
import qSelect from "../utils/qSelect.js";
import managePanel from "../scripts/managePanel.js";
import generateCharacter from "../controllers/generateCharacter.js";

function beginApp() {
  let btn = qSelect(".btn");
  let btnTwo = qSelect(".btn:nth-of-type(2)");
  let btnTwoClicked = false;
  let stage = comicDialogue.getState("stage");

  btn.classList.add("animate");
  btn.addEventListener("click", () => {
    generateCharacter(getCharacterId(), 0); //'0' is the player/user
    managePanel(); //stage 0
  });

  btnTwo.classList.add("animate");
  btnTwo.addEventListener("click", () => {
    if (!btnTwoClicked) {
      btn.classList.add("btnDisappear");
      btnTwo.classList.add("btnDisappear");
      btnTwo.classList.remove("appear");

      comicDialogue.setState("stage", stage + 1); //increment 'stage' state
      managePanel(); //stage 1
      setTimeout(() => {
        btn.remove();
        btnTwo.remove();
      }, 500);
      btnTwoClicked = true;
    }
  });
}

beginApp();
