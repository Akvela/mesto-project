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
    this._element = document.querySelector(this._selector).content.querySelector('.cards__item').cloneNode(true);
    this._cardImage = this._element.querySelector('.cards__photo');
    this._cardName = this._element.querySelector('.cards__name');
    this._cardLikes = this._element.querySelector('.cards__likes');
    this._likeButton = this._element.querySelector('.cards__like-button');
  }

  _getElement() {
    return this._element;
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
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardName.textContent = this._name;
    this._element.id = this._id;
    this._cardLikes.textContent = this._likes.length;
    this._setLike(userId);
    this._setEventListeners(userId);

    return this._element;
  }
}