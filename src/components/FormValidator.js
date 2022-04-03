export default class FormValidator {
  constructor (validationConfig, formElement) {
    this._formSelector = validationConfig.formSelector;
    this._inputSelector = validationConfig.inputSelector;
    this._errorClass = validationConfig.errorClass;
    this._inputInvalidClass = validationConfig.inputInvalidClass;
    this._buttonSelector = validationConfig.buttonSelector;
    this._buttonDisabledClass = validationConfig.buttonDisabledClass;
    this._formElement = formElement;
    this._formList;
    this._buttonElement = this._formElement.querySelector(this._buttonSelector);
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

  _disableButton() {
    this._buttonElement.classList.add(this._buttonDisabledClass);
    this._buttonElement.disabled = true;
  }

  _enableButton() {
    this._buttonElement.classList.remove(this._buttonDisabledClass);
    this._buttonElement.disabled = false;
  }

  _hasInvalidInput() {
    return this._inputList.some(inputElement => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._disableButton(this._buttonElement);
    } else {
      this._enableButton(this._buttonElement);
    };
  }

  _setEventListeners() {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._toggleButtonState(this._inputList);
    
    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(this._inputList);
      });
    });
  }

  resetValidation() {
    this._toggleButtonState(this._inputList);
    this._inputList.forEach(inputElement => {
      const errorElement = this._formElement.querySelector(`#error-${inputElement.id}`);
      if (errorElement.classList.contains(this._errorClass)) {
        this._hideInputError(inputElement, errorElement);
      }
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}
