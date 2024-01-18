class AuthApi {
  constructor(options) {
    this.baseUrl = options.baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  signIn(data) {
    return fetch(`${this.baseUrl}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    }).then((res) => this._checkResponse(res));
  }

  signUp(data) {
    return fetch(`${this.baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    }).then((res) => this._checkResponse(res));
  }

  signOut() {
    return fetch(`${this.baseUrl}/signout`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then((res) => this._checkResponse(res));
  }
  // Проверка токена если тот сохраняется в загаловке.
  // checkToken(token) {
  //   return fetch(`${this.baseUrl}/users/me`, {
  //     method: 'GET',
  //     headers: {
  //       'authorization': `Bearer ${token}`,
  //       'Content-Type': this.contentType,
  //     },
  //   }).then((res) => this._checkResponse(res));
  // }

}



const myAuthApi = new AuthApi({
  baseUrl: 'https://api.lehus.mesto.nomoredomainsmonster.ru',
  credentials: 'include',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
})


export default myAuthApi;
