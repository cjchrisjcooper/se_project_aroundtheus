//"Components" has been renamed to "components in github"
//my computer throws an error when I import in "index.js"
export default class Card {
  constructor(
    { isLiked, name, link, _id },
    cardSelector,
    handleImageClick,
    openDeleteForm,
    addLikeButton,
    removeLikeButton
  ) {
    this.name = name;
    this.link = link;
    this._isLiked = isLiked;
    this.id = _id;
    this.cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._addLikeButton = addLikeButton;
    this._removeLikeButton = removeLikeButton;
    this.openDeleteForm = openDeleteForm;
    this._popupDeleteForm = document.querySelector("#delete-card-modal");
  }

  _setEventListeners() {
    // if (this._isLiked == true) {
    //   this._addLikeButtonElement();
    // } else {
    //   this._removeLikeButtonElement();
    // }
    //.card__like-button
    this.likeButton.addEventListener("click", () => {
      console.log("the like button has been pressed");
      console.log(this._isLiked);
      if (this._isLiked == false) {
        console.log("the person has liked this post");
        this._addLikeButton(this);
        this._addLikeButtonElement();
      }

      if (this._isLiked == true) {
        console.log("the person has doesn't like this post");
        this._removeLikeButton(this);
        this._removeLikeButtonElement();
      }
    });
    //.card__delete-button
    const deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    deleteButton.addEventListener("click", () => {
      console.log("button is being pressed");
      this.openDeleteForm(this);
      // this._handleCardDelete(this.id);
    });
    //.card__image
    this.cardImageElement.addEventListener("click", () => {
      this._handleImageClick(this);
    });
  }

  _likeStatus() {
    if (this.isLiked) {
      this._removeLikeButton(this);
    } else {
      this._addLikeButton(this);
    }
  }
  _addLikeButtonElement() {
    this.likeButton.classList.add("card__like-button_active");
  }
  _removeLikeButtonElement() {
    this.likeButton.classList.remove("card__like-button_active");
  }

  _toggleLikeButton() {
    this.likeButton.classList.toggle("card__like-button_active");
  }

  deleteCard() {
    this._cardElement.remove();
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
    this._setEventListeners();
    //set the elements in hte card element to the properties of this class
    this.cardImageElement.setAttribute("src", this.link);
    this.cardImageElement.setAttribute("alt", this.name);
    this.cardTitleElement.textContent = this.name;
    if (this._isLiked == true) {
      this._addLikeButtonElement();
    } else {
      this._removeLikeButtonElement();
    }
    return this._cardElement;
  }
}
