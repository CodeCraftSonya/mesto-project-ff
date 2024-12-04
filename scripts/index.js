const container = document.querySelector('.content');
const cardsContainer = container.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

function createCard(nameValue, linkValue, removeCardCallback) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__title').textContent = nameValue;
    cardElement.querySelector('.card__image').src = linkValue;
    cardElement.querySelector('.card__image').alt = nameValue;

    const removeButton = cardElement.querySelector('.card__delete-button');
    removeButton.addEventListener('click', function () {
        removeCardCallback(cardElement);
    });

    return cardElement;
}

function removeCard(cardElement) {
    cardElement.remove();
}

document.addEventListener('DOMContentLoaded', function () {
    initialCards.forEach(card => {
        const cardElement = createCard(card.name, card.link, removeCard);
        cardsContainer.append(cardElement);
    });
});




