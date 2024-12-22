import '../pages/index.css';
import initialCards from './cards.js';
import likeActiveImage from '../images/like-active.svg';

const container = document.querySelector('.content');
const cardsContainer = container.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const editPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const formProfileElement = document.forms['edit-profile'];
const nameInput = formProfileElement.querySelector('.popup__input_type_name');
const jobInput = formProfileElement.querySelector('.popup__input_type_description');
const formNewCardElement = document.forms['new-place'];
const placeNameInput = formNewCardElement.querySelector('.popup__input_type_card-name');
const linkInput = formNewCardElement.querySelector('.popup__input_type_url');




function createCard(nameValue, linkValue, removeCardCallback, likeCardCallback) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    cardElement.querySelector('.card__title').textContent = nameValue;
    cardImage.src = linkValue;
    cardImage.alt = nameValue;

    const removeButton = cardElement.querySelector('.card__delete-button');
    removeButton.addEventListener('click', function () {
        removeCardCallback(cardElement);
    });

    const cardLikeButton = cardElement.querySelector('.card__like-button');
    cardLikeButton.addEventListener('click', function (evt) {
        likeCardCallback(evt.target);
    })

    return cardElement;
}

function removeCard(cardElement) {
    cardElement.remove();
}

function likeCard(cardElement) {
    cardElement.style.backgroundImage = `url('${likeActiveImage}')`;
}

document.addEventListener('DOMContentLoaded', function () {
    initialCards.forEach(card => {
        const cardElement = createCard(card.name, card.link, removeCard, likeCard);
        cardsContainer.append(cardElement);
    });
});

function closePopup(popup) {
    popup.style.display = 'none';
}

editButton.addEventListener('click', function () {
    editPopup.style.display = 'flex';

    nameInput.value = document.querySelector('.profile__title').textContent;
    jobInput.value = document.querySelector('.profile__description').textContent;
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

    function handleFormSubmit(evt) {
        evt.preventDefault();
        document.querySelector('.profile__title').textContent = nameInput.value;
        document.querySelector('.profile__description').textContent = jobInput.value;
        editPopup.style.display = 'none';
    }

formProfileElement.addEventListener('submit', handleFormSubmit);

function handleFormNewCardSubmit(evt) {
    evt.preventDefault();
    const cardElement = createCard(placeNameInput.value, linkInput.value, removeCard);
    cardsContainer.prepend(cardElement);
    newCardPopup.style.display = 'none';
    formNewCardElement.reset();

}

formNewCardElement.addEventListener('submit', handleFormNewCardSubmit);












