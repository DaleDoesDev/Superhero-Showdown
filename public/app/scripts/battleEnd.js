import { player, enemy } from "../models/Character.js";
import setupPostBattle from "./setupPostBattle.js";

export default function battleEnd() {
  let banners = document.querySelectorAll(".portraitBanner");
  let bannerToAppear = "";
  let bannerToDisappear = "";
  let names = document.querySelectorAll(".charName");
  //get state
  const charOneScore = player.getState("score");
  let winStreak = player.getState("winStreak");
  const charTwoScore = enemy.getState("score");

  if (charOneScore > charTwoScore) {
    bannerToAppear = banners[0];
    bannerToDisappear = banners[1];
    winStreak = player.setState("winStreak", (winStreak += 1)); //update state
    names[0].innerHTML += "&nbsp <i class='fas fa-trophy'></i>";
    setupPostBattle("Your character has <strong>WON</strong>!");
  } else if (charOneScore < charTwoScore) {
    bannerToAppear = banners[1];
    bannerToDisappear = banners[0];
    winStreak = player.setState("winStreak", 0); //update state that you've lost
    names[1].innerHTML += "&nbsp <i class='fas fa-trophy'></i>";
    setupPostBattle("Better luck next time.");
  } else
    setupPostBattle(
      "The characters are evenly matched. A draw <strong>does not</strong> reset your win streak."
    );

  if (charOneScore !== charTwoScore) {
    //if there's no draw
    bannerToAppear.textContent = "Winner";
    //make the correct banner appear
    if (bannerToAppear.classList.contains("btnDisappear")) {
      bannerToAppear.classList.remove("btnDisappear");
      bannerToAppear.classList.add("appear");
    }
    //make the other one disappear
    if (bannerToDisappear.classList.contains("appear")) {
      bannerToDisappear.classList.add("btnDisappear");
      bannerToDisappear.classList.remove("appear");
    }
  } else {
    //Match was a draw: Make both banners disappear.
    if (banners[0].classList.contains("appear")) {
      //banner one disappears
      banners[0].classList.add("btnDisappear"),
        banners[0].classList.remove("appear");
    }
    if (banners[1].classList.contains("appear")) {
      //banner two disappears
      banners[1].classList.add("btnDisappear"),
        banners[1].classList.remove("appear");
    }
  }
}
