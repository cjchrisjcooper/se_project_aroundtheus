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
    this._handleFormSubmit = action;
  }

  setDefaultText() {
    this._modalDeleteButton.textContent = "Yes";
  }

  setDeleteText() {
    this._modalDeleteButton.textContent = "Deleting...";
  }

  setEventListeners() {
    super.setEventListeners();
    this.popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
    });
  }

  renderLoading(isLoading, loadingText = "Deleting...") {
    console.log("render loading method is being called");
    if (isLoading == true) {
      this._modalDeleteButton.textContent = loadingText;
    } else {
      this._modalDeleteButton.textContent = this._modalDeleteButton;
    }
  }
}
