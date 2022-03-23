import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(link, name) {
    super.open();
    this._popup.querySelector('.popup__image').src = link;
    this._popup.querySelector('.popup__name').textContent = name;
    this._popup.querySelector('.popup__image').alt = name;
  }
}