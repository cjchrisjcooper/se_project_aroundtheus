import { Popup } from "../components/Popup.js";

export default class DeleteConfirmationPopup extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
    this.popupForm = this._popupElement.querySelector(".modal__form");
    console.log(this._popupForm);
    this._modalDeleteButton = this._popupElement.querySelector(
      ".modal__save-button"
    );
    this._modalDeleteButtonDefaultText = this._modalDeleteButton.textContent;
  }

  setSubmitAction(action) {
    this._handleFormSubmit = action;
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
      this._modalDeleteButton.textContent = this._modalDeleteButtonDefaultText;
    }
  }
}
