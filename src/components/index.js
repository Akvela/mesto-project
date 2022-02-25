import '../pages/index.css';
import { createCard, cardsContainer } from './card.js';
import { editProfile, addNewCard, popupEditAvatar, buttonEditAvatar, formAvatarElement, editAvatar, formCardElement, formInfoElement, jobProfile, popupAddPlace, buttonEdit, popupEdit, nameProfile, buttonPlus, nameInput, jobInput } from './modal.js';
import { openPopup } from './utils.js';
import { enableValidation, validationConfig } from './validate.js';
import { getProfile, getItems } from './api.js';

const avatarProfile = document.querySelector('.profile__avatar');

getItems()
  .then(data => {
    const newCards = data.map(function(item) {
    return createCard(item.name, item.link, item._id, item.owner._id, item.likes);
    });
    cardsContainer.prepend(...newCards);
  })
  .catch(err => {
    console.log('Ошибка при загрузке карточек');
  });

getProfile()
  .then(data => {
    nameProfile.textContent = data.name;
    jobProfile.textContent = data.about;
    avatarProfile.src = data.avatar;
  })
  .catch(err => {
    console.log('Ошибка при загрузке информации профиля');
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