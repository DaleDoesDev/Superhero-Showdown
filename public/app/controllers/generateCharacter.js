import getCharacterId from "../utils/getCharacterId.js";
import populateBio from "../utils/populateBio.js";
import { player, enemy } from "../models/Character.js";

let test = "";

//'char' (character) is 0 or 1 (player or enemy)
export default async function generateCharacter(num, char) {
  await fetch(
    `https://hosted-cors.herokuapp.com/https://www.superheroapi.com/api/10158616269425862/${num}`
  )
    .then((res) => {
      return res.json(); //extract JSON object
    })
    .then((data) => {
      //Check if character lacking stats:
      if (data.powerstats.combat === "null") {
        //query for a different character.
        generateCharacter(getCharacterId(), char);
      } else {
        //format response data into desired biography structure
        const cachedBioData = {
          name: data.name,
          portrait: data.image.url,
          fullName: data.biography["full-name"],
          alignment: data.biography.alignment,
          base: data.work.base,
          debut: data.biography["first-appearance"],
          publisher: data.biography.publisher,
        };

        populateBio(char, cachedBioData);
        setDialogueColor(cachedBioData.alignment, char);

        //value '1' represents the opponent
        if (char === 1) {
          enemy.setState("battleStats", data.powerstats);
          enemy.setState("biographyInfo", cachedBioData);
        } else {
          player.setState("battleStats", data.powerstats);
          player.setState("biographyInfo", cachedBioData);
        }
      }
    });
}

function setDialogueColor(alignment, char) {
  let dialogue = document.querySelectorAll(".dialogue")[char];
  if (alignment === "good") {
    dialogue.classList.add("blueDialogue");
    dialogue.classList.remove("redDialogue");
  } else if (alignment === "bad") {
    dialogue.classList.add("redDialogue");
    dialogue.classList.remove("blueDialogue");
  }
}
