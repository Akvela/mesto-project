import '../pages/index.css';
import { createCard, cardsContainer } from './card.js';
import { editProfile, addNewCard, popupEditAvatar, buttonEditAvatar, formAvatarElement, editAvatar, formCardElement, formInfoElement, jobProfile, popupAddPlace, buttonEdit, popupEdit, nameProfile, buttonPlus, nameInput, jobInput } from './modal.js';
import { openPopup } from './utils.js';
import { enableValidation, validationConfig } from './validate.js';
import { getProfile, getItems } from './api.js';

const avatarProfile = document.querySelector('.profile__avatar');
export let userId;

Promise.all([getProfile(), getItems()])
  .then(([userData, cards]) => {
    nameProfile.textContent = userData.name;
    jobProfile.textContent = userData.about;
    userId = userData._id
    avatarProfile.src = userData.avatar;
    const newCards = cards.map(function(item) {
      return createCard(item.name, item.link, item._id, item.owner._id, item.likes);
      });
    cardsContainer.prepend(...newCards);
  })
  .catch(err => {
    console.log('Ошибка при загрузке данных с сервера');
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