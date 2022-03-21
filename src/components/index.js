import '../pages/index.css';
import { createCard, cardsContainer } from './card.js';
import { editProfile, addNewCard, popupEditAvatar, buttonEditAvatar, formAvatarElement, editAvatar, formCardElement, formInfoElement, jobProfile, popupAddPlace, buttonEdit, popupEdit, nameProfile, buttonPlus, nameInput, jobInput } from './modal.js';
import { openPopup } from './utils.js';
import { enableValidation, validationConfig } from './validate.js';
import { Api } from './api.js';
import Card from './Card1.js';
import PopupWithImage from './PopupWithImage.js';
import { popupWithPhotoSelector } from '../utils/constants.js';

const avatarProfile = document.querySelector('.profile__avatar');
export let userId;

export const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort7',
  headers: {
    authorization: '8ced4900-b351-425e-b929-76d82504c0ac',
    'Content-Type': 'application/json'
  }
});


Promise.all([api.getProfile(), api.getItems()])
  .then(([userData, cards]) => {
    nameProfile.textContent = userData.name;
    jobProfile.textContent = userData.about;
    userId = userData._id
    avatarProfile.src = userData.avatar;
    cards.forEach(item => {
      const popupWithImage = new PopupWithImage({link: item.link, name: item.name}, popupWithPhotoSelector);

      const cardSelector = userId === item.owner._id ? '#self-card' : '#card';
      console.log(cardSelector);
      const card = new Card({
          _id: item._id,
          link: item.link,
          name: item.name,
          likes: item.likes,
          openPopupHandler: () => popupWithImage.open(),
          handlerToggleLike: (evt) => {
            const likeButton = evt.target;
            if (likeButton.classList.contains('cards__like-button_active')) {
              api.deleteLike(item._id)
                .then((res) => {
                  likeButton.classList.remove('cards__like-button_active');
                  likeButton.querySelector('.cards__likes').textContent = res.likes.length;
                })
                .catch(err => {
                  console.log(`Ошибка при снятии лайка: ${err.message}`);
                });
            } else {
              api.addLike(item._id)
                .then((res) => {
                  likeButton.classList.add('cards__like-button_active');
                  likeButton.querySelector('.cards__likes').textContent = res.likes.length;
                })
                .catch(err => {
                  console.log(`Ошибка при постановке лайка: ${err.message}`);
                });
            }
          },
        }, cardSelector);
      
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