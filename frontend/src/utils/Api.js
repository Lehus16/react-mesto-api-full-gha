


class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.autorization = options.headers.authorization;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      credentials: 'include',
    }).then((res) => this._checkResponse(res));
  }

  patchUserInfo(data) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => this._checkResponse(res));
  }

  patchUserAvatar(data) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then((res) => this._checkResponse(res));
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'GET',
      credentials: 'include',
    }).then((res) => this._checkResponse(res));
  }

  postNewCard(data) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => this._checkResponse(res));
  }

  deleteCard(item) {
    return fetch(`${this.baseUrl}/cards/${item._id}`, {
      method: 'DELETE',
      credentials: 'include',
    }).then((res) => this._checkResponse(res));
  }

  putCardLike(item) {
    return fetch(`${this.baseUrl}/cards/${item._id}/likes`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    }).then((res) => this._checkResponse(res));
  }

  deleteCardLike(item) {
    return fetch(`${this.baseUrl}/cards/${item._id}/likes`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    }).then((res) => this._checkResponse(res));
  }

  changeLikeCardStatus(item, isLiked) {
    if (isLiked) {
      return this.deleteCardLike(item);
    } else {
      return this.putCardLike(item);
    }
  }
}


const myApi = new Api({
  baseUrl: 'https://api.lehus.mesto.nomoredomainsmonster.ru',
  credentials: 'include',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

export default myApi;
