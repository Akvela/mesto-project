import { Api } from './api.js';
import { userId } from './index.js';

const classApi = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort7',
  headers: {
    authorization: '8ced4900-b351-425e-b929-76d82504c0ac',
    'Content-Type': 'application/json'
  }
});

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

  _setLike() {
    const activeLike = this._likes.some(item => { return item._id === userId; });
    if (activeLike) {
      this._element.querySelector('.cards__like-button').classList.add('cards__like-button_active');
    };
  }

  _setEventListeners() {
     this._element.querySelector('.cards__like-button').addEventListener('click', () => {
        this._handleClickLike();
     });
   }

   _handleClickLike() {
      if (this._element.querySelector('.cards__like-button').classList.contains('cards__like-button_active')) {
        classApi.deleteLikes(this._element.id)
          .then((res) => {
            this._element.querySelector('.cards__like-button').classList.remove('cards__like-button_active');
            this._element.querySelector('.cards__likes').textContent = res.likes.length;
          })
          .catch(err => {
            console.log('Ошибка при снятии лайка');
          });
      } else {
        classApi.addLikes(this._element.id)
          .then((res) => {
            this._element.querySelector('.cards__like-button').classList.add('cards__like-button_active');
            this._element.querySelector('.cards__likes').textContent = res.likes.length;
          })
          .catch(err => {
            console.log('Ошибка при постановке лайка');
          });
      }
   }

  generate() {
    this._element = this._getElement();
    this._element.querySelector('.cards__photo').src = this._link;
    this._element.querySelector('.cards__photo').alt = this._name;
    this._element.querySelector('.cards__name').textContent = this._name;
    this._element.id = this._id;
    this._element.querySelector('.cards__likes').textContent = this._likes.length;
    this._setLike();
    this._setEventListeners();

    return this._element;
  }
}