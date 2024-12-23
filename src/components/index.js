import '../pages/index.css';
import initialCards from './cards.js';
import {createCard, likeCard, removeCard} from './card.js';
import {closeModal, closePopupByEscape, closePopupByOverlayClick, openModal} from './modal.js';

const container = document.querySelector('.content');
const cardsContainer = container.querySelector('.places__list');
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


document.addEventListener('DOMContentLoaded', function () {
    initialCards.forEach(card => {
        const cardElement = createCard(card.name, card.link, removeCard, likeCard, openImage);
        cardsContainer.append(cardElement);
    });
});

function openImage(linkValue, nameValue) {
    openModal(imagePopup);
    imageInPopup.src = linkValue;
    imageInPopup.alt = nameValue;
    popupCaption.textContent = nameValue;
}

editButton.addEventListener('click', function () {
    openModal(editPopup);

    nameInput.value = document.querySelector('.profile__title').textContent;
    jobInput.value = document.querySelector('.profile__description').textContent;
});

addButton.addEventListener('click', function () {
    openModal(newCardPopup);
});

document.addEventListener('click', closePopupByOverlayClick);

document.addEventListener('keydown', closePopupByEscape);

function handleFormSubmit(evt) {
    evt.preventDefault();
    document.querySelector('.profile__title').textContent = nameInput.value;
    document.querySelector('.profile__description').textContent = jobInput.value;
    closeModal(editPopup);
}

formProfileElement.addEventListener('submit', handleFormSubmit);

function handleFormNewCardSubmit(evt) {
    evt.preventDefault();
    const cardElement = createCard(placeNameInput.value, linkInput.value, removeCard);
    cardsContainer.prepend(cardElement);
    closeModal(newCardPopup);
    formNewCardElement.reset();
}

formNewCardElement.addEventListener('submit', handleFormNewCardSubmit);












