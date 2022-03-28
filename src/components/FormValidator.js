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

  _disableButton(buttonElement) {
    buttonElement.classList.add(this._buttonDisabledClass);
    buttonElement.disabled = true;
  }

  _enableButton(buttonElement) {
    buttonElement.classList.remove(this._buttonDisabledClass);
    buttonElement.disabled = false;
  }

  _hasInvalidInput() {
    return this._inputList.some(inputElement => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    const buttonElement = this._formElement.querySelector(this._buttonSelector);

    if (this._hasInvalidInput(this._inputList)) {
      this._disableButton(buttonElement);
    } else {
      this._enableButton(buttonElement);
    };
  }

  _setEventListeners() {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._hasInvalidInput(this._inputList);
    this._toggleButtonState(this._inputList);
    
    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(this._inputList);
      });
    });
  }

  resetValidation() {
    this._hasInvalidInput(this._inputList);
    this._toggleButtonState(this._inputList);
    this._inputList.forEach(inputElement => {
      const errorElement = this._formElement.querySelector(`#error-${inputElement.id}`);
      if (errorElement.classList.contains(this._errorClass)) {
        errorElement.classList.remove(this._errorClass);
        inputElement.classList.remove(this._inputInvalidClass);
      }
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}
