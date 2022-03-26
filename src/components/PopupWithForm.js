import Popup from "./Popup";

export default class PopupWithForm extends Popup{
  constructor({ formSubmitHandler }, popupSelector, buttonSelector) {
    super(popupSelector);
    this._formSubmitHandler = formSubmitHandler;
    this._formElement = this._popup.querySelector('.popup__form');
    this._buttonSelector = this._popup.querySelector(buttonSelector);
  }

  _getInputValues() {
    this._inputList = this._formElement.querySelectorAll('.popup__item');
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
      this._formSubmitHandler(this._getInputValues());
      this._formElement.reset();
    });
  }

  closePopup() {
    super.closePopup();
    this._formElement.reset();
  }

  addLoading() {
    this._buttonSelector.textContent = 'Сохранение...';
  }

  deleteLoading() {
    if (this._buttonSelector === this._popup.querySelector('.popup__button_type_create')) {
      this._buttonSelector.textContent = 'Создать';
    } else {
      this._buttonSelector.textContent = 'Сохранить';
    }
  }
}