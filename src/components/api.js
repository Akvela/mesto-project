const config = {
  url: 'https://nomoreparties.co/v1/plus-cohort7',
  headers: {
    authorization: '8ced4900-b351-425e-b929-76d82504c0ac',
    'Content-Type': 'application/json'
  }
};

const parseResponce = (res) => {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(new Error(`Произошла ошибка со статус-кодом ${res.status}`));
};

export const getProfile = () => {
  return fetch(`${config.url}/users/me`, {
    headers: config.headers,
  })
    .then(res => parseResponce(res))
};

export const changeProfile = (name, about) => {
  const info = {
    name: name,
    about: about
  };
  return fetch(`${config.url}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify(info)
  })
    .then(res => parseResponce(res))
};

export const getItems = () => {
  return fetch(`${config.url}/cards`, {
    headers: config.headers,  
  })
    .then(res => parseResponce(res))
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