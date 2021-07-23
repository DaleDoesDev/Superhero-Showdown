const populateBio = (char, data) => {
    document.querySelectorAll('.charName')[char].textContent = data.name;
    document.querySelectorAll('.portrait')[char].src=(data.portrait);
    document.querySelectorAll('.fullName')[char].textContent = data.fullName;
    document.querySelectorAll('.alignment')[char].textContent = data.alignment;
    document.querySelectorAll('.base')[char].textContent = data.base;
    document.querySelectorAll('.firstAppear')[char].textContent = data.debut;
    document.querySelectorAll('.publisher')[char].textContent = data.publisher;
}
