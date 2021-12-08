const initialCards = [
  {
    name: 'Коми',
    link: './images/komi.jpg'
  },
  {
    name: 'Карелия',
    link: './images/karelia.jpg'
  },
  {
    name: 'Забайкалье',
    link: './images/zabaikalie.jpg'
  },
  {
    name: 'Якутия',
    link: './images/yakutiya.jpg'
  },
  {
    name: 'Владивосток',
    link: './images/vladivistok.jpg'
  },
  {
    name: 'Карачаево-Черкессия',
    link: './images/karachaevo-cherkesiya.jpg'
  }
]; 

const cardsContainer = document.querySelector('.cards__gallery');
const cardTemplate = document.querySelector('#card').content;
const cardElement = cardTemplate.querySelector('.cards__item');

function addCards(initialCards) {
  initialCards.forEach(function(item) {
    const cardElementCopy = cardElement.cloneNode(true);
    cardElementCopy.querySelector('.cards__name').textContent = item.name;
    cardElementCopy.querySelector('.cards__photo').src = item.link;
    cardsContainer.prepend(cardElementCopy);
  });
}

addCards(initialCards);

const buttonEdit = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('#edit-info');
const buttonExit = document.querySelectorAll('.popup__exit-button');
const buttonPlus = document.querySelector('.profile__add-button');
const popupAddPlace = document.querySelector('#add-card');

buttonEdit.addEventListener('click', function () {
  popupEdit.classList.add('popup_opened');
}); 

buttonPlus.addEventListener('click', function () {
  popupAddPlace.classList.add('popup_opened');
});

const formInfoElement = document.querySelector('[name="form-info"]');
const nameInput = document.querySelector('[name="nickname"]');
const jobInput = document.querySelector('[name="text"]');
const nameProfile = document.querySelector('.profile__nickname');
const jobProfile = document.querySelector('.profile__text');

function formSubmitHandler (evt) {
  evt.preventDefault(); 
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup();
}

formInfoElement.addEventListener('submit', formSubmitHandler); 

const formCardElement = document.querySelector('[name="form-place"]');
const placeInput = document.querySelector('[name="place"]');
const urlCardInput = document.querySelector('[name="url-card"]');

function deleteCard() {
  let buttonDelete = document.querySelectorAll('.cards__trash-button');
  for (let i = 0; i < buttonDelete.length; i++) {
    buttonDelete[i].addEventListener("click", function () {
      buttonDelete[i].closest('.cards__item').remove();
    });
  };
};


function addNewCard (evt) {
  evt.preventDefault();
  cardElementCopy = cardElement.cloneNode(true);
  cardElementCopy.querySelector('.cards__name').textContent = placeInput.value;
  cardElementCopy.querySelector('.cards__photo').src = urlCardInput.value;
  pressLike();
  showPhoto();
  deleteCard();
  cardsContainer.prepend(cardElementCopy);
  pressLike();
  showPhoto();
  deleteCard();
  closePopup();
}

formCardElement.addEventListener('submit', addNewCard);

function pressLike() {
  let buttonLike = document.querySelectorAll('.cards__like-button');
  for (let i = 0; i < buttonLike.length; i++) {
    buttonLike[i].addEventListener("click", function () {
      buttonLike[i].classList.toggle('cards__like-button_active');
    });
  };
};

const popupPhoto = document.querySelector('#popup-image');

function showPhoto() {
  let photoList = document.querySelectorAll('.cards__photo');
  let namePhoto = document.querySelectorAll('.cards__name');

  for (let i = 0; i < photoList.length; i++) {
    photoList[i].addEventListener("click", function () {
      let popupUrl = document.querySelector('.popup__image');
      popupUrl.src = photoList[i].src;
      let popupName = document.querySelector('.popup__name');
      popupName.textContent = namePhoto[i].textContent;
      popupPhoto.classList.add('popup_opened');
      });
    };
  };

function closePopup() {
  popupEdit.classList.remove('popup_opened');
  popupAddPlace.classList.remove('popup_opened');
  popupPhoto.classList.remove('popup_opened');
}

document.addEventListener('DOMContentLoaded', function() {
  for (let i = 0; i < buttonExit.length; i++) {
    buttonExit[i].addEventListener("click", closePopup);
  }
});

showPhoto();
deleteCard();
pressLike();