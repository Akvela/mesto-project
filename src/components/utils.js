const buttonEscKeyCode = 27;

function closePopup(popup) {
  document.removeEventListener('keydown', handleEscUp);
  popup.removeEventListener('click', handleClickOverlay);
  popup.classList.remove('popup_opened');
};

const handleEscUp = (evt) => {
  if (evt.keyCode == buttonEscKeyCode) {
    evt.preventDefault();
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  };
};

const handleClickOverlay = (evt) => {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__exit-button')) {
    closePopup(evt.currentTarget);
  };
};

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscUp);
  popup.addEventListener('click', handleClickOverlay);
};

export { closePopup, openPopup };