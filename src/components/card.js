import {likesCard, removeLikesCard} from "./api.js";

const cardTemplate = document.querySelector('#card-template').content;

function createCard(card, likeCardCallback, openImageCallback,  userId, openModal, deleteCardPopup, deleteCardCallback) {
    const nameValue = card.name;
    const linkValue = card.link;
    const likesValue = card.likes;
    const ownerId = card.owner._id;
    const cardId = card._id;

    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardLikesCounter = cardElement.querySelector('.card__like-counter');
    const cardLikeButton = cardElement.querySelector('.card__like-button');

    cardElement.querySelector('.card__title').textContent = nameValue;
    cardImage.src = linkValue;
    cardImage.alt = nameValue;
    cardLikesCounter.textContent = Array.isArray(likesValue) ? likesValue.length : 0;

    if (likesValue.some(like => like._id === userId)) {
        cardLikeButton.classList.add('liked');
    }

    const removeButton = cardElement.querySelector('.card__delete-button');
    if (ownerId === userId) {
        removeButton.addEventListener('click', function () {
            deleteCardCallback(cardElement, cardId, openModal, deleteCardPopup);
        });
    } else {
        removeButton.style.display = "none";
    }

    cardLikeButton.addEventListener('click', function () {
        likeCardCallback(cardLikeButton, cardId, cardLikesCounter);
    })

    cardImage.addEventListener('click', function (){
        openImageCallback(linkValue, nameValue);
    });

    return cardElement;
}

function likeCard(cardElement, cardId, cardLikesCounter) {
    const isLiked = cardElement.classList.contains('liked');
    const likeMethod = isLiked ? removeLikesCard : likesCard;
    likeMethod(cardId)
        .then((data) => {
            cardElement.classList.toggle('liked');
            cardLikesCounter.textContent = data.likes.length;
        })
        .catch(err => console.log(`Ошибка ${isLiked ? 'удаления' : 'добавления'} лайка: ${err}`));

}

export { createCard, likeCard };

