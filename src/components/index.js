import '../pages/index.css';
import {createCard, likeCard} from './card.js';
import {closeModal, closePopupByOverlayClick, openModal} from './modal.js';
import {clearValidation, enableValidation} from './validation.js'
import {addCard, changeProfileImage, deleteCard, editProfile, getInitialCards, getUserInfo} from "./api.js";

const container = document.querySelector('.content');
const cardsContainer = container.querySelector('.places__list');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const editPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const newProfileImagePopup = document.querySelector('.popup_type_new-profile-image');
const deleteCardPopup = document.querySelector('.popup_type_ensure-delete-card');
const deleteCardForm = deleteCardPopup.querySelector('.popup__form');
const imagePopup = document.querySelector('.popup_type_image');
const imageInPopup = document.querySelector('.popup__image');
const formProfileElement = document.forms['edit-profile'];
const nameInput = formProfileElement.querySelector('.popup__input_type_name');
const jobInput = formProfileElement.querySelector('.popup__input_type_description');
const formNewProfileImageElement = document.forms['new-profile-image'];
const profileImageInput = formNewProfileImageElement.querySelector('.popup__input_type_profile-url');
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
        profileTitle.textContent = userData.name;
        profileDescription.textContent = userData.about;
        profileImage.style.backgroundImage = `url(${userData.avatar})`;
        const userId = userData._id;

        cardsData.forEach(card => {
            const cardElement = createCard(
                card.name,
                card.link,
                likeCard,
                openImage,
                card.likes,
                card.owner._id,
                userId,
                card._id
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

function renderLoading (isLoading, buttonElement) {
    if(isLoading) {
        buttonElement.textContent = 'Сохранение...';
    } else{
        buttonElement.textContent = 'Сохранить';
    }
}

function handleFormProfileImageSubmit(evt) {
    evt.preventDefault();
    const submitButton = evt.submitter;
    renderLoading(true, submitButton);
    const avatar = profileImageInput.value;
    changeProfileImage(avatar)
        .then(data => {
        profileImage.style.backgroundImage = `url(${data.avatar})`;
        closeModal(newProfileImagePopup);
        })
        .catch(err => console.log(err))
        .finally(() => {
        renderLoading(false, submitButton);
        })
}

function handleFormProfileSubmit(evt) {
    evt.preventDefault();
    const submitButton = evt.submitter;
    renderLoading(true, submitButton);

    const name = nameInput.value;
    const about = jobInput.value;
    editProfile(name, about)
        .then(data => {
            profileTitle.textContent = data.name;
            profileDescription.textContent = data.about;
            closeModal(editPopup);
        })
        .catch(err => console.log(err))
        .finally(() => {
        renderLoading(false, submitButton);
        })
}

function handleFormNewCardSubmit(evt) {
    evt.preventDefault();
    const submitButton = evt.submitter;
    renderLoading(true, submitButton);

    const name = placeNameInput.value;
    const link = linkInput.value;
    addCard(name, link)
        .then(data => {
            const cardElement = createCard(data.name,
                data.link,
                likeCard,
                openImage,
                data.likes,
                data.owner._id,
                data.owner._id,
                data._id
            );
            cardsContainer.prepend(cardElement);
            closeModal(newCardPopup);
            formNewCardElement.reset();
        })
        .catch(err => console.log(err))
        .finally(() => {
        renderLoading(false, submitButton);
        })
}

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

let deleteCardId = null;
let deleteCardElement = null;

function openDeletePopup(cardElement, cardId) {
    deleteCardId = cardId;
    deleteCardElement = cardElement;
    openModal(deleteCardPopup);
}

deleteCardForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    if (!deleteCardId) return;

    deleteCard(deleteCardId)
        .then(() => {
            deleteCardElement.remove();
            closeModal(deleteCardPopup);
            deleteCardId = null;
            deleteCardElement = null;
        })
        .catch(err => console.log(`Ошибка удаления карточки: ${err}`));
});

profileImage.addEventListener('click', function () {
    openModal(newProfileImagePopup);

    const formElement = newProfileImagePopup.querySelector('.popup__form');
    if (formElement) {
        clearValidation(formElement, validationConfig);
    }

    profileImageInput.value = '';
});

document.addEventListener('click', closePopupByOverlayClick);

formProfileElement.addEventListener('submit', handleFormProfileSubmit);

formNewCardElement.addEventListener('submit', handleFormNewCardSubmit);

formNewProfileImageElement.addEventListener('submit', handleFormProfileImageSubmit);

enableValidation(validationConfig);

export {cardTitle, cardImage, openDeletePopup}












