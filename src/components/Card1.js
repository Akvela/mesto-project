export default class Card {
  constructor(data, selector) {
    this._link = data.link;
    this._name = data.name;
    this._id = data._id;
    this._likes = data.likes;
    this._selector = selector;
  }

  _getElement() {
    return document
      .querySelector(this._selector)
      .content
      .querySelector('.cards__item')
      .cloneNode(true);
  }

  generate() {
    this._element = this._getElement();
    this._element.querySelector('.cards__photo').src = this._link;
    this._element.querySelector('.cards__photo').alt = this._name;
    this._element.querySelector('.cards__name').textContent = this._name;
    this._element.id = this._id;
    this._element.querySelector('.cards__likes').textContent = this._likesCount.length;

    return this._element;
  }
}