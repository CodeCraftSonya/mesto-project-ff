import '../pages/index.css';
import initialCards from './cards.js';
import {createCard, likeCard, removeCard} from './card.js';
import {closeModal, closePopupByOverlayClick, openModal} from './modal.js';

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
const imagePopupCaption = document.querySelector('.popup__caption');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');


function openImage(linkValue, nameValue) {
    openModal(imagePopup);
    imageInPopup.src = linkValue;
    imageInPopup.alt = nameValue;
    imagePopupCaption.textContent = nameValue;
}

function handleFormProfileSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closeModal(editPopup);
}

function handleFormNewCardSubmit(evt) {
    evt.preventDefault();
    const cardElement = createCard(placeNameInput.value, linkInput.value, removeCard, likeCard, openImage);
    cardsContainer.prepend(cardElement);
    closeModal(newCardPopup);
    formNewCardElement.reset();
}

document.addEventListener('DOMContentLoaded', function () {
    initialCards.forEach(card => {
        const cardElement = createCard(card.name, card.link, removeCard, likeCard, openImage);
        cardsContainer.append(cardElement);
    });
});

editButton.addEventListener('click', function () {
    openModal(editPopup);

    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
});

addButton.addEventListener('click', function () {
    openModal(newCardPopup);
});

document.addEventListener('click', closePopupByOverlayClick);

formProfileElement.addEventListener('submit', handleFormProfileSubmit);

formNewCardElement.addEventListener('submit', handleFormNewCardSubmit);












