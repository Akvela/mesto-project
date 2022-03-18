import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(data, popupSelector) {
    super(popupSelector);
    this._link = data.link;
    this._name = data.name;
  }

  open() {
    super.open();
    this._popup.querySelector('.popup__image').src = this._link;
    this._popup.querySelector('.popup__name').textContent = this._name;
    this._popup.querySelector('.popup__image').alt = this._name;
  }
}