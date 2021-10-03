import generateCharacter from "../controllers/generateCharacter.js";
import clearCharUI from "../utils/clearCharUi.js";
import qSelect from "../utils/qSelect.js";
import getCharacterId from "../utils/getCharacterId.js";
import { player, enemy } from "../models/Character.js";
import comicDialogue from "../models/Dialogue.js";
import { displayBattleStat } from "./handleBattleStats.js";

export function prepBattleArea() {
  let clicked = false;
  let battleArea = document.createElement("div");
  let row = qSelect(".row");

  row.classList.remove("col");
  row.classList.add("colFinalState");

  let newRow = row.cloneNode(true);
  let middleRow = row.cloneNode(false);
  let middleDialogue = qSelect(".comic-pane").cloneNode(true);

  middleDialogue.classList.add("midPanel");
  battleArea.classList.add("battleArea");
  document.body.appendChild(battleArea);
  battleArea.append(row, middleRow, newRow); //append multiple children

  clearCharUI(1); //clear biography info from character two's UI
  generateCharacter(getCharacterId(), 1); //'1' is the opponent

  setTimeout(() => {
    document.body.insertBefore(middleDialogue, battleArea);
    middleDialogue.classList.remove("fadeInLeft", "fadeOutLeft");
    middleDialogue.classList.add("fadeInTop");
    document.querySelectorAll(".text p")[1].innerHTML =
      "<p>The characters' <strong>powerstats</strong> will now be compared one at a time, rewarding points to the character that has a higher value for that stat. Click <strong>BEGIN</strong> to proceed.</p>";
    setTimeout(() => {
      let newBtn = document.createElement("button");
      newBtn.classList.add("btn", "animate", "battleBtn", "appear");
      newBtn.innerHTML = "<strong>BEGIN</strong>";
      middleRow.appendChild(newBtn);
      newBtn.addEventListener("click", () => {
        if (clicked === false) {
          middleDialogue.classList.add("fadeOutTop");
          newBtn.classList.add("btnDisappear");
          newBtn.classList.remove("appear");
          setTimeout(updateBattleUi, 400);
          clicked = true;
        }
      });
    }, 1200);
  }, 400);
}

export function updateBattleUi() {
  let lists = document.querySelectorAll("ul");
  //get state
  const charOneStats = player.getState("battleStats");
  const statsDisplayed = comicDialogue.getState("statsDisplayed");
  const icons = comicDialogue.getState("icons");

  qSelect(".btn:nth-of-type(1)").remove();
  //fade out both characters' bio info
  lists[0].classList.add("btnDisappear");
  lists[1].classList.add("btnDisappear");
  //prep both characters' panes for battle-stat reveal:
  setTimeout(() => {
    lists[0].innerHTML = '<li>Score: <span class="charScore"></span></li>';
    lists[0].classList.remove("btnDisappear");
    lists[1].innerHTML = '<li>Score: <span class="charTwoScore"></span></li>';
    lists[1].classList.remove("btnDisappear");
    const charOneScore = player.getState("score");
    const charTwoScore = enemy.getState("score");
    qSelect(".charScore").textContent = charOneScore;
    qSelect(".charTwoScore").textContent = charTwoScore;

    //begin the process of showing and comparing battle stats
    displayBattleStat(
      Object.keys(charOneStats)[statsDisplayed],
      icons[statsDisplayed]
    );
  }, 600);
}
