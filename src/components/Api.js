export default class Api {
  constructor(options) {
    this._url = options.baseUrl,
    this._headers = options.headers
  }
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res.status);
    }
  }

  getProfile() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    })
      .then(res => this._checkResponse(res));
  }

  changeProfile(name, about) {
    const info = {
      name: name,
      about: about
    };
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(info)
    })
      .then(res => this._checkResponse(res));
  }

  getItems() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
    })
      .then(res => this._checkResponse(res));
  }

  createItem(item, link) {
    const data = {
      name: item,
      link: link
    };
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then(res => this._checkResponse(res));
  }

  deleteItem(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then((res) => this._checkResponse(res));
  }

  addLike(id) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: 'PUT',
      headers: this._headers,
    })
      .then(res => this._checkResponse(res));
  }

  deleteLike(id) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(res => this._checkResponse(res));
  }

  changeAvatar(item) {
    const picture = {
      avatar: item
    };
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(picture)
    })
      .then(res => this._checkResponse(res));
  }
}
