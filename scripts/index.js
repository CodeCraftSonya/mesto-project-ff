const container = document.querySelector('.content');
const cardsContainer = container.querySelector('.places__list');
const addButton = container.querySelector('.profile__add-button');

let avalibleCards = [];
document.addEventListener('DOMContentLoaded', function () {
    initialCards.forEach(card => {
        avalibleCards.push(card);
    });
});

function addCard(nameValue, linkValue) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__title').textContent = nameValue;
    cardElement.querySelector('.card__image').src = linkValue;
    const resetButton = cardElement.querySelector('.card__delete-button');
    resetButton.addEventListener('click', function () {
        cardElement.remove();
        avalibleCards.push({ name: nameValue, link: linkValue });
    });

    cardsContainer.append(cardElement);
}

document.addEventListener('DOMContentLoaded', function () {
    for (let i = 0; i < avalibleCards.length; i++) {
        const card = avalibleCards[i];
        addCard(card.name, card.link);
        avalibleCards.splice(i, 1);
        i--;
    }
});

document.addEventListener('DOMContentLoaded', function () {
    addButton.addEventListener('click', function () {
        if (avalibleCards.length > 0){
            const obj = avalibleCards[0];
            const name = obj.name;
            const link = obj.link;
            addCard(name, link);
            avalibleCards.splice(0, 1);
        }
    });
});




