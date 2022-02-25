import { openPopup, closePopup } from './utils.js';
import { cardsContainer, createCard } from './card.js';
import { disableButton, validationConfig } from './validate.js';
import { changeProfile, createItem, changeAvatar } from './api.js';

export const buttonEdit = document.querySelector('.profile__edit-button');
export const popupEdit = document.querySelector('#edit-info');
export const buttonPlus = document.querySelector('.profile__add-button');
export const popupAddPlace = document.querySelector('#add-card');
const popupPhoto = document.querySelector('#popup-image');
export const nameProfile = document.querySelector('.profile__nickname');
export const jobProfile = document.querySelector('.profile__text');
export const popupEditAvatar = document.querySelector('#edit-avatar');
export const buttonEditAvatar = document.querySelector('.profile__edit-avatar');
export const buttonSaveAvatar = document.querySelector('.popup__button_type_edit');
const avatar = document.querySelector('.profile__avatar');
export const formAvatarElement = document.querySelector('#form-avatar');
export const formCardElement = document.querySelector('[name="form-place"]');
export const formInfoElement = document.querySelector('[name="form-info"]');
export const nameInput = document.querySelector('[name="nickname"]');
export const jobInput = document.querySelector('[name="text"]');
const buttonAddCard = document.querySelector('.popup__button_type_create');
const buttonEditProfile = document.querySelector('.popup__button_type_save');

function addLoading(button) {
  button.textContent = 'Сохранение...';
};
  
function deleteLoading(button) {
  if (button === buttonAddCard) {
    button.textContent = 'Создать';
  } else {
    button.textContent = 'Сохранить';
  }
};

export function editProfile(evt) {
  evt.preventDefault();
  const nameProfileId = nameInput.value;
  const jobProfileId = jobInput.value;
  addLoading(buttonEditProfile);
  changeProfile(nameProfileId, jobProfileId)
    .then(res => {
      nameProfile.textContent = res.name;
      jobProfile.textContent = res.about;  
    })
    .catch(err => {
        console.log('Ошибка при редактировании профиля');
    })
    .finally(() => {
      deleteLoading(buttonEditProfile);
    }); 
  closePopup(popupEdit);
};

const popupUrl = document.querySelector('.popup__image');
const popupName = document.querySelector('.popup__name');

export function showPhoto(event) {
  popupUrl.src = event.target.src;
  popupUrl.alt = event.target.alt;
  popupName.textContent = event.target.alt;
  openPopup(popupPhoto);
};

const placeInput = document.querySelector('[name="place"]');
const urlCardInput = document.querySelector('[name="url-card"]');

export function addNewCard(evt) {
  evt.preventDefault();
  const nameItem = placeInput.value;
  const linkItem = urlCardInput.value;
  addLoading(buttonAddCard);
  createItem(nameItem, linkItem)
    .then(res => {
      cardsContainer.prepend(createCard(res.name, res.link, res._id, res.owner._id, res.likes));
    })
    .catch(err => {
      console.log('Ошибка при отправке карточки');
    })
    .finally(() => {
      deleteLoading(buttonAddCard);
    });
  closePopup(popupAddPlace);
  placeInput.value = '';
  urlCardInput.value = '';
  disableButton(buttonAddCard, validationConfig);
};

const avatarInput = document.querySelector('[name="url-avatar"]');

export function editAvatar(evt) {
  evt.preventDefault();
  const avatarUrl = avatarInput.value;
  addLoading(buttonSaveAvatar);
  changeAvatar(avatarUrl)
    .then(res => {
      avatar.src = res.avatar;
    })
    .catch(err => {
      console.log('Ошибка при обновлении аватара');
    })
    .finally(() => {
      deleteLoading(buttonSaveAvatar);
    });
  closePopup(popupEditAvatar);
  avatarInput.value = '';
  disableButton(buttonSaveAvatar, validationConfig);
};