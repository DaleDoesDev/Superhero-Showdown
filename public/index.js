let charOneScore = 0, charTwoScore = 0, winStreak = 0;
let playerCharacter = {}; //cache player bio information
let charOneStats = {}, charTwoStats = {};

//initial setup, immediately invoked
(function beginApp() {
    let btn = document.querySelector('.btn'), btnTwo = document.querySelector('.btn:nth-of-type(2)')
    let btnTwoClicked = false;

    btn.classList.add('animate')
    btn.addEventListener("click", () => {
            generateCharacter(getCharacterId(), 0);
            managePanel(0); //stage 0
        }) 

    btnTwo.classList.add('animate')
    btnTwo.addEventListener("click", () => {
        if (!btnTwoClicked) {
            btn.classList.add('btnDisappear'), btnTwo.classList.add('btnDisappear')
            btnTwo.classList.remove('appear')
            managePanel(1); //stage 1
            setTimeout(()=> {
                btn.remove(), btnTwo.remove();
            }, 500)
            btnTwoClicked = true;
        }
    }) 
})();

function getCharacterId() {
    return Math.floor(Math.random()*731)+1; //Character IDs. Include 731, exclude 0.
}

const prepBattleArea = () => {
    let battleArea = document.createElement('div'),
    row = document.querySelector('.row');

    row.classList.remove('col'), row.classList.add('colFinalState');

    let newRow = row.cloneNode(true),
    middleRow = row.cloneNode(false),
    middleDialogue = document.querySelector('.comic-pane').cloneNode(true);

    middleDialogue.classList.add('midPanel');

    battleArea.classList.add('battleArea');
    document.body.appendChild(battleArea);
    battleArea.appendChild(row), battleArea.appendChild(middleRow), battleArea.appendChild(newRow);

    clearCharUI(1); //clear data from the newly-generated character two so that they briefly appear blank
    generateCharacter(getCharacterId(), 1);

    setTimeout(()=> {
        document.body.insertBefore(middleDialogue, battleArea)
        middleDialogue.classList.remove('fadeInLeft', 'fadeOutLeft')
        middleDialogue.classList.add('fadeInTop')
        document.querySelectorAll('.text p')[1].innerHTML = "<p>The characters' <strong>powerstats</strong> will now be compared one at a time, rewarding points to the character that has a higher value for that stat. Click <strong>BEGIN</strong> to proceed.</p>"
        setTimeout(()=> {
            let clicked = false;
            newBtn = document.createElement('button')
            newBtn.classList.add('btn', 'animate', 'battleBtn', 'appear')
            newBtn.innerHTML = "<strong>BEGIN</strong>"
            middleRow.appendChild(newBtn)
            newBtn.addEventListener('click', () => {
                if (clicked === false) {
                    middleDialogue.classList.add('fadeOutTop')
                    newBtn.classList.add('btnDisappear')
                    newBtn.classList.remove('appear')
                    setTimeout(updateBattleUi, 400);
                    clicked = true;
                }
            })
        }, 1200);
    }, 400);
}

//Battle: Character stats are displayed and compared one-by-one.
const displayBattleStat = (statsShown = 0, stat, icon) => {
    let unorderedLists = document.querySelectorAll('ul');
    let banners = document.querySelectorAll('.portraitBanner');
    let middleDialogue = document.querySelectorAll('.comic-pane')[1];

    let advantage = 0;
    let displayStat = (stat.charAt(0).toUpperCase() + stat.slice(1));
    let classOne = `charOne${displayStat}`, classTwo = `charTwo${displayStat}`;

    //create battle dialogue
    document.querySelectorAll('.text p')[1].innerHTML = `<p><strong>${displayStat} </strong> &nbsp <i class='fas ${icon}'></i></p>`;
    
    middleDialogue.classList.add('fadeInTop', 'statPanel', 'stat');
    middleDialogue.classList.remove('fadeOutTop','fadeIn', 'fadeOut');
    banners[0].classList.remove('appear'), banners[1].classList.remove('appear');
    
    setTimeout(()=> {     
        middleDialogue.classList.remove('fadeInTop'), middleDialogue.classList.add('fadeOutTop');
        //update stat lists as the stats are revealed
        unorderedLists[0].innerHTML +=`<li>${displayStat}: <span class="${classOne}"></span></li>`;
        unorderedLists[1].innerHTML +=`<li>${displayStat}: <span class="${classTwo}"></span></li>`;
        document.querySelector('.'+classOne).textContent = charOneStats[stat];
        document.querySelector('.'+classTwo).textContent = charTwoStats[stat];

        let charOneStatValue = Number(charOneStats[Object.keys(charOneStats)[statsShown]]);
        let charTwoStatValue = Number(charTwoStats[Object.keys(charTwoStats)[statsShown]]);

        //compare character stats
        if (charOneStatValue > charTwoStatValue) {
            banners[0].classList.add('appear'), banners[0].classList.remove('btnDisappear');
            advantage = 0;
            charOneScore += 50;
            document.querySelector('.charScore').textContent = charOneScore;
        } else if (charOneStatValue < charTwoStatValue) {
            banners[1].classList.add('appear'), banners[1].classList.remove('btnDisappear');      
            advantage = 1; 
            charTwoScore += 50;   
            document.querySelector('.charTwoScore').textContent = charTwoScore;
        } else advantage = 2 //this value represents no score point reward for either character
            
        statsShown++;

        setTimeout(()=> {
            if (statsShown < Object.keys(charOneStats).length) { 
                updateBattleUi(statsShown) //proceed with comparing more character stats
                if (advantage === 0)
                    banners[0].classList.add('btnDisappear')
                else if (advantage === 1) {
                    banners[1].classList.add('btnDisappear')
                }
            } else setTimeout(displayBattleConclusion, 600)
        }, 400);
    }, 1500);
}

const displayBattleConclusion = () => {
        let banners = document.querySelectorAll('.portraitBanner');
        let bannerToAppear = '';
        let bannerToDisappear = '';
        let names = document.querySelectorAll('.charName');

        if (charOneScore > charTwoScore) {
            bannerToAppear = banners[0];
            bannerToDisappear = banners[1];
            winStreak += 1;
            names[0].innerHTML += "&nbsp <i class='fas fa-trophy'></i>"
            setupPostBattle('Your character has <strong>WON</strong>!');
        } else if (charOneScore < charTwoScore) {
            bannerToAppear = banners[1];
            bannerToDisappear = banners[0];
            winStreak = 0; //you've lost
            names[1].innerHTML += "&nbsp <i class='fas fa-trophy'></i>"
            setupPostBattle('Better luck next time.');
        } else setupPostBattle('The characters are evenly matched. A draw <strong>does not</strong> reset your win streak.');

        if (charOneScore !== charTwoScore) { //if there's no draw
            bannerToAppear.textContent = "Winner"
            //make the correct banner appear
            if (bannerToAppear.classList.contains('btnDisappear')) {
                bannerToAppear.classList.remove('btnDisappear'); 
                bannerToAppear.classList.add('appear');
            }
            //make the other one disappear
            if (bannerToDisappear.classList.contains('appear')) {
                bannerToDisappear.classList.add('btnDisappear'); 
                bannerToDisappear.classList.remove('appear');
            }
        } else { //draw
            //make both banners disappear:
            if (banners[0].classList.contains('appear')) { //banner one disappears
                banners[0].classList.add('btnDisappear'), banners[0].classList.remove('appear')
            }
            if (banners[1].classList.contains('appear')) { //banner two disappears
                banners[1].classList.add('btnDisappear'), banners[1].classList.remove('appear')
            }
        }
}

const setupPostBattle = msg => {
    let midPanel = document.querySelector('.stat')
    let midRow = document.querySelector('row:nth-of-type(2)');
    let ulElements = document.querySelectorAll('ul');
    let bannerElements = document.querySelectorAll('.portraitBanner');
    let defaultHTML = "<li>Full Name: <span class='fullName'></span></li> <li>Alignment: <span class='alignment'></span></li> <li>Base: <span class='base'></span> </li> <li>First Appearance: <span class='firstAppear'></span></li> <li>Publisher: <span class='publisher'></span></li>";

    midPanel.classList.remove('stat', 'statPanel', 'fadeOutTop'), midPanel.classList.add('fadeInTop');
    document.querySelectorAll('.text p')[1].innerHTML = `<p>${msg}<br>Win Streak: ${winStreak}</p>`;

    setTimeout(()=> {
        let newBtn = document.createElement('button');
        let newBtnTwo = document.createElement('button');
        let nextOpponentBtnClicked = false;

        //style and attach newly created DOM buttons
        newBtn.classList.add('btn', 'animate', 'battleBtnTwo', 'appear');
        newBtn.innerHTML = "<strong>NEXT OPPONENT</strong>";
        midRow.appendChild(newBtn);

        newBtnTwo.classList.add('btn', 'animate', 'battleBtnTwo', 'appear', 'top');
        newBtnTwo.innerHTML = "<strong>RETURN HOME</strong>";
        midRow.appendChild(newBtnTwo);

        newBtnTwo.addEventListener('click', () => location.href = "index.html"); //page refresh

        newBtn.addEventListener('click', ()=> {
            if (nextOpponentBtnClicked === false) {
                //wipe opponent's name and image
                document.querySelectorAll('.charName')[1].textContent = '';
                document.querySelectorAll('.portrait')[1].src = "unknownChar.jpg";
                //reset both character's data list
                ulElements[0].innerHTML = defaultHTML, ulElements[1].innerHTML = defaultHTML

                //hide any banners
                for (let el of bannerElements) {
                    if (el.classList.contains('appear')) {
                        el.classList.add('btnDisappear');
                        el.classList.remove('appear');
                    }
                }
                
                generateCharacter(getCharacterId(), 1); //api call for a new opponent
                populateBio(0, playerCharacter); //Re-render the player character's bio information from cache

                midPanel.classList.add('fadeOutTop'), midPanel.classList.remove('fadeInTop'); 
                newBtn.classList.add('btnDisappear'), newBtnTwo.classList.add('btnDisappear');
                newBtn.classList.remove('appear'), newBtnTwo.classList.remove('appear')
                statsShown = 0, charOneScore = 0, charTwoScore = 0;

                setTimeout(() => {
                    //display pre-battle message again
                    newBtn.remove(), newBtnTwo.remove();
                    midPanel.classList.add('fadeInTop'), midPanel.classList.remove('fadeOutTop');
                    document.querySelectorAll('.text p')[1].innerHTML = "<p>The characters' <strong>powerstats</strong> will now be compared one at a time, rewarding points to the character that has a higher value for that stat. Click <strong>BEGIN</strong> to proceed.</p>";
                    setTimeout(()=> {
                        //recreate a begin battle button
                        let newestBtnClicked = false;
                        newestBtn = document.createElement('button');
                        newestBtn.classList.add('btn', 'animate', 'battleBtn', 'appear');
                        newestBtn.innerHTML = "<strong>BEGIN</strong>";

                        //reset the popup banners' text from "winner" (their text is hidden until displayed to the user)
                        bannerElements[0].innerText = "ADVANTAGE", bannerElements[1].innerText = "ADVANTAGE";

                        midRow.appendChild(newestBtn);
                        newestBtn.addEventListener('click', ()=> {
                            if (newestBtnClicked === false) {
                                midPanel.classList.add('fadeOutTop'), midPanel.classList.remove('fadeInTop');
                                newestBtn.classList.add('btnDisappear');
                                newestBtn.classList.remove('appear');
                                setTimeout(() => updateBattleUi(statsShown), 400);
                                newestBtnClicked = true;
                            }
                        }); //end event listener
                    }, 1200); 
                }, 600);
                nextOpponentBtnClicked = true;
            } //end var check
        });
    }, 1100);
};