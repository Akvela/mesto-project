export default class FormValidator {
  constructor (validationConfig, formElement) {
    this._formSelector = validationConfig.formSelector;
    this._inputSelector = validationConfig.inputSelector;
    this._errorClass = validationConfig.errorClass;
    this._inputInvalidClass = validationConfig.inputInvalidClass;
    this._buttonSelector = validationConfig.buttonSelector;
    this._buttonDisabledClass = validationConfig.buttonDisabledClass;
    this._formElement = formElement;
  }

  _hideInputError(inputElement, errorElement) {
    inputElement.classList.remove(this._inputInvalidClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  _showInputError(inputElement, errorElement, errorMessage) {
    inputElement.classList.add(this._inputInvalidClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = errorMessage;
  }

  _checkInputValidity(inputElement) {
    const errorElement = this._formElement.querySelector(`#error-${inputElement.id}`);
  
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement, errorElement);
    } else {
      this._showInputError(inputElement, errorElement, inputElement.validationMessage);
    };
  }

  disableButton(buttonElement) {
    buttonElement.classList.add(this._buttonDisabledClass);
    buttonElement.disabled = true;
  }

  _enableButton(buttonElement) {
    buttonElement.classList.remove(this._buttonDisabledClass);
    buttonElement.disabled = false;
  }

  _hasInvalidInput(inputList) {
    return inputList.some(inputElement => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(inputList) {
    const buttonElement = this._formElement.querySelector(this._buttonSelector);
  
    if (hasInvalidInput(inputList)) {
      this.disableButton(buttonElement);
    } else {
      this._enableButton(buttonElement);
    };
  }

  _setEventListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
  
    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList);
      });
    });
  
    this._toggleButtonState(inputList);
  }

  enableValidation() {
      this._formElement.addEventListener('submit', event => {
        event.preventDefault();
      });
  
      this._setEventListeners();
  }
}
