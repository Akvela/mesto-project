const config = {
  url: 'https://nomoreparties.co/v1/plus-cohort7',
  headers: {
    authorization: '8ced4900-b351-425e-b929-76d82504c0ac',
    'Content-Type': 'application/json'
  }
};

export class Api {
  constructor(options) {
    this._url = options.baseUrl,
    this._headers = options.headers
  }
  _responseHandler(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(err);
    }
  }

  getProfile() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    })
      .then(res => this._responseHandler(res));
  }

  changeProfile = (name, about) => {
    const info = {
      name: name,
      about: about
    };
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(info)
    })
      .then(res => this._responseHandler(res));
  }

  getItems() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
    })
      .then(res => this._responseHandler(res));
  }

  createItem = (item, link) => {
    const data = {
      name: item,
      link: link
    };
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then(res => this._responseHandler(res));
  }
}



const parseResponce = (res) => {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(new Error(`Произошла ошибка со статус-кодом ${res.status}`));
};

export const createItem = (item, link) => {
  const data = {
    name: item,
    link: link
  };
  return fetch(`${config.url}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify(data)
  })
    .then(res => parseResponce(res))
};

export const deleteItem = (id) => {
  return fetch(`${config.url}/cards/${id}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then((res) => parseResponce(res))
};

export const addLikes = (id) => {
  return fetch(`${config.url}/cards/likes/${id}`, {
    method: 'PUT',
    headers: config.headers,
  })
    .then(res => parseResponce(res))
};

export const deleteLikes = (id) => {
  return fetch(`${config.url}/cards/likes/${id}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then(res => parseResponce(res))
};

export const changeAvatar = (item) => {
  const picture = {
    avatar: item
  };
  return fetch(`${config.url}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify(picture)
  })
    .then(res => parseResponce(res))
};