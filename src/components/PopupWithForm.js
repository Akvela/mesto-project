import Popup from "./Popup.js";
import { validationConfig } from '../utils/constants.js';

export default class PopupWithForm extends Popup{
  constructor({ submitFormHandler }, popupSelector) {
    super(popupSelector);
    this._submitFormHandler = submitFormHandler;
    this._formElement = this._popup.querySelector('.popup__form');
    this._submitButtonElement = this._popup.querySelector(validationConfig.buttonSelector);
    this._inputList = this._formElement.querySelectorAll('.popup__item');
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', evt => {
      evt.preventDefault();
      this._submitFormHandler(this._getInputValues());
      this._formElement.reset();
    });
  }

  closePopup() {
    super.closePopup();
    this._formElement.reset();
  }

  getFormElement() {
    return this._formElement;
  }
}