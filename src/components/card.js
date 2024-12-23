const cardTemplate = document.querySelector('#card-template').content;

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
    cardElement.classList.toggle('liked');
}

export { createCard, removeCard, likeCard};

