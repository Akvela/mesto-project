import { userId } from './index.js';
import { cardPhotoSelector } from '../utils/constants.js';

export default class Card {
  constructor({ link, name, _id, likes, openPopupHandler, handlerToggleLike }, selector) {
    this._link = link;
    this._name = name;
    this._id = _id;
    this._likes = likes;
    this._selector = selector;
    this._handlerToggleLike = handlerToggleLike;
    this._openPopupHandler = openPopupHandler;
  }

  _getElement() {
    return document
      .querySelector(this._selector)
      .content
      .querySelector('.cards__item')
      .cloneNode(true);
  }

  _setLike() {
    const activeLike = this._likes.some(item => { return item._id === userId; });
    if (activeLike) {
      this._likeButton.classList.add('cards__like-button_active');
    };
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', this._handlerToggleLike);
    this._element.querySelector(cardPhotoSelector).addEventListener('click', this._openPopupHandler);
  }

  generate() {
    this._element = this._getElement();
    this._element.querySelector(cardPhotoSelector).src = this._link;
    this._element.querySelector(cardPhotoSelector).alt = this._name;
    this._element.querySelector('.cards__name').textContent = this._name;
    this._element.id = this._id;
    this._element.querySelector('.cards__likes').textContent = this._likes.length;
    this._likeButton = this._element.querySelector('.cards__like-button');
    this._setLike();
    this._setEventListeners();

    return this._element;
  }
}