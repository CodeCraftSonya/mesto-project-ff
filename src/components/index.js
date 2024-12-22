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
const imageInPopup = document.querySelector('.popup__image');
const formProfileElement = document.forms['edit-profile'];
const nameInput = formProfileElement.querySelector('.popup__input_type_name');
const jobInput = formProfileElement.querySelector('.popup__input_type_description');
const formNewCardElement = document.forms['new-place'];
const placeNameInput = formNewCardElement.querySelector('.popup__input_type_card-name');
const linkInput = formNewCardElement.querySelector('.popup__input_type_url');
const popupCaption = document.querySelector('.popup__caption');




function createCard(nameValue, linkValue, removeCardCallback, likeCardCallback, openImageCallback) {
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

    cardImage.addEventListener('click', function (){
        openImageCallback(linkValue, nameValue);
    });

    return cardElement;
}

function removeCard(cardElement) {
    cardElement.remove();
}

function likeCard(cardElement) {
    cardElement.style.backgroundImage = `url('${likeActiveImage}')`;
}

function openImage(linkValue, nameValue) {
    imagePopup.classList.add('popup_is-animated_visible');
    imageInPopup.src = linkValue;
    imageInPopup.alt = nameValue;
    popupCaption.textContent = nameValue;
}

document.addEventListener('DOMContentLoaded', function () {
    initialCards.forEach(card => {
        const cardElement = createCard(card.name, card.link, removeCard, likeCard, openImage);
        cardsContainer.append(cardElement);
    });
});

function closePopup(popup) {
    popup.classList.remove('popup_is-animated_visible');
}

editButton.addEventListener('click', function () {
    editPopup.classList.add('popup_is-animated_visible');

    nameInput.value = document.querySelector('.profile__title').textContent;
    jobInput.value = document.querySelector('.profile__description').textContent;
});

addButton.addEventListener('click', function () {
    newCardPopup.classList.add('popup_is-animated_visible');
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
        const activePopup = document.querySelector('.popup[style*="visibility: visible"]');
        if (activePopup) {
            closePopup(activePopup);
        }
    }
});

    function handleFormSubmit(evt) {
        evt.preventDefault();
        document.querySelector('.profile__title').textContent = nameInput.value;
        document.querySelector('.profile__description').textContent = jobInput.value;
        editPopup.classList.remove('popup_is-animated_visible');
    }

formProfileElement.addEventListener('submit', handleFormSubmit);

function handleFormNewCardSubmit(evt) {
    evt.preventDefault();
    const cardElement = createCard(placeNameInput.value, linkInput.value, removeCard);
    cardsContainer.prepend(cardElement);
    newCardPopup.classList.remove('popup_is-animated_visible');
    formNewCardElement.reset();

}

formNewCardElement.addEventListener('submit', handleFormNewCardSubmit);












