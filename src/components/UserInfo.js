export default class UserInfo {
  constructor({selectorName, selectorAbout, selectorAvatar, ownerId}) {
    this._userName = document.querySelector(selectorName);
    this._userAbout = document.querySelector(selectorAbout);
    this._userAvatar = document.querySelector(selectorAvatar);
    this.ownerId = ownerId;
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      about: this._userAbout.textContent
    }
  }

  setUserInfo({ name, about, avatar}, id) {
    if (avatar) {
      this._userAvatar.setAttribute('src', avatar);
    }

    if (name) {
      this._userName.textContent = name;
    }

    if (about) {
      this._userAbout.textContent = about;
    }

    if (id) {
      this.ownerId = id;
    }
  }
}