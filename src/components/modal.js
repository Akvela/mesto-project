import { openPopup, closePopup } from './utils.js';
import { cardsContainer, createCard } from './card.js';
import { disableButton, validationConfig } from './validate.js';

const buttonEdit = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('#edit-info');
const buttonPlus = document.querySelector('.profile__add-button');
const popupAddPlace = document.querySelector('#add-card');
const popupPhoto = document.querySelector('#popup-image');
const nameProfile = document.querySelector('.profile__nickname');
const jobProfile = document.querySelector('.profile__text');

const formCardElement = document.querySelector('[name="form-place"]');
const formInfoElement = document.querySelector('[name="form-info"]');
const nameInput = document.querySelector('[name="nickname"]');
const jobInput = document.querySelector('[name="text"]');
const buttonAddCard = document.querySelector('#button-add-card');

function editProfile(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup(popupEdit);
};

const popupUrl = document.querySelector('.popup__image');
const popupName = document.querySelector('.popup__name');

function showPhoto(event) {
  popupUrl.src = event.target.src;
  popupUrl.alt = event.target.alt;
  popupName.textContent = event.target.alt;
  openPopup(popupPhoto);
};

const placeInput = document.querySelector('[name="place"]');
const urlCardInput = document.querySelector('[name="url-card"]');

function addNewCard(evt) {
  evt.preventDefault();
  cardsContainer.prepend(createCard(placeInput.value, urlCardInput.value));
  closePopup(popupAddPlace);
  placeInput.value = '';
  urlCardInput.value = '';
  disableButton(buttonAddCard, validationConfig);
};

export { addNewCard, editProfile, showPhoto, formCardElement, formInfoElement, popupEdit, buttonEdit, popupAddPlace, buttonPlus, jobProfile, nameProfile, nameInput, jobInput };