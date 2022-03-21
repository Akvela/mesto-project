import '../pages/index.css';
import { createCard, cardsContainer } from './card.js';
import { editProfile, addNewCard, popupEditAvatar, buttonEditAvatar, formAvatarElement, editAvatar, formCardElement, formInfoElement, jobProfile, popupAddPlace, buttonEdit, popupEdit, nameProfile, buttonPlus, nameInput, jobInput } from './modal.js';
import { openPopup } from './utils.js';
import { enableValidation, validationConfig } from './validate.js';
import { Api } from './api.js';
import Card from './Card1';

const avatarProfile = document.querySelector('.profile__avatar');
export let userId;

export const classApi = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort7',
  headers: {
    authorization: '8ced4900-b351-425e-b929-76d82504c0ac',
    'Content-Type': 'application/json'
  }
})


Promise.all([classApi.getProfile(), classApi.getItems()])
  .then(([userData, cards]) => {
    nameProfile.textContent = userData.name;
    jobProfile.textContent = userData.about;
    userId = userData._id
    avatarProfile.src = userData.avatar;
    cards.forEach(item => {
      const card = userId === item.owner._id
        ? new Card(item, '#self-card')
        : new Card(item, '#card');
      
        cardsContainer.prepend(card.generate());
      });
  })
  .catch(err => {
    console.log(`Ошибка: ${err.message}`);
  });

formInfoElement.addEventListener('submit', editProfile);

formCardElement.addEventListener('submit', addNewCard);

formAvatarElement.addEventListener('submit', editAvatar);

buttonEdit.addEventListener('click', function() {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  openPopup(popupEdit);
});

buttonPlus.addEventListener('click', function() {
  openPopup(popupAddPlace);
});

buttonEditAvatar.addEventListener('click', function() {
  openPopup(popupEditAvatar);
})

enableValidation(validationConfig);