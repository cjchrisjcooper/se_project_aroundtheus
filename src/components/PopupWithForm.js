import { Popup } from "../components/Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handFormSubmit = handleFormSubmit;
    console.log(this._popupForm);
  }

  _getInputValues() {
    const inputValues = this._popupForm.querySelectorAll(".modal__input");
    console.log(inputValues);
    const inputObj = {};
    inputValues.forEach((input) => {
      inputObj[input.name] = input.value;
    });

    return inputObj;
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", this._handFormSubmit);
    super.setEventListeners();
  }
}
