import Popup from "./Popup";

export default class PopupWithForm extends Popup{
  constructor({ formSubmitHandler }, popupSelector) {
    super(popupSelector);
    this._formSubmitHandler = formSubmitHandler;
    this._formElement = this._popup.querySelector('.popup__form');
  }

  _getInputValues() {
    this._inputList = this._formElement.querySelectorAll('.popup__item');
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }
  
  _setEventListeners() {
    super._setEventListeners();
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
}