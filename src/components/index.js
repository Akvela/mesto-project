import '../pages/index.css';
import { createCard, cardsContainer, initialCards } from './card.js';
import { editProfile, addNewCard, formCardElement, formInfoElement, jobProfile, popupAddPlace, buttonEdit, popupEdit, nameProfile, buttonPlus, nameInput, jobInput } from './modal.js';
import { closePopup, openPopup } from './utils.js';
import { enableValidation, validationConfig } from './validate.js';


const newCards = initialCards.map(function(item) {
  return createCard(item.name, item.link);
});
cardsContainer.prepend(...newCards);

formInfoElement.addEventListener('submit', editProfile);

formCardElement.addEventListener('submit', addNewCard);

buttonEdit.addEventListener('click', function() {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  openPopup(popupEdit);
});

buttonPlus.addEventListener('click', function() {
  openPopup(popupAddPlace);
});

const buttonsExit = document.querySelectorAll('.popup__exit-button');

buttonsExit.forEach(function(button) {
  button.addEventListener("click", function() {
    closePopup(button.closest('.popup'));
  });
});

enableValidation(validationConfig);