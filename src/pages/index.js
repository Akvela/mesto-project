import './index.css';
import { enableValidation, validationConfig } from '../components/validate.js';
import { Api } from '../components/Api.js';
import Card from '../components/Card1.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm';
import UserInfo from '../components/UserInfo';
import { 
  popupWithPhotoSelector,
  cardsSelector,
  avatar,
  nameInput,
  jobInput,
  buttonEditAvatar,
  buttonEdit,
  buttonPlus
} from '../utils/constants.js';
import { togglerLikeHandler } from '../utils/utils.js';

export let userId;

export const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort7',
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


Promise.all([api.getProfile(), api.getItems()])
  .then(([userData, cards]) => {
    profile.setUserInfo({
      name: userData.name,
      about: userData.about
    })
    userId = userData._id
    avatar.src = userData.avatar;
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
    addNewCardPopup.addLoading();
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
        cardList.addItem(newCard.generate(res.owner._id));
        this.closePopup();
        // disableButton(buttonAddCard, validationConfig)
      })
      .catch(err => {
        console.log(`Ошибка при отправке карточки: ${err}`);
      })
      .finally(() => {
        addNewCardPopup.deleteLoading();
      });
  }
}, '#add-card', '.popup__button_type_create');

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
        // disableButton(buttonSaveAvatar, validationConfig)
      })
      .catch(err => {
        console.log(`Ошибка при редактировании профиля: ${err}`);
      })
      .finally(() => {
        editUserInfoPopup.deleteLoading();
      });
  }
}, '#edit-info', '.popup__button_type_save')

const changeAvatarPopup = new PopupWithForm({
  formSubmitHandler: function(inputValues) {
    const avatarUrl = inputValues.urlAvatar;
    changeAvatarPopup.addLoading();
    api.changeAvatar(avatarUrl)
      .then(res => {
        avatar.src = res.avatar;
        this.closePopup();
        // disableButton(buttonSaveAvatar, validationConfig)
      })
      .catch(err => {
        console.log(`Ошибка при обновлении аватара: ${err}`);
      })
      .finally(() => {
        changeAvatarPopup.deleteLoading();
      });
  }
}, '#edit-avatar', '.popup__button_type_edit');

editUserInfoPopup.setEventListeners();
buttonEdit.addEventListener('click', function() {
  nameInput.value = profile.getUserInfo().name;
  jobInput.value = profile.getUserInfo().about;
  editUserInfoPopup.open();
});

addNewCardPopup.setEventListeners();
buttonPlus.addEventListener('click', () => addNewCardPopup.open());


changeAvatarPopup.setEventListeners();
buttonEditAvatar.addEventListener('click', () => changeAvatarPopup.open());

enableValidation(validationConfig);