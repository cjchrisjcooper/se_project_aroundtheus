import { Popup } from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });

    this.popupImageElement = document.querySelector(
      ".image-modal__image-element"
    );
    this.popupImageTextElement = document.querySelector(".image-modal__text");
  }

  open({ name, link }) {
    //TODO: open the image modal and pass in the current image data to the image modal
    this.popupImageElement.setAttribute("src", link);
    this.popupImageElement.setAttribute("alt", name);
    this.popupImageTextElement.textContent = name;

    super.open();
  }
}
