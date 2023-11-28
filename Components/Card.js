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
      this._handlelikeButton(likeButton);
    });
    //.card__delete-button
    const deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    deleteButton.addEventListener("click", () => {
      this._handledeleteButton(this._cardElement);
    });
    //.card__image
    const cardImage = this._cardElement.querySelector(".card__image");
    cardImage.addEventListener("click", () => {
      //this._handleImageClick();

      //Cannot get this class to call the function I passed in
      this._handleImageClick(this);
    });
  }

  _handledeleteButton(cardElement) {
    cardElement.remove();
    cardElement = null;
  }

  _handlelikeButton(likebutton) {
    console.log("this function is being called");
    likebutton.classList.toggle("card__like-button_active");
  }

  // _handleImageClick() {
  //   //TODO: open the image modal and pass in the current image data to the image modal
  //   const imageModal = document.querySelector(".image-modal");
  //   const popupImageElement = document.querySelector(
  //     ".image-modal__image-element"
  //   );
  //   const popupImageTextElement = document.querySelector(".image-modal__text");

  //   popupImageElement.setAttribute("src", this.link);
  //   popupImageElement.setAttribute("alt", this.name);
  //   popupImageTextElement.textContent = this.name;

  //   this._openModal(imageModal);
  // }

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

  // _openModal(popup) {
  //   popup.classList.add("modal_opened");
  //   document.addEventListener("keydown", this.closeOnEscape);
  // }

  // _closeModal(popup) {
  //   popup.classList.remove("modal_opened");
  //   document.removeEventListener("keydown", this.closeOnEscape);
  // }

  closeOnEscape(e) {
    if (e.key === "Escape") {
      const openModal = document.querySelector(".modal_opened");
      _closeModal(openModal);
    }
  }
}
