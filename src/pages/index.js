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
  nameInput,
  jobInput,
  buttonEditAvatar,
  buttonEdit,
  buttonPlus,
  validationConfig
} from '../utils/constants.js';
import { toggleLike } from '../utils/utils.js';

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
let userId = '';

const profile = new UserInfo({
  selectorName: '.profile__nickname', 
  selectorAbout: '.profile__text',
  selectorAvatar: '.profile__avatar'
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

const createCard = function({ link, name, _id, likes }, cardSelector) {
  return new Card({
    link, name, _id, likes,
    openPopupHandler: () => popupWithImage.open(link, name),
    toggleLikeHandler: (evt) => toggleLike(evt, _id, api),
    deleteCardHandler: () => {
      confirmPopup.open();
      confirmPopup.setCardId(_id);
    }
  }, cardSelector);
}

Promise.all([api.getProfile(), api.getItems()])
  .then(([userData, cards]) => {
    profile.setUserInfo({
      name: userData.name,
      about: userData.about
    }, userId = userData._id);
    profile.setUserAvatar({ avatar: userData.avatar });
    cardList = new Section({
      items: cards,
      renderer: (item) => {
        const cardSelector = userId === item.owner._id ? '#self-card' : '#card';
        const card = createCard({ ...item }, cardSelector);
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
  submitFormHandler: (inputValues) => {
    const nameItem = inputValues.place;
    const linkItem = inputValues.urlCard;
    addNewCardPopup.addLoading();
    api.createItem(nameItem, linkItem)
      .then(res => {
        const newCard = createCard({ ...res }, '#self-card');
        cardList.addItem(newCard.generate(res.owner._id));
        addNewCardPopup.closePopup();
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
        editUserInfoPopup.closePopup();
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
        profile.setUserAvatar({ avatar: res.avatar });
        changeAvatarPopup.closePopup();
      })
      .catch(err => {
        console.log(`Ошибка при обновлении аватара: ${err}`);
      })
      .finally(() => {
        changeAvatarPopup.deleteLoading('Сохранить');
      });
  }
}, '#edit-avatar');

const formValidators = {}

const enableValidation = (сonfig) => {
  const formList = Array.from(document.querySelectorAll(сonfig.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(сonfig, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationConfig);

editUserInfoPopup.setEventListeners();
buttonEdit.addEventListener('click', function() {
  const {name, about} = profile.getUserInfo();
  nameInput.value = name;
  jobInput.value = about;
  formValidators['form-info'].resetValidation();
  editUserInfoPopup.open();
});

addNewCardPopup.setEventListeners();
buttonPlus.addEventListener('click', () => {
  formValidators['form-place'].resetValidation();
  addNewCardPopup.open();
});

changeAvatarPopup.setEventListeners();
buttonEditAvatar.addEventListener('click', () => {
  formValidators['form-avatar'].resetValidation();
  changeAvatarPopup.open();
});
