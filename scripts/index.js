const container = document.querySelector('.content');
const cardsContainer = container.querySelector('.places__list');
const addButton = container.querySelector('.profile__add-button');


function addCard(nameValue, linkValue) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    console.log(cardElement);

    cardElement.querySelector('.card__title').textContent = nameValue;
    cardElement.querySelector('.card__image').src = linkValue;
    const resetButton = cardElement.querySelector('.card__delete-button');
    resetButton.addEventListener('click', function () {
        cardElement.remove();
    });

    cardsContainer.append(cardElement);
}

document.addEventListener('DOMContentLoaded', function () {
    initialCards.forEach(card => {
        addCard(card.name, card.link);
    });

});


document.addEventListener('DOMContentLoaded', function () {
    addButton.addEventListener('click', function () {
        console.log(document.querySelectorAll('.card').length);
        let currentIndex = document.querySelectorAll('.card').length;
        if (currentIndex < initialCards.length) {
            const obj = initialCards[currentIndex]; // Берём объект из массива
            const name = obj.name; // Извлекаем значение свойства name
            const link = obj.link; // Получаем текущий объект
            addCard(name, link); // Передаём name и link в функцию addCard
            currentIndex++; // Увеличиваем индекс для следующего объекта
        } else {
        }
    });

});




