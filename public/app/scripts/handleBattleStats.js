import qSelect from "../utils/qSelect.js";
import comicDialogue from "../models/Dialogue.js";
import { player, enemy } from "../models/Character.js";
import battleEnd from "./battleEnd.js";

/* Battle: Character stats are displayed and compared one-by-one.
  This function loops with compareStatValues for each battle stat.
*/
export function displayBattleStat(stat, icon) {
  let unorderedLists = document.querySelectorAll("ul");
  let banners = document.querySelectorAll(".portraitBanner");
  let middleDialogue = document.querySelectorAll(".comic-pane")[1];
  let displayStat = stat.charAt(0).toUpperCase() + stat.slice(1);
  let classOne = `charOne${displayStat}`;
  let classTwo = `charTwo${displayStat}`;

  let charOneStats = player.getState("battleStats");
  let charTwoStats = enemy.getState("battleStats");

  //create battle dialogue
  document.querySelectorAll(
    ".text p"
  )[1].innerHTML = `<p><strong>${displayStat} </strong> &nbsp <i class='fas ${icon}'></i></p>`;

  middleDialogue.classList.add("fadeInTop", "statPanel", "stat");
  middleDialogue.classList.remove("fadeOutTop", "fadeIn", "fadeOut");
  banners[0].classList.remove("appear");
  banners[1].classList.remove("appear");

  setTimeout(() => {
    middleDialogue.classList.remove("fadeInTop");
    middleDialogue.classList.add("fadeOutTop");

    //update stat lists as the stats are revealed
    unorderedLists[0].innerHTML += `<li>${displayStat}: <span class="${classOne}"></span></li>`;
    unorderedLists[1].innerHTML += `<li>${displayStat}: <span class="${classTwo}"></span></li>`;
    qSelect("." + classOne).textContent = charOneStats[stat];
    qSelect("." + classTwo).textContent = charTwoStats[stat];

    compareStatValues(charOneStats, charTwoStats);
  }, 1500);
}

function compareStatValues(charOneStats, charTwoStats) {
  //get state
  const icons = comicDialogue.getState("icons");
  let statsDisplayed = comicDialogue.getState("statsDisplayed");

  let banners = document.querySelectorAll(".portraitBanner");
  let advantage = 0;

  let charOneStatValue = Number(
    charOneStats[Object.keys(charOneStats)[statsDisplayed]]
  );
  let charTwoStatValue = Number(
    charTwoStats[Object.keys(charTwoStats)[statsDisplayed]]
  );

  //compare character stats
  if (charOneStatValue > charTwoStatValue) {
    banners[0].classList.add("appear");
    banners[0].classList.remove("btnDisappear");
    advantage = 0;

    let charOneScore = player.getState("score");
    charOneScore = player.setState("score", (charOneScore += 50));

    qSelect(".charScore").textContent = charOneScore;
  } else if (charOneStatValue < charTwoStatValue) {
    banners[1].classList.add("appear");
    banners[1].classList.remove("btnDisappear");
    advantage = 1;

    let charTwoScore = enemy.getState("score");
    charTwoScore = enemy.setState("score", (charTwoScore += 50));

    qSelect(".charTwoScore").textContent = charTwoScore;
  } else advantage = 2; //'2' represents no reward for either character

  statsDisplayed = comicDialogue.setState(
    "statsDisplayed",
    (statsDisplayed += 1)
  );

  setTimeout(() => {
    if (statsDisplayed < Object.keys(charOneStats).length) {
      displayBattleStat(
        Object.keys(charOneStats)[statsDisplayed],
        icons[statsDisplayed]
      );

      if (advantage === 0) banners[0].classList.add("btnDisappear");
      else if (advantage === 1) {
        banners[1].classList.add("btnDisappear");
      }
    } else battleEnd();
  }, 1200);
}
