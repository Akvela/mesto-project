let activePopup = document.querySelector('.popup_opened');
const buttonEscKeyCode = 27;

function closePopup(popup) {
  document.removeEventListener('keydown', handleEscUp);
  popup.removeEventListener('click', handleClickOverlay);
  popup.classList.remove('popup_opened');
};

const handleEscUp = (evt) => {
  if (evt.keyCode == buttonEscKeyCode) {
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
  popup.addEventListener('click', handleClickOverlay);
};

export { closePopup, openPopup };