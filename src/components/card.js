import {deleteCard, likesCard, removeLikesCard} from "./api.js";

const cardTemplate = document.querySelector('#card-template').content;

function createCard(nameValue, linkValue, removeCardCallback, likeCardCallback, openImageCallback, likesValue, ownerId, userId, cardId) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardLikesCounter = cardElement.querySelector('.card__like-counter');
    const cardLikeButton = cardElement.querySelector('.card__like-button');
    
    cardElement.querySelector('.card__title').textContent = nameValue;
    cardImage.src = linkValue;
    cardImage.alt = nameValue;
    cardLikesCounter.textContent = likesValue.length;

    if (likesValue.some(like => like._id === userId)) {
        cardLikeButton.classList.add('liked');
    }

    const removeButton = cardElement.querySelector('.card__delete-button');
    if (ownerId === userId) {
        removeButton.addEventListener('click', function () {
            removeCardCallback(cardElement, cardId);
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

function removeCard(cardElement, cardId) {
    deleteCard(cardId)
        .then(() => {
            cardElement.remove();
        })
        .catch(err => console.log(`Ошибка удаления карточки: ${err}`));
}

function likeCard(cardElement, cardId, cardLikesCounter) {
    if (cardElement.classList.contains('liked')){
        removeLikesCard(cardId)
            .then((data) => {
                cardElement.classList.remove('liked');
                cardLikesCounter.textContent = data.likes.length;
            })
            .catch(err => console.log(`Ошибка удаления лайка: ${err}`));
    } else {
        likesCard(cardId)
            .then((data) => {
                cardElement.classList.add('liked');
                cardLikesCounter.textContent = data.likes.length;
            })
            .catch(err => console.log(`Ошибка добавления лайка: ${err}`));
    }
}

export { createCard, removeCard, likeCard};

