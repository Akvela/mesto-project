import './index.css';
import Api from '../components/Api.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import ConfirmPopup from '../components/ConfirmPopup.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import { 
  popupWithPhotoSelector,
  cardsSelector,
  avatar,
  nameInput,
  jobInput,
  buttonEditAvatar,
  buttonEdit,
  buttonPlus,
  validationConfig
} from '../utils/constants.js';
import { togglerLikeHandler } from '../utils/utils.js';

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/plus-cohort7',
  headers: {
    authorization: '8ced4900-b351-425e-b929-76d82504c0ac',
    'Content-Type': 'application/json'
  }
});

const popupWithImage = new PopupWithImage(popupWithPhotoSelector);
popupWithImage.setEventListeners();
let cardList;

const profile = new UserInfo({
  selectorName: '.profile__nickname', 
  selectorAbout: '.profile__text'
});

const confirmPopup = new ConfirmPopup({
  formSubmitHandler: (cardId) => {
    confirmPopup.addLoading();
    api.deleteItem(cardId)
      .then(() => {
        const cardElement = document.getElementById(cardId);
        cardElement.remove();
        confirmPopup.closePopup();
      })
      .catch(err => console.log(`Ошибка удаления карточки: ${err}`))
      .finally(() => confirmPopup.deleteLoading('Да'));
  }
}, '#popup-confirm-delete');

confirmPopup.setEventListeners();

Promise.all([api.getProfile(), api.getItems()])
  .then(([userData, cards]) => {
    profile.setUserInfo({
      name: userData.name,
      about: userData.about
    })
    const userId = userData._id
    avatar.src = userData.avatar;
    cardList = new Section({
      items: cards,
      renderer: (item) => {
        const cardSelector = userId === item.owner._id ? '#self-card' : '#card';
        const card = new Card({
          ...item,
          openPopupHandler: () => popupWithImage.open(item.link, item.name),
          handlerToggleLike: (evt) => togglerLikeHandler(evt, item, api),
          deleteCardHandler: () => {
            confirmPopup.open();
            confirmPopup.setCardId(item._id);
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
    addNewCardPopup.addLoading();
    api.createItem(nameItem, linkItem)
      .then(res => {
        const newCard = new Card({
          ...res,
          openPopupHandler: () => popupWithImage.open(newCard._link, newCard._name),
          handlerToggleLike: (evt) => togglerLikeHandler(evt, newCard, api),
          deleteCardHandler: () => {
            confirmPopup.open();
            confirmPopup.setCardId(res._id);
          }
        }, '#self-card');
        cardList.addItem(newCard.generate(res.owner._id));
        this.closePopup();
      })
      .catch(err => {
        console.log(`Ошибка при отправке карточки: ${err}`);
      })
      .finally(() => {
        addNewCardPopup.deleteLoading('Создать');
      });
  }
}, '#add-card');

const editUserInfoPopup = new PopupWithForm({
  formSubmitHandler: function(inputValues) {
    const nameProfile = inputValues.nickname;
    const jobProfile = inputValues.text;
    editUserInfoPopup.addLoading();
    api.changeProfile(nameProfile, jobProfile)
      .then(res => {
        profile.setUserInfo({
          name: res.name, 
          about: res.about
        })
        this.closePopup();
      })
      .catch(err => {
        console.log(`Ошибка при редактировании профиля: ${err}`);
      })
      .finally(() => {
        editUserInfoPopup.deleteLoading('Сохранить');
      });
  }
}, '#edit-info')

const changeAvatarPopup = new PopupWithForm({
  formSubmitHandler: function(inputValues) {
    const avatarUrl = inputValues.urlAvatar;
    changeAvatarPopup.addLoading();
    api.changeAvatar(avatarUrl)
      .then(res => {
        avatar.src = res.avatar;
        this.closePopup();
      })
      .catch(err => {
        console.log(`Ошибка при обновлении аватара: ${err}`);
      })
      .finally(() => {
        changeAvatarPopup.deleteLoading('Сохранить');
      });
  }
}, '#edit-avatar');

const userInfoFormValidator = new FormValidator(validationConfig, editUserInfoPopup.getFormElement());
const userAvatarFormValidator = new FormValidator(validationConfig, changeAvatarPopup.getFormElement());
const addCardFormValidator = new FormValidator(validationConfig, addNewCardPopup.getFormElement());

userInfoFormValidator.enableValidation();
addCardFormValidator.enableValidation();
userAvatarFormValidator.enableValidation();

editUserInfoPopup.setEventListeners();
buttonEdit.addEventListener('click', function() {
  nameInput.value = profile.getUserInfo().name;
  jobInput.value = profile.getUserInfo().about;
  userInfoFormValidator.resetValidation();
  editUserInfoPopup.open();
});

addNewCardPopup.setEventListeners();
buttonPlus.addEventListener('click', () => {
  addCardFormValidator.resetValidation();
  addNewCardPopup.open();
});


changeAvatarPopup.setEventListeners();
buttonEditAvatar.addEventListener('click', () => {
  userAvatarFormValidator.resetValidation();
  changeAvatarPopup.open();
});
