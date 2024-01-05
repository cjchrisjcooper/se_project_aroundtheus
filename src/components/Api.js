export class Api {
  constructor({ baseUrl, headers }) {
    // constructor body
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getInitialCards() {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      method: "GET",
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("there was an error:" + err);
      });
  }

  // other methods for working with the API
  loadUserInfo() {
    return fetch("https://around-api.en.tripleten-services.com/v1/users/me", {
      method: "GET",
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("there was an error:" + err);
      });
  }

  loadCards() {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      method: "GET",
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("there was an error:" + err);
      });
  }

  editProfile(name, about) {
    return fetch("https://around-api.en.tripleten-services.com/v1/users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("there was an error:" + err);
      });
  }

  addCard(name, link) {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("there was an error:" + err);
      });
  }

  deleteCard(cardId) {
    return fetch(
      `https://around-api.en.tripleten-services.com/v1/cards/${cardId}`,
      {
        method: "DELETE",
        headers: this._headers,
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("there was an error:" + err);
      });
  }

  addLike(cardId) {
    return fetch(
      `https://around-api.en.tripleten-services.com/v1/cards/${cardId}/likes`,
      {
        method: "PUT",
        headers: this._headers,
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("there was an error:" + err);
      });
  }

  removeLike(cardId) {
    return fetch(
      `https://around-api.en.tripleten-services.com/v1/cards/${cardId}/likes`,
      {
        method: "DELETE",
        headers: this._headers,
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("there was an error:" + err);
      });
  }

  updateProfilePicture(imageUrl) {
    return fetch(
      "https://around-api.en.tripleten-services.com/v1/users/me/avatar",
      {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          avatar: imageUrl,
        }),
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("there was an error:" + err);
      });
  }
}
