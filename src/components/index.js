import '../pages/index.css';
import initialCards from './cards.js';

const container = document.querySelector('.content');
const cardsContainer = container.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closePopupButton = document.querySelector('.popup__close');
const editPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');




function createCard(nameValue, linkValue, removeCardCallback) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    cardElement.querySelector('.card__title').textContent = nameValue;
    cardImage.src = linkValue;
    cardImage.alt = nameValue;

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

function closePopup(popup) {
    popup.style.display = 'none';
}

editButton.addEventListener('click', function () {
    const formElement = document.querySelector('.popup__form');
    const inputName = formElement.querySelector('.popup__input_type_name');
    const inputJob = formElement.querySelector('.popup__input_type_description');

    editPopup.style.display = 'flex';

    inputName.value = document.querySelector('.profile__title').textContent;
    inputJob.value = document.querySelector('.profile__description').textContent;
});

addButton.addEventListener('click', function () {
    newCardPopup.style.display = 'flex';
});

document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('card__image')) {
            imagePopup.style.display = 'flex';
        }
    });
});


document.addEventListener('click', function (event) {
    const isCloseButton = event.target.classList.contains('popup__close');
    const isPopupOverlay = event.target.classList.contains('popup');

    if (isCloseButton || isPopupOverlay) {
        const popup = event.target.closest('.popup');
        closePopup(popup);
    }
});

document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        const activePopup = document.querySelector('.popup[style*="display: flex"]');
        if (activePopup) {
            closePopup(activePopup);
        }
    }
});












