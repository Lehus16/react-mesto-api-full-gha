class AuthApi {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.contentType = options.headers['Content-Type'];
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
      headers: {
        'Content-Type': this.contentType,
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
        'Content-Type': this.contentType,
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    }).then((res) => this._checkResponse(res));
  }

  checkToken(token) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'authorization': `Bearer ${token}`,
        'Content-Type': this.contentType,
      },
    }).then((res) => this._checkResponse(res));
  }

}



const myAuthApi = new AuthApi({
  baseUrl: 'https://auth.nomoreparties.co',
  headers: {
    authorization: '229a23af-9dc4-41d6-bbdd-adedac035c83',
    'Content-Type': 'application/json',
  },
})


export default myAuthApi;
