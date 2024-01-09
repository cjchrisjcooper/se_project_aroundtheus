import { Popup } from "../components/Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this.popupForm = this._popupElement.querySelector(".modal__form");
    this._handFormSubmit = handleFormSubmit;
    console.log(this._popupForm);
  }

  _getInputValues() {
    const inputValues = this.popupForm.querySelectorAll(".modal__input");
    console.log(inputValues);
    const inputObj = {};
    inputValues.forEach((input) => {
      inputObj[input.name] = input.value;
    });

    return inputObj;
  }

  setEventListeners() {
    this.popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.inputValues = this._getInputValues();
      this._handFormSubmit(this.inputValues);
    });
    super.setEventListeners();
  }
}
