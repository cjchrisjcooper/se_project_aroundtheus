export class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(`${popupSelector}`);
    this._modalCloseButton = this._popupElement.querySelector(
      ".modal__close-button"
    );
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", (evt) => {
      this._handleEscClose(evt);
    });
    this.setEventListeners();
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", (evt) => {
      this._handleEscClose(evt);
    });
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    //this._modalCloseButton.addEventListener("click", this.close(this));
    this._modalCloseButton.addEventListener("click", () => {
      this.close();
    });
    this._popupElement.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("modal")) {
        this.close();
      }
    });
  }
}
