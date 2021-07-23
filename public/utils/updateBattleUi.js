const updateBattleUi = (statsShown = 0) => {
    const icons = ['fa-brain', 'fa-dumbbell', 'fa-running', 'fa-shield-alt', 'fa-burn', 'fa-fist-raised'];
    let lists = document.querySelectorAll('ul');

    //if stats about to appear for the first time
    if (statsShown === 0) {
        document.querySelector('.btn:nth-of-type(1)').remove();
        lists[0].classList.add('btnDisappear'), lists[1].classList.add('btnDisappear'); //fade out info
    };
    setTimeout(()=> {
        //if stats about to appear for the first time
        if (statsShown === 0) {
            lists[0].innerHTML = '<li>Score: <span class="charScore"></span></li>'
            lists[0].classList.remove('btnDisappear')
            lists[1].innerHTML = '<li>Score: <span class="charTwoScore"></span></li>'
            lists[1].classList.remove('btnDisappear')
            document.querySelector('.charScore').textContent = charOneScore;
            document.querySelector('.charTwoScore').textContent = charTwoScore;
        }
        displayBattleStat(statsShown, Object.keys(charOneStats)[statsShown], icons[statsShown]);
    }, 600)
}