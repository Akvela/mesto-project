import { buttonEscKeyCode } from '../utils/constants.js';

export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  closePopup() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keyup', this._handleEscClose);
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
    document.addEventListener('keyup', this._handleEscClose);
  }

  setEventListeners() {
    this._popup.addEventListener('click', this._handleClickOverlay);
  }

  addLoading() {
    this._submitButtonElement.textContent = 'Сохранение...';
  }

  deleteLoading(buttonContent) {
      this._submitButtonElement.textContent = buttonContent;
  }
}