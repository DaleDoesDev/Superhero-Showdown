async function generateCharacter(num, char) {
    await fetch(`https://hosted-cors.herokuapp.com/https://www.superheroapi.com/api/10158616269425862/${num}`).then(res => {
        return res.json() //extract JSON object
    }).then(data => {
        //Check for the rare occurance of a character lacking actual stat values:
        if (data.powerstats.combat === "null") {
            //query for a different character. 
            generateCharacter(getCharacterId(), char);
        } else {
            const cachedBioData = {
                name: data.name,
                portrait: data.image.url, 
                fullName: data.biography['full-name'],
                alignment: data.biography.alignment, 
                base: data.work.base,
                debut: data.biography['first-appearance'],
                publisher: data.biography.publisher
            }
            populateBio(char, cachedBioData); //pass in this character's biographical information           
            let dialogue = document.querySelectorAll('.dialogue')[char];

            if (cachedBioData.alignment === "good") {
                dialogue.classList.add('blueDialogue')
                dialogue.classList.remove('redDialogue')
            } else if (cachedBioData.alignment === "bad") {
                    dialogue.classList.add('redDialogue')
                    dialogue.classList.remove('blueDialogue')
            }

            if (char === 1) { //value '1' represents the opponent
                charTwoStats = data.powerstats //save a copy of the stats 
            } else {
                charOneStats = data.powerstats //save a copy of the stats 
                playerCharacter = cachedBioData; //save a copy of the player character's biographical information
            }
        }
    }).catch( (e)=> {
        console.log("API call failure: ", e)
    })
}