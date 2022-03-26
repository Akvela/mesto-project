
import { Api } from './Api.js';


const cardsContainer = document.querySelector('.cards__gallery');
const cardTemplate = document.querySelector('#card').content;

export const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort7',
  headers: {
    authorization: '8ced4900-b351-425e-b929-76d82504c0ac',
    'Content-Type': 'application/json'
  }
});


function deleteCard(event) {
  api.deleteItem(event.target.closest('.cards__item').dataset.id)
    .then(() => {
      event.target.closest('.cards__item').remove();
    })
    .catch(err => {
      console.log('Ошибка при удалении карточки');
    })
};

