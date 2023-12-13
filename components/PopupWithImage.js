import { Popup } from "./Popup.js";

export default class PopupWithImage extends Popup {
  open({ name, link }) {
    //TODO: open the image modal and pass in the current image data to the image modal
    const imageModal = document.querySelector(".image-modal");
    const popupImageElement = document.querySelector(
      ".image-modal__image-element"
    );
    const popupImageTextElement = document.querySelector(".image-modal__text");

    popupImageElement.setAttribute("src", link);
    popupImageElement.setAttribute("alt", name);
    popupImageTextElement.textContent = name;

    super.open(this);
  }
}
