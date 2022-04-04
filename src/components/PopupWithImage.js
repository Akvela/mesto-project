import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImageElement = this._popup.querySelector('.popup__image');
    this._popupImageNameElement = this._popup.querySelector('.popup__name');
  }

  open(link, name) {
    super.open();
    this._popupImageElement.src = link;
    this._popupImageNameElement.textContent = name;
    this._popupImageElement.alt = name;
  }
}