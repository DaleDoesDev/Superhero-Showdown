const clearCharUI = char => {
    document.querySelectorAll('.portrait')[char].src="unknownChar.jpg";
    const ui = ['charName', 'fullName', 'alignment', 'base', 'firstAppear', 'publisher'];
    for (let piece of ui) {
        document.querySelectorAll(`.${piece}`)[char].textContent = ''; //clear the data
    }
};