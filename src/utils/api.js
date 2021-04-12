//класс для подключения api

 class Api {
    //конструктор принимает адрес куда обращаться за данными (или куда их отправлять) и настройки.
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }


    //приватный метод с повтряющимся кодом у всех запросов (то что идет после 1 return)

    _checkResponse(res) {
        if (res.ok) {
            return res.json()
        }

        return Promise.reject(`Сервер недоступен. Ошибка: ${res.status}.`);
    }

    // метод по инициализации карточек с сервера

    getInitialCards() {
       return fetch(`${this._url}cards`, {
             headers: this._headers, 
        }).then(this._checkResponse);
    }

    //метод по добавлению новой карточки

    addNewCard(data) {
        return fetch(`${this._url}cards`, {
              method: 'POST',
              headers: this._headers,
              body: JSON.stringify({
                  name: data.name,
                  link: data.link,
              })
        }).then(this._checkResponse);
    }

    //метод по получению информации о пользователе

    getUserInfo() {
        return fetch(`${this._url}users/me`, {
              headers: this._headers,
        }).then(this._checkResponse);
    }

    //метод по изменению информации о пользователе

    editUserInfo(data) {
        return fetch(`${this._url}users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about,
              })
        }).then(this._checkResponse);
    }

    //метод по смене аватарки

    editUserAvatar(data) {
        return fetch(`${this._url}users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar
              })
        }).then(this._checkResponse);
    }


    //приватный метод по установке лайка

    _putLike(cardId) {
        return fetch(`${this._url}cards/likes/${cardId}/`, {
            method: 'PUT',
            headers: this._headers,
      }).then(this._checkResponse);
    }

    //приватный метод по снятию лайка

    _removeLike(cardId) {
        return fetch(`${this._url}cards/likes/${cardId}/`, {
            method: 'DELETE',
            headers: this._headers,
      }).then(this._checkResponse);
    }


    //Единый метод по установке и снятию лайка

    changeLikeCardStatus(cardId, isLiked) {
        if (isLiked) {
           return this._putLike(cardId);
        }
        else {
            return this._removeLike(cardId);
        }
    }

    //метод по удалению карточки

    deleteCard(cardId) {
        return fetch(`${this._url}cards/${cardId}/`, {
            method: 'DELETE',
            headers: this._headers,
      }).then(this._checkResponse);
    }


}


const api = new Api({
    url: "https://mesto.nomoreparties.co/v1/cohort-20/", 
    headers: {
        "content-type": "application/json",
        "Authorization": "43c52a6d-19a6-461e-b067-2db5e03ba70b",
    }
});

export default api;
