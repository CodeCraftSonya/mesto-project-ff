const showInputError = (formElement, inputElement, errorMessage, validationConfig) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-input-error`);
    inputElement.classList.add(validationConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationConfig.errorClass);
};

const hideInputError = (formElement, inputElement, validationConfig) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-input-error`);
    inputElement.classList.remove(validationConfig.inputErrorClass);
    errorElement.classList.remove(validationConfig.errorClass);
    errorElement.textContent = '';
};

const checkPatternMatch = (inputText) => {
    const inputTextRegex = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/;
    return inputText === "" || inputTextRegex.test(inputText);
};

const checkInputValidity = (formElement, inputElement, validationConfig) => {
    if (["name", "description", "place-name"].includes(inputElement.name)) {
        if (!checkPatternMatch(inputElement.value)) {
            showInputError(
                formElement,
                inputElement,
                "Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы",
                validationConfig
            );
            return;
        }
    }
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
    } else {
        hideInputError(formElement, inputElement, validationConfig);
    }
};

const setEventListeners = (formElement, validationConfig) => {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

    inputList.forEach((inputElement) => {
        if (inputElement.classList.contains('form__input_type_error')) {
            hideInputError(formElement, inputElement);
        }
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, validationConfig);
            toggleButtonState(inputList, buttonElement, validationConfig);
        });
    });
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        if (["name", "description", "place-name"].includes(inputElement.name)) {
            return !checkPatternMatch(inputElement.value);
        }
        return !inputElement.validity.valid;
    })
}

const toggleButtonState = (inputList, buttonElement, validationConfig) => {
    if(hasInvalidInput(inputList)){
        buttonElement.classList.add(validationConfig.inactiveButtonClass);
    } else{
        buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    }
}

const clearValidation = (formElement, validationConfig) => {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
    inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement, validationConfig);
    });
    toggleButtonState(inputList, buttonElement, validationConfig);
};

const enableValidation = (validationConfig) => {
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        setEventListeners(formElement, validationConfig);
    });
};

export { enableValidation, clearValidation, toggleButtonState };