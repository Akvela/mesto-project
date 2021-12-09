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

function createCard(name, link) {
  const cardElement = cardTemplate.querySelector('.cards__item').cloneNode(true);
  const buttonDelete = cardElement.querySelector('.cards__trash-button');
  const buttonLike = cardElement.querySelector('.cards__like-button');
  const cardPhoto = cardElement.querySelector('.cards__photo');
  const cardName = cardElement.querySelector('.cards__name');

  cardPhoto.src = link;
  cardPhoto.alt = name;
  cardName.textContent = name;

  buttonLike.addEventListener('click', pressLike);
  buttonDelete.addEventListener('click', deleteCard);
  cardPhoto.addEventListener('click', showPhoto);

  return cardElement;
}

function pressLike(event) {
  event.target.classList.toggle('cards__like-button_active');
};

function deleteCard(event) {
  event.target.closest('.cards__item').remove();
};

const newCards = initialCards.map(function(item) {
  return createCard(item.name, item.link);
});
cardsContainer.prepend(...newCards);

const buttonEdit = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('#edit-info');
const buttonPlus = document.querySelector('.profile__add-button');
const popupAddPlace = document.querySelector('#add-card');
const popupPhoto = document.querySelector('#popup-image');
const nameProfile = document.querySelector('.profile__nickname');
const jobProfile = document.querySelector('.profile__text');

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

buttonEdit.addEventListener('click', function() {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  openPopup(popupEdit);
});
buttonPlus.addEventListener('click', function() {
  openPopup(popupAddPlace);
});

const formInfoElement = document.querySelector('[name="form-info"]');
const nameInput = document.querySelector('[name="nickname"]');
const jobInput = document.querySelector('[name="text"]');

function editProfile(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup(popupEdit);
}

formInfoElement.addEventListener('submit', editProfile);

const formCardElement = document.querySelector('[name="form-place"]');
const placeInput = document.querySelector('[name="place"]');
const urlCardInput = document.querySelector('[name="url-card"]');

formCardElement.addEventListener('submit', addNewCard);

function addNewCard(evt) {
  evt.preventDefault();
  cardsContainer.prepend(createCard(placeInput.value, urlCardInput.value));
  closePopup(popupAddPlace);
}

const popupUrl = document.querySelector('.popup__image');
const popupName = document.querySelector('.popup__name');

function showPhoto(event) {
  popupUrl.src = event.target.src;
  popupUrl.alt = event.target.alt;
  popupName.textContent = event.target.alt;
  openPopup(popupPhoto);
};

const buttonsExit = document.querySelectorAll('.popup__exit-button');

buttonsExit.forEach(function(button) {
  button.addEventListener("click", function() {
    closePopup(button.closest('.popup'));
  });
});