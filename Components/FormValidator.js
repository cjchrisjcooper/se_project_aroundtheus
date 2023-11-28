export default class FormValidator {
  constructor(config, formElement) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formElement = formElement;
  }

  _hideInputError(inputElement) {
    const errorEl = document.querySelector(`#${inputElement.id}-error`);
    //give the inputEl the error class
    inputElement.classList.remove(this._inputErrorClass);
    //give the errorEl the error message
    errorEl.textContent = "";
    errorEl.classList.remove(this._errorClass);
  }

  _showInputError(inputElement) {
    const errorEl = document.querySelector(`#${inputElement.id}-error`);
    //give the inputEl the error class
    inputElement.classList.add(this._inputErrorClass);
    //give the errorEl the error message
    const errorMessage = inputElement.validationMessage;
    errorEl.textContent = errorMessage;
    errorEl.classList.add(this._errorClass);
  }

  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      this._showInputError(inputEl);
    } else {
      this._hideInputError(inputEl);
    }
  }

  _turnButtonActive() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  _turnButtonInActive() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  _hasInvalidOutput() {
    return !this._inputEls.every((inputEl) => inputEl.validity.valid);
  }

  toggleButtonState() {
    if (this._hasInvalidOutput()) {
      this._turnButtonInActive();
    } else {
      this._turnButtonActive();
    }
  }

  _setEventListeners() {
    this._inputEls = [
      ...this._formElement.querySelectorAll(this._inputSelector),
    ];
    this._submitButton = this._formElement.querySelector(
      this._submitButtonSelector
    );
    this.toggleButtonState();
    this._inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", (evt) => {
        this._checkInputValidity(inputEl);
        this.toggleButtonState(this._inputEls, this._submitButton);
      });
    });
  }

  enableValidation() {
    console.log("this function is being called");
    this._formElement.addEventListener("submit", (evt) => {
      this.toggleButtonState();
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}
