//"Components" has been renamed to "components in github"
//my computer throws an error when I import in "index.js"
export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this.name = data.name;
    this.link = data.link;
    this.cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    //.card__like-button
    this.likeButton.addEventListener("click", () => {
      this._handleLikeButton();
    });
    //.card__delete-button
    const deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    deleteButton.addEventListener("click", () => {
      this._handleDeleteButton();
    });
    //.card__image
    const cardImage = this._cardElement.querySelector(".card__image");
    cardImage.addEventListener("click", () => {
      this._handleImageClick(this);
    });
  }

  _handleDeleteButton() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _handleLikeButton() {
    this.likeButton.classList.toggle("card__like-button_active");
  }

  getView() {
    //get the card view and it's elements
    const cardTemplate = document.querySelector(this.cardSelector).content
      .firstElementChild;
    this._cardElement = cardTemplate.cloneNode(true);
    this.cardImageElement = this._cardElement.querySelector(".card__image");
    this.cardTitleElement = this._cardElement.querySelector(".card__title");
    this.likeButton = this._cardElement.querySelector(".card__like-button");
    //use private method set event listeners
    this._setEventListeners(this._cardElement);
    //set the elements in hte card element to the properties of this class
    this.cardImageElement.setAttribute("src", this.link);
    this.cardImageElement.setAttribute("alt", this.name);
    this.cardTitleElement.textContent = this.name;
    return this._cardElement;
  }
}
