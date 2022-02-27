import { showPhoto } from './modal.js';
import { deleteItem, addLikes, deleteLikes } from './api.js';
import { userId } from './index.js';

const cardsContainer = document.querySelector('.cards__gallery');
const cardTemplate = document.querySelector('#card').content;

function pressLike(event) {
  if (event.target.classList.contains('cards__like-button_active')) {
    deleteLikes(event.target.closest('.cards__item').dataset.id)
      .then((res) => {
        event.target.classList.remove('cards__like-button_active');
        event.target.closest('.cards__item').querySelector('.cards__likes').textContent = res.likes.length;
      })
      .catch(err => {
        console.log('Ошибка при снятии лайка');
      });
  } else {
    addLikes(event.target.closest('.cards__item').dataset.id)
      .then((res) => {
        event.target.classList.add('cards__like-button_active');
        event.target.closest('.cards__item').querySelector('.cards__likes').textContent = res.likes.length;
      })
      .catch(err => {
        console.log('Ошибка при постановке лайка');
      });
  }
};

function deleteCard(event) {
  deleteItem(event.target.closest('.cards__item').dataset.id)
    .then(() => {
      event.target.closest('.cards__item').remove();
    })
    .catch(err => {
      console.log('Ошибка при удалении карточки');
    })
};

function createCard(name, link, id, ownerId, likes) {
  const cardElement = cardTemplate.querySelector('.cards__item').cloneNode(true);
  const buttonDelete = cardElement.querySelector('.cards__trash-button');
  const buttonLike = cardElement.querySelector('.cards__like-button');
  const cardPhoto = cardElement.querySelector('.cards__photo');
  const cardName = cardElement.querySelector('.cards__name');
  const cardLikes = cardElement.querySelector('.cards__likes');

  if (ownerId == userId) {
    buttonDelete.classList.add('cards__trash-button_visible');
  };
 
  const activeLike = likes.some(item => { return item._id == userId; });
  if (activeLike) {
    buttonLike.classList.add('cards__like-button_active');
  };

  cardPhoto.src = link;
  cardPhoto.alt = name;
  cardName.textContent = name;
  cardElement.dataset.id = id;
  cardLikes.textContent = likes.length;

  buttonLike.addEventListener('click', pressLike);
  buttonDelete.addEventListener('click', deleteCard);
  cardPhoto.addEventListener('click', showPhoto);

  return cardElement;
};


export { createCard, cardsContainer };