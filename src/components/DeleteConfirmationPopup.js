import { Popup } from "../components/Popup.js";

export default class DeleteConfirmationPopup extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
    this.popupForm = this._popupElement.querySelector(".modal__form");
    console.log(this._popupForm);
    this._modalDeleteButton = this._popupElement.querySelector(
      ".modal__save-button"
    );
  }

  setSubmitAction(action) {
    this._handFormSubmit = action;
  }

  defaultText() {
    this._modalDeleteButton.textContent = "Yes";
  }

  deleteText() {
    this._modalDeleteButton.textContent = "Deleting...";
  }

  setEventListeners() {
    super.setEventListeners();
    this.popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.handleFormSubmit;
    });
  }
}
