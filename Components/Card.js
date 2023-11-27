export default class Card {
  constructor(data, cardSelector, cardLocation) {
    this.name = data.name;
    this.link = data.link;
    this.cardSelector = cardSelector;
    this.cardLocation = cardLocation;
  }

  _setEventListeners(cardElement) {
    //.card__like-button
    const likeButton = cardElement.querySelector(".card__like-button");
    likeButton.addEventListener("click", () => {
      this._handlelikeButton(likeButton);
    });
    //.card__delete-button
    const deleteButton = cardElement.querySelector(".card__delete-button");
    deleteButton.addEventListener("click", () => {
      this._handledeleteButton(cardElement);
    });
    //.card__image
    const cardImage = cardElement.querySelector(".card__image");
    //console.log(this.link);
    cardImage.addEventListener("click", () => {
      this._handleImageClick();
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

  _handleImageClick() {
    //TODO: open the image modal and pass in the current image data to the image modal
    const imageModal = document.querySelector(".image-modal");
    const popupImageElement = document.querySelector(
      ".image-modal__image-element"
    );
    const popupImageTextElement = document.querySelector(".image-modal__text");

    popupImageElement.setAttribute("src", this.link);
    popupImageElement.setAttribute("alt", this.name);
    popupImageTextElement.textContent = this.name;
    imageModal.classList.add("modal_opened");
    document.addEventListener("keydown", this.closeOnEscape);
  }

  getView() {
    //get the card view and it's elements
    const cardTemplate = document.querySelector(this.cardSelector).content
      .firstElementChild;
    this.cardElement = cardTemplate.cloneNode(true);
    const cardImageElement = this.cardElement.querySelector(".card__image");
    const cardTitleElement = this.cardElement.querySelector(".card__title");
    //use private method set event listeners
    this._setEventListeners(this.cardElement);
    //set the elements in hte card element to the properties of this class
    cardImageElement.setAttribute("src", this.link);
    cardImageElement.setAttribute("alt", this.name);
    cardTitleElement.textContent = this.name;
    //return the card
    this._renderCard(this.cardLocation);
    return this.cardElement;
  }

  _renderCard(cardLocation) {
    const cardsListElement = document.querySelector(cardLocation);
    cardsListElement.prepend(this.cardElement);
  }

  _openModal(popup) {
    popup.classList.add("modal_opened");
    document.addEventListener("keydown", this.closeOnEscape);
  }

  _closeModal(popup) {
    popup.classList.remove("modal_opened");
    document.removeEventListener("keydown", this.closeOnEscape);
  }

  closeOnEscape(e) {
    if (e.key === "Escape") {
      const openModal = document.querySelector(".modal_opened");
      _closeModal(openModal);
    }
  }
}
