let activePopup = document.querySelector('.popup_opened');

function closePopup(popup) {
  document.removeEventListener('keydown', handleEscUp);
  document.removeEventListener('click', handleClickOverlay);
  popup.classList.remove('popup_opened');
};

const handleEscUp = (evt) => {
  if (evt.keyCode == 27) {
    evt.preventDefault();
    closePopup(activePopup);
  };
};

const handleClickOverlay = (evt) => {
  activePopup = document.querySelector('.popup_opened');
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__exit-button')) {
    closePopup(activePopup);
  };
};


function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscUp);
  document.addEventListener('click', handleClickOverlay);
};

export { closePopup, openPopup };