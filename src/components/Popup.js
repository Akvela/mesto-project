import { buttonEscKeyCode } from '../utils/constants.js';

export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  closePopup() {
    document.removeEventListener('keydown', this._handleEscClose);
    this._popup.removeEventListener('click', this._handleClickOverlay);
    this._popup.classList.remove('popup_opened');
  }

  _handleEscClose = (evt) => {
    if (evt.keyCode == buttonEscKeyCode) {
      evt.preventDefault();
      this.closePopup(this._popup);
    };
  }

  _handleClickOverlay = (evt) => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__exit-button')) {
      this.closePopup(this._popup);
    };
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.addEventListener('click', this._handleClickOverlay);
  }

  setEventListeners() {
    this._popup.addEventListener('click', this._handleClickOverlay);
    document.addEventListener('keypress', this._handleEscClose);
  }
}