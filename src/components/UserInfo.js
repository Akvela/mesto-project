export default class UserInfo {
  constructor({selectorName, selectorAbout}) {
    this._userName = document.querySelector(selectorName);
    this._userAbout = document.querySelector(selectorAbout);
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      about: this._userAbout.textContent
    }
  }

  setUserInfo({ name, about }) {
    this._userName.textContent = name;
    this._userAbout.textContent = about;
  }
}