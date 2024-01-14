


class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.autorization = options.headers.authorization;
    this.contentType = options.headers['Content-Type'];
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        authorization: this.autorization,
      },
    }).then((res) => this._checkResponse(res));
  }

  patchUserInfo(data) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this.autorization,
        'Content-Type': this.contentType,
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
      headers: {
        authorization: this.autorization,
        'Content-Type': this.contentType,
      },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then((res) => this._checkResponse(res));
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: {
        authorization: this.autorization,
        'Content-Type': this.contentType,
      },
    }).then((res) => this._checkResponse(res));
  }

  postNewCard(data) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this.autorization,
        'Content-Type': this.contentType,
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
      headers: {
        authorization: this.autorization,
        'Content-Type': this.contentType,
      },
    }).then((res) => this._checkResponse(res));
  }

  putCardLike(item) {
    return fetch(`${this.baseUrl}/cards/${item._id}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this.autorization,
        'Content-Type': this.contentType,
      },
    }).then((res) => this._checkResponse(res));
  }

  deleteCardLike(item) {
    return fetch(`${this.baseUrl}/cards/${item._id}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this.autorization,
        'Content-Type': this.contentType,
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
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-71',
  headers: {
    authorization: '229a23af-9dc4-41d6-bbdd-adedac035c83',
    'Content-Type': 'application/json',
  },
});

export default myApi;
