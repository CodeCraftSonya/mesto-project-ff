const cardTemplate = document.querySelector('#card-template').content;

function createCard(nameValue, linkValue, removeCardCallback, likeCardCallback, openImageCallback, likesValue, ownerId, userId) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardLikesCounter = cardElement.querySelector('.card__like-counter');
    cardElement.querySelector('.card__title').textContent = nameValue;
    cardImage.src = linkValue;
    cardImage.alt = nameValue;
    cardLikesCounter.textContent = likesValue.length;

    const removeButton = cardElement.querySelector('.card__delete-button');
    if (ownerId === userId) {
        removeButton.addEventListener('click', function () {
            removeCardCallback(cardElement);
        });
    } else {
        removeButton.style.display = "none";
    }

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

