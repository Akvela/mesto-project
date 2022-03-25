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
} from '../utils/constants.js';
import { togglerLikeHandler } from '../utils/utils.js';

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
let cardList;

Promise.all([api.getProfile(), api.getItems()])
  .then(([userData, cards]) => {
    nameProfile.textContent = userData.name;
    jobProfile.textContent = userData.about;
    userId = userData._id
    avatarProfile.src = userData.avatar;
    cardList = new Section({
      items: cards,
      renderer: (item) => {
        const cardSelector = userId === item.owner._id ? '#self-card' : '#card';
        const card = new Card({
          ...item,
          openPopupHandler: () => popupWithImage.open(item.link, item.name),
          handlerToggleLike: (evt) => togglerLikeHandler(evt, item, api),
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

const addNewCardPopup = new PopupWithForm({
  formSubmitHandler: function(inputValues) {
    const nameItem = inputValues.place;
    const linkItem = inputValues.urlCard;
    // addLoading(buttonAddCard);
    api.createItem(nameItem, linkItem)
      .then(res => {
        const newCard = new Card({
          ...res,
          openPopupHandler: () => popupWithImage.open(newCard._link, newCard._name),
          handlerToggleLike: (evt) => togglerLikeHandler(evt, newCard, api),
          deleteCardHandler: (evt) => {
            const deleteButton = evt.target;
            const cardItem = deleteButton.closest('.photo');
            // Добавить метод открытия модального окна удаления карточки
          }
        }, '#self-card');
        console.log(cardList.addItem);
        cardList.addItem(newCard.generate(res.owner._id));
        this.closePopup();
        // disableButton(buttonAddCard, validationConfig)
      })
      .catch(err => {
        console.log(`Ошибка при отправке карточки: ${err}`);
      })
      .finally(() => {
        //deleteLoading(buttonAddCard);
      });
  }
}, '#add-card');

formInfoElement.addEventListener('submit', editProfile);

//formCardElement.addEventListener('submit', addNewCard);

formAvatarElement.addEventListener('submit', editAvatar);

buttonEdit.addEventListener('click', function() {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  openPopup(popupEdit);
});

buttonPlus.addEventListener('click', () => addNewCardPopup.open());

buttonEditAvatar.addEventListener('click', function() {
  openPopup(popupEditAvatar);
})

enableValidation(validationConfig);