import '../pages/index.css';
import { editProfile, addNewCard, popupEditAvatar, buttonEditAvatar, formAvatarElement, editAvatar, formInfoElement, jobProfile, popupAddPlace, buttonEdit, popupEdit, nameProfile, buttonPlus, nameInput, jobInput } from './modal.js';
import { openPopup } from './utils.js';
import { enableValidation, validationConfig } from './validate.js';
import { Api } from './Api.js';
import Card from './Card1.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm';
import { 
  popupWithPhotoSelector,
  cardsSelector,
  cardLikeButtonActiveSelector
} from '../utils/constants.js';

const avatarProfile = document.querySelector('.profile__avatar');
export let userId;

export const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort7',
  headers: {
    authorization: '8ced4900-b351-425e-b929-76d82504c0ac',
    'Content-Type': 'application/json'
  }
});

const popupWithImage = new PopupWithImage(popupWithPhotoSelector);

Promise.all([api.getProfile(), api.getItems()])
  .then(([userData, cards]) => {
    nameProfile.textContent = userData.name;
    jobProfile.textContent = userData.about;
    userId = userData._id
    avatarProfile.src = userData.avatar;
    const cardList = new Section({
      items: cards,
      renderer: (item) => {
        const cardSelector = userId === item.owner._id ? '#self-card' : '#card';
        const card = new Card({
          _id: item._id,
          link: item.link,
          name: item.name,
          likes: item.likes,
          openPopupHandler: () => popupWithImage.open(item.link, item.name),
          handlerToggleLike: (evt) => {
            const likeButton = evt.target;
            if (likeButton.classList.contains(cardLikeButtonActiveSelector)) {
              api.deleteLike(item._id)
                .then((res) => {
                  likeButton.classList.remove(cardLikeButtonActiveSelector);
                  likeButton.querySelector('.cards__likes').textContent = res.likes.length;
                })
                .catch(err => {
                  console.log(`Ошибка при снятии лайка: ${err.message}`);
                });
            } else {
              api.addLike(item._id)
                .then((res) => {
                  likeButton.classList.add(cardLikeButtonActiveSelector);
                  likeButton.querySelector('.cards__likes').textContent = res.likes.length;
                })
                .catch(err => {
                  console.log(`Ошибка при постановке лайка: ${err.message}`);
                });
            }
          },
          deleteCardHandler: (evt) => {
            const deleteButton = evt.target;
            const cardItem = deleteButton.closest('.photo');
            // Добавить метод открытия модального окна удаления карточки
          }
        }, cardSelector);
        const cardElement = card.generate(userId);
        cardList.addItem(cardElement);
      }
    }, cardsSelector);
    cardList.renderItems();
  })
  .catch(err => {
    console.log(`Ошибка: ${err.message}`);
  });

const addNewCardPopup = new PopupWithForm('#add-card', function(inputList) {
  evt.preventDefault();
  const nameItem = inputList.place.value;
  const linkItem = inputList.urlCard.value;
  // addLoading(buttonAddCard);
  api.createItem(nameItem, linkItem)
    .then(res => {
      const newCard = new Card({ ...res,
        openPopupHandler: () => popupWithImage.open(res.link, res.name),
        handlerToggleLike: (evt) => {
          const likeButton = evt.target;
          if (likeButton.classList.contains(cardLikeButtonActiveSelector)) {
            api.deleteLike(res._id)
              .then((res) => {
                likeButton.classList.remove(cardLikeButtonActiveSelector);
                likeButton.querySelector('.cards__likes').textContent = res.likes.length;
              })
              .catch(err => {
                console.log(`Ошибка при снятии лайка: ${err.message}`);
              });
          } else {
            api.addLike(res._id)
              .then((res) => {
                likeButton.classList.add(cardLikeButtonActiveSelector);
                likeButton.querySelector('.cards__likes').textContent = res.likes.length;
              })
              .catch(err => {
                console.log(`Ошибка при постановке лайка: ${err.message}`);
              });
          }
        },
        deleteCardHandler: (evt) => {
          const deleteButton = evt.target;
          const cardItem = deleteButton.closest('.photo');
          // Добавить метод открытия модального окна удаления карточки
        }
      }, cardSelector);
      
      closePopup(popupAddPlace);
      placeInput.value = '';
      urlCardInput.value = '';
      disableButton(buttonAddCard, validationConfig)
    })

    .catch(err => {
      console.log('Ошибка при отправке карточки');
    })
    .finally(() => {
      //deleteLoading(buttonAddCard);
    });
}) 

formInfoElement.addEventListener('submit', editProfile);

//formCardElement.addEventListener('submit', addNewCard);

formAvatarElement.addEventListener('submit', editAvatar);

buttonEdit.addEventListener('click', function() {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  openPopup(popupEdit);
});

// buttonPlus.addEventListener('click', function() {
//   openPopup(popupAddPlace);
// });

buttonEditAvatar.addEventListener('click', function() {
  openPopup(popupEditAvatar);
})

enableValidation(validationConfig);