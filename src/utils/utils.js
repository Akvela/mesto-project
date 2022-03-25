import { cardLikeButtonActiveSelector } from './constants.js';

export const togglerLikeHandler = (evt, card, api) => {
  const likeButton = evt.target;
  if (likeButton.classList.contains(cardLikeButtonActiveSelector)) {
    api.deleteLike(card._id)
      .then((res) => {
        likeButton.classList.remove(cardLikeButtonActiveSelector);
        likeButton.querySelector('.cards__likes').textContent = res.likes.length;
      })
      .catch(err => {
        console.log(`Ошибка при снятии лайка: ${err.message}`);
      });
  } else {
    api.addLike(card._id)
      .then((res) => {
        likeButton.classList.add(cardLikeButtonActiveSelector);
        likeButton.querySelector('.cards__likes').textContent = res.likes.length;
      })
      .catch(err => {
        console.log(`Ошибка при постановке лайка: ${err.message}`);
      });
  }
}