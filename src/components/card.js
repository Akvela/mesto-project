import { showPhoto } from './modal.js';

import komi from '../images/komi.jpg';
import karelia from '../images/karelia.jpg';
import zabaikalie from '../images/zabaikalie.jpg';
import yakutiya from '../images/yakutiya.jpg';
import vladivistok from '../images/vladivistok.jpg';
import karachaevoСherkesiya from '../images/karachaevo-cherkesiya.jpg';

const initialCards = [
  { name: 'Коми', link: komi },
  { name: 'Карелия', link: karelia },
  { name: 'Забайкалье', link: zabaikalie },
  { name: 'Якутия', link: yakutiya },
  { name: 'Владивосток', link: vladivistok },
  { name: 'Карачаево-Черкессия',link: karachaevoСherkesiya }
]; 

const cardsContainer = document.querySelector('.cards__gallery');
const cardTemplate = document.querySelector('#card').content;

function pressLike(event) {
  event.target.classList.toggle('cards__like-button_active');
};

function deleteCard(event) {
  event.target.closest('.cards__item').remove();
};

function createCard(name, link) {
  const cardElement = cardTemplate.querySelector('.cards__item').cloneNode(true);
  const buttonDelete = cardElement.querySelector('.cards__trash-button');
  const buttonLike = cardElement.querySelector('.cards__like-button');
  const cardPhoto = cardElement.querySelector('.cards__photo');
  const cardName = cardElement.querySelector('.cards__name');

  cardPhoto.src = link;
  cardPhoto.alt = name;
  cardName.textContent = name;

  buttonLike.addEventListener('click', pressLike);
  buttonDelete.addEventListener('click', deleteCard);
  cardPhoto.addEventListener('click', showPhoto);

  return cardElement;
};


export { createCard, cardsContainer, initialCards };