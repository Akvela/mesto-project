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

const buttonEdit = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('#edit-info')
const buttonExit = document.querySelectorAll('.popup__exit-button');
const buttonPlus = document.querySelector('.profile__add-button')
const popupAddPlace = document.querySelector('#add-card');

buttonEdit.addEventListener('click', function () {
  popupEdit.classList.add('popup_opened');
}); 

buttonPlus.addEventListener('click', function () {
  popupAddPlace.classList.add('popup_opened');
}); 

function closePopup() {
  popupEdit.classList.remove('popup_opened');
  popupAddPlace.classList.remove('popup_opened');
}

for (let i = 0; i < buttonExit.length; i++) { 
  buttonExit[i].addEventListener("click", closePopup); 
} 

const formElement = document.querySelector('[name="form-info"]');
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

formElement.addEventListener('submit', formSubmitHandler); 

