import Popup from './Popup.js';
import { validationConfig } from '../utils/constants.js'

export default class ConfirmPopup extends Popup {
  constructor({ submitFormHandler }, popupSelector) {
    super(popupSelector);
    this._id = null;
    this._submitFormHandler = submitFormHandler;
    this._formElement = this._popup.querySelector('.popup__form');
    this._submitButtonElement = this._popup.querySelector(validationConfig.buttonSelector);
  }

  setCardId(cardId) {
    this._id = cardId;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', evt => {
      evt.preventDefault();
      this._submitFormHandler(this._id);
    });
  }
}