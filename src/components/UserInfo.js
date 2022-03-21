export default class UserInfo {
  constructor({selectorName, selectorAbout}, getProfile, setProfile) {
    this._name = document.querySelector(selectorName);
    this._about = document.querySelector(selectorAbout);
    this._getProfile = getProfile;
    this._setProfile = setProfile;
  }

  getUserInfo() {
    return this._getProfile()
      .then(userData => {
        this._name.textContent = userData.name;
        this._about.textContent = userData.about;
        userId = userData._id
        document.querySelector('.profile__avatar').src = userData.avatar;
        return userData;
      })
      .catch(err => {
        console.log(`Ошибка: ${err.message}`);
      });
  }

  setUserInfo() {
    const userNameValue = this._name.value;
    const userProfileValue = this._about.value;
    
    this._setProfile(userNameValue, userProfileValue)
      .then(res => {
        this._name.textContent = res.name;
        this._about.textContent = res.about;
        //closePopup(popupEdit);
      })
      .catch(err => {
          console.log('Ошибка при редактировании профиля');
      })
  }
}