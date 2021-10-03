import generateCharacter from "../controllers/generateCharacter.js";
import qSelect from "../utils/qSelect.js";
import populateBio from "../utils/populateBio.js";
import getCharacterId from "../utils/getCharacterId.js";
import { updateBattleUi } from "./prepBattleArea.js";
import { player, enemy } from "../models/Character.js";
import comicDialogue from "../models/Dialogue.js";

export default function setupPostBattle(msg) {
  let midPanel = qSelect(".stat");
  let midRow = qSelect("row:nth-of-type(2)");
  let ulElements = document.querySelectorAll("ul");
  let bannerElements = document.querySelectorAll(".portraitBanner");
  let defaultHTML =
    "<li>Full Name: <span class='fullName'></span></li> <li>Alignment: <span class='alignment'></span></li> <li>Base: <span class='base'></span> </li> <li>First Appearance: <span class='firstAppear'></span></li> <li>Publisher: <span class='publisher'></span></li>";

  //get state
  let winStreak = player.getState("winStreak");
  let playerBioInfo = player.getState("biographyInfo");

  midPanel.classList.remove("stat", "statPanel", "fadeOutTop");
  midPanel.classList.add("fadeInTop");
  document.querySelectorAll(
    ".text p"
  )[1].innerHTML = `<p>${msg}<br>Win Streak: ${winStreak}</p>`;

  setTimeout(() => {
    let newBtn = document.createElement("button");
    let newBtnTwo = document.createElement("button");
    let nextOpponentBtnClicked = false;

    //style and attach newly created DOM buttons
    newBtn.classList.add("btn", "animate", "battleBtnTwo", "appear");
    newBtn.innerHTML = "<strong>NEXT OPPONENT</strong>";
    midRow.appendChild(newBtn);

    newBtnTwo.classList.add("btn", "animate", "battleBtnTwo", "appear", "top");
    newBtnTwo.innerHTML = "<strong>RETURN HOME</strong>";
    midRow.appendChild(newBtnTwo);

    //page refresh on 'return home'
    newBtnTwo.addEventListener("click", () => (location.href = "index.html"));

    newBtn.addEventListener("click", () => {
      if (nextOpponentBtnClicked === false) {
        //clear opponent's name and image
        document.querySelectorAll(".charName")[1].textContent = "";
        document.querySelectorAll(".portrait")[1].src =
          "images/unknownChar.jpg";

        //reset both character's data list
        ulElements[0].innerHTML = defaultHTML;
        ulElements[1].innerHTML = defaultHTML;

        //hide any banners
        for (let el of bannerElements) {
          if (el.classList.contains("appear")) {
            el.classList.add("btnDisappear");
            el.classList.remove("appear");
          }
        }

        generateCharacter(getCharacterId(), 1); //api call for a new opponent
        populateBio(0, playerBioInfo); //Re-render player bio info from state cache

        midPanel.classList.add("fadeOutTop");
        midPanel.classList.remove("fadeInTop");
        newBtn.classList.add("btnDisappear");
        newBtnTwo.classList.add("btnDisappear");
        newBtn.classList.remove("appear"), newBtnTwo.classList.remove("appear");

        //reset state values for a new battle round
        player.setState("score", 0);
        enemy.setState("score", 0);
        comicDialogue.setState("statsDisplayed", 0);

        setTimeout(() => {
          //display pre-battle message again
          newBtn.remove(), newBtnTwo.remove();
          midPanel.classList.add("fadeInTop");
          midPanel.classList.remove("fadeOutTop");
          document.querySelectorAll(".text p")[1].innerHTML =
            "<p>The characters' <strong>powerstats</strong> will now be compared one at a time, rewarding points to the character that has a higher value for that stat. Click <strong>BEGIN</strong> to proceed.</p>";
          setTimeout(() => {
            //recreate a 'begin battle' button
            let newestBtnClicked = false;
            let newestBtn = document.createElement("button");
            newestBtn.classList.add("btn", "animate", "battleBtn", "appear");
            newestBtn.innerHTML = "<strong>BEGIN</strong>";

            //reset popups' text from "winner" (their text is hidden until displayed)
            bannerElements[0].innerText = "ADVANTAGE";
            bannerElements[1].innerText = "ADVANTAGE";

            midRow.appendChild(newestBtn);
            newestBtn.addEventListener("click", () => {
              if (newestBtnClicked === false) {
                midPanel.classList.add("fadeOutTop");
                midPanel.classList.remove("fadeInTop");
                newestBtn.classList.add("btnDisappear");
                newestBtn.classList.remove("appear");

                //begin the battle process again
                setTimeout(updateBattleUi, 400);
                newestBtnClicked = true;
              }
            }); //end event listener
          }, 1200);
        }, 600);
        nextOpponentBtnClicked = true;
      } //end var check
    });
  }, 1100);
}
