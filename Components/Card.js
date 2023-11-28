export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this.name = data.name;
    this.link = data.link;
    this.cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    //.card__like-button
    const likeButton = this._cardElement.querySelector(".card__like-button");
    likeButton.addEventListener("click", () => {
      this._handleLikeButton(likeButton);
    });
    //.card__delete-button
    const deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    deleteButton.addEventListener("click", () => {
      this._handleDeleteButton(this._cardElement);
    });
    //.card__image
    const cardImage = this._cardElement.querySelector(".card__image");
    cardImage.addEventListener("click", () => {
      this._handleImageClick(this);
    });
  }

  _handleDeleteButton(cardElement) {
    cardElement.remove();
    cardElement = null;
  }

  _handleLikeButton(likebutton) {
    console.log("this function is being called");
    likebutton.classList.toggle("card__like-button_active");
  }

  getView() {
    //get the card view and it's elements
    const cardTemplate = document.querySelector(this.cardSelector).content
      .firstElementChild;
    this._cardElement = cardTemplate.cloneNode(true);
    const cardImageElement = this._cardElement.querySelector(".card__image");
    const cardTitleElement = this._cardElement.querySelector(".card__title");
    //use private method set event listeners
    this._setEventListeners(this._cardElement);
    //set the elements in hte card element to the properties of this class
    cardImageElement.setAttribute("src", this.link);
    cardImageElement.setAttribute("alt", this.name);
    cardTitleElement.textContent = this.name;
    return this._cardElement;
  }
}
