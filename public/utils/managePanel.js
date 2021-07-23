const managePanel = (panelStage = 0) => {
    let comicPane = document.querySelector('.comic-pane');
    if (panelStage === 0) {
        btnTwo = document.querySelector('.btn:nth-of-type(2)');
        if (document.querySelector('.charName').textContent === '') { //update the left comic panel only once
            setTimeout(()=> {
                comicPane.classList.add('fadeOut');
                setTimeout(()=> {
                    comicPane.classList.remove('fadeOut');
                    comicPane.classList.add('fadeIn');
                    let comicPaneTxt = document.querySelector('.text');
                    comicPaneTxt.innerHTML = "<p>After you have a character you'd like to see battle, click the <strong>BATTLE</strong> button. </p>";
                    btnTwo.classList.remove('hiddenBtn'); //reveal Battle button
                    btnTwo.classList.add('appear');
                }, 800)
            }, 600);
        }
    } else if (panelStage === 1) {
        comicPane.classList.add('fadeOut'); 
        setTimeout(()=> {
            document.querySelector('row').classList.add('col');
            setTimeout(prepBattleArea, 1000);
        }, 700);
    }
}