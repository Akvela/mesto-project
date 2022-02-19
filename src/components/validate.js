export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__item',
  errorClass: 'popup__error-message_visible',
  inputInvalidClass: 'popup__item_invalid',
  buttonSelector: '.popup__save-button',
  buttonDisabledClass: 'popup__save-button_disabled'
};

const hideInputError = (inputElement, errorElement, config) => {
  inputElement.classList.remove(config.inputInvalidClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
};

const showInputError = (inputElement, errorElement, errorMessage, config) => {
  inputElement.classList.add(config.inputInvalidClass);
  errorElement.classList.add(config.errorClass);
  errorElement.textContent = errorMessage;
};

const checkInputValidity = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`#error-${inputElement.id}`);

  if (inputElement.validity.valid) {
    hideInputError(inputElement, errorElement, config);
  } else {
    showInputError(inputElement, errorElement, inputElement.validationMessage, config);
  };
};

export const disableButton = (buttonElement, config) => {
  buttonElement.classList.add(config.buttonDisabledClass);
  buttonElement.disabled = true;
};

const enableButton = (buttonElement, config) => {
  buttonElement.classList.remove(config.buttonDisabledClass);
  buttonElement.disabled = false;
};

const hasInvalidInput = (inputList) => {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (formElement, inputList, config) => {
  const buttonElement = formElement.querySelector(config.buttonSelector);

  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement, config);
  } else {
    enableButton(buttonElement, config);
  };
};

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));

  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(formElement, inputList, config);
    });
  });

  toggleButtonState(formElement, inputList, config);
};

export const enableValidation = (config) => {
  const forms = Array.from(document.querySelectorAll(config.formSelector));
  
  forms.forEach(formElement => {
    formElement.addEventListener('submit', event => {
      event.preventDefault();
    });

    setEventListeners(formElement, config);
  });
};