// enabling validation by calling enableValidation()
// pass all the settings on call

function showInputError(formEl, inputEl, options) {
  const errorEl = document.querySelector(`#${inputEl.id}-error`);
  //give the inputEl the error class
  inputEl.classList.add(options.inputErrorClass);
  //give the errorEl the error message
  errorEl.textContent = inputEl.validationMessage;
  errorEl.classList.add(options.errorClass);
}

function hideInputError(formEl, inputEl, options) {
  const errorEl = document.querySelector(`#${inputEl.id}-error`);
  //give the inputEl the error class
  inputEl.classList.remove(options.inputErrorClass);
  //give the errorEl the error message
  errorEl.textContent = "";
  errorEl.classList.remove(options.errorClass);
}

function checkInputValidity(formEl, inputEl, options) {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, options);
  } else {
    hideInputError(formEl, inputEl, options);
  }
}

function TurnButtonInActive(submitButton, options) {
  console.log("TurnButtonInActive is being called");
  submitButton.classList.add(options.inactiveButtonClass);
  submitButton.disabled = true;
}

function TurnButtonActive(submitButton, options) {
  console.log("TurnButtonActive is being called");
  submitButton.classList.remove(options.inactiveButtonClass);
  submitButton.disabled = false;
}

function hasInvalidOutput(inputList) {
  return !inputList.every((inputEl) => inputEl.validity.valid);
}

function toggleButtonState(inputEls, submitButton, options) {
  if (hasInvalidOutput(inputEls)) {
    TurnButtonInActive(submitButton, options);
  } else {
    TurnButtonActive(submitButton, options);
  }
}

const setEventListeners = (formEl, options) => {
  const inputEls = [...formEl.querySelectorAll(options.inputSelector)];
  const submitButton = formEl.querySelector(options.submitButtonSelector);
  toggleButtonState(inputEls, submitButton, options);
  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", (evt) => {
      checkInputValidity(formEl, inputEl, options);
      toggleButtonState(inputEls, submitButton, options);
    });
  });
};

const enableValidation = (options) => {
  const formsEls = [...document.querySelectorAll(options.formSelector)];
  formsEls.forEach((formEl) => {
    formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formEl, options);
    //look for all inputs inside our form
    //loop through all the inputs to see if they are valid
    //input is not valid
    //grab the validation message
    //give input element error class
    //fill span element with error message
    //disable submit button

    //if inputs valid
    //reset error messages
    //enable submit button
  });
};

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

enableValidation(config);
