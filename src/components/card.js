export default class Card {
  constructor({ link, name, _id, likes, openPopupHandler, toggleLikeHandler, deleteCardHandler }, selector) {
    this._link = link;
    this._name = name;
    this._id = _id;
    this._likes = likes;
    this._selector = selector;
    this._toggleLikeHandler = toggleLikeHandler;
    this._openPopupHandler = openPopupHandler;
    this._deleteCardHandler = deleteCardHandler;
  }

  _getElement() {
    return document
      .querySelector(this._selector)
      .content
      .querySelector('.cards__item')
      .cloneNode(true);
  }

  _setLike(userId) {
    const activeLike = this._likes.some(item => { return item._id === userId; });
    if (activeLike) {
      this._likeButton.classList.add('cards__like-button_active');
    };
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', this._toggleLikeHandler);
    this._cardImage.addEventListener('click', this._openPopupHandler);
    if (this._selector === '#self-card') {
      this._element.querySelector('.cards__trash-button').addEventListener('click', this._deleteCardHandler);
    }
  }

  generate(userId) {
    this._element = this._getElement();
    this._cardImage = this._element.querySelector('.cards__photo');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.cards__name').textContent = this._name;
    this._element.id = this._id;
    this._element.querySelector('.cards__likes').textContent = this._likes.length;
    this._likeButton = this._element.querySelector('.cards__like-button');
    this._setLike(userId);
    this._setEventListeners(userId);

    return this._element;
  }
}