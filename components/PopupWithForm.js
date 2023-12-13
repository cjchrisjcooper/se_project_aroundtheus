import { Popup } from "../components/Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    console.log(this._popupElement);
    this.popupForm = this._popupElement.querySelector(".modal__form");
    this._handFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    const inputValues = this.popupForm.querySelectorAll(".modal__input");
    const inputObj = {};
    inputValues.forEach((input) => {
      inputObj[input.name] = input.value;
    });

    return inputObj;
  }

  setEventListeners() {
    this.popupForm.addEventListener("submit", this._handFormSubmit);
    super.setEventListeners();
  }
}
