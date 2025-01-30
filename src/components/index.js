import '../pages/index.css';
import {createCard, likeCard, removeCard} from './card.js';
import {closeModal, closePopupByOverlayClick, openModal} from './modal.js';
import {clearValidation, enableValidation} from './validation.js'
import {addCard, editProfile, getInitialCards, getUserInfo} from "./api.js";

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
const profileImage = document.querySelector('.profile__image');
const cardTitle = document.querySelector('.card__title');
const cardImage = document.querySelector('.card__image');

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

Promise.all([getUserInfo(), getInitialCards()])
    .then(([userData, cardsData]) => {
        console.log(userData, cardsData);
        profileTitle.textContent = userData.name;
        profileDescription.textContent = userData.about;
        profileImage.style.backgroundImage = `url(${userData.avatar})`;
        const userId = userData._id;

        cardsData.forEach(card => {
            const cardElement = createCard(
                card.name,
                card.link,
                removeCard,
                likeCard,
                openImage,
                card.likes,
                card.owner._id,
                userId
            );
            cardsContainer.append(cardElement);
        });
    })
    .catch(err => console.log(`Ошибка загрузки данных: ${err}`));

function openImage(linkValue, nameValue) {
    openModal(imagePopup);
    imageInPopup.src = linkValue;
    imageInPopup.alt = nameValue;
    imagePopupCaption.textContent = nameValue;
}

function handleFormProfileSubmit(evt) {
    evt.preventDefault();
    const name = nameInput.value;
    const about = jobInput.value;
    editProfile(name, about)
    .then(data => {
        console.log(data);
        profileTitle.textContent = data.name;
        profileDescription.textContent = data.about;
        closeModal(editPopup);
    })
    .catch(err => console.log(err));
}

function handleFormNewCardSubmit(evt) {
    evt.preventDefault();
    const cardElement = createCard(placeNameInput.value, linkInput.value, removeCard, likeCard, openImage);
    cardsContainer.prepend(cardElement);
    const name = placeNameInput.value;
    const link = linkInput.value;
    addCard(name, link)
        .then(data => {
            console.log(data);
            cardTitle.textContent = data.name;
            cardImage.style.src = data.link;
            closeModal(editPopup);
        })
        .catch(err => console.log(err));
    closeModal(newCardPopup);
    formNewCardElement.reset();
}

// document.addEventListener('DOMContentLoaded', function () {
//     initialCards.forEach(card => {
//         const cardElement = createCard(card.name, card.link, removeCard, likeCard, openImage);
//         cardsContainer.append(cardElement);
//     });
// });

editButton.addEventListener('click', function () {
    openModal(editPopup);

    const formElement = editPopup.querySelector('.popup__form');
    if (formElement) {
        clearValidation(formElement, validationConfig);
    }

    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
});

addButton.addEventListener('click', function () {
    openModal(newCardPopup);

    const formElement = newCardPopup.querySelector('.popup__form');
    if (formElement) {
        clearValidation(formElement, validationConfig);
    }

    placeNameInput.value = '';
    linkInput.value = '';
});

document.addEventListener('click', closePopupByOverlayClick);

formProfileElement.addEventListener('submit', handleFormProfileSubmit);

formNewCardElement.addEventListener('submit', handleFormNewCardSubmit);

enableValidation(validationConfig);












