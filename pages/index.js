import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
console.log("This file is working");
// finding all the modal elements in the DOM
const editProfilemodal = document.querySelector("#edit-modal");
const editProfileFormElement = editProfilemodal.querySelector(".modal__form");
const addCardModal = document.querySelector("#add-card-modal");
// find the form fields in the DOM
const nameInput = editProfilemodal.querySelector(".modal__input-title");
const jobInput = editProfilemodal.querySelector(".modal__input-description");
// find the profile elements in the DOM
const profileName = document.querySelector(".profile__header");
const profileJob = document.querySelector(".profile__subheader");
//all the buttons we need to open and close the mod
const editProfileButton = document.querySelector(".profile__edit-button");
const exitEditProfileButton = editProfilemodal.querySelector(
  ".modal__close-button"
);
const exitaddCardButton = addCardModal.querySelector(".modal__close-button");

//grabbing the add button in the profile section
const addCardButton = document.querySelector(".profile__add-button");
//all the input fields fromm the add card modal
const addCardTitleInput = addCardModal.querySelector(
  ".modal__input-title_type_title"
);
const addCardImgUrlInput = addCardModal.querySelector(
  ".modal__input-description_type_url"
);
//get all the image modal buttons
const imageModal = document.querySelector(".image-modal");
const imageModalCloseButton = imageModal.querySelector(".modal__close-button");
//list of our cards that we will plug into the html

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

function closeOnEscape(e) {
  if (e.key === "Escape") {
    const openModal = document.querySelector(".modal_opened");
    closeModal(openModal);
  }
}

function closeModalOnClick(evt) {
  if (
    evt.target === evt.currentTarget ||
    evt.target.classList.contains("modal")
  ) {
    closeModal(evt.target);
  }
}

//listener is added when the modal is opened.
function openModal(popup) {
  popup.classList.add("modal_opened");
  document.addEventListener("keydown", closeOnEscape);
}

//listener is removed when the modal is closed.
function closeModal(popup) {
  popup.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeOnEscape);
}

addCardButton.addEventListener("click", function () {
  openModal(addCardModal);
});

editProfileButton.addEventListener("click", function () {
  openModal(editProfilemodal);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

exitEditProfileButton.addEventListener("click", function (evt) {
  closeModal(editProfilemodal);
});

exitaddCardButton.addEventListener("click", function (evt) {
  closeModal(addCardModal);
});

imageModalCloseButton.addEventListener("click", function (evt) {
  closeModal(imageModal);
});

addCardModal.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("modal")) {
    closeModal(addCardModal);
  }
});

editProfilemodal.addEventListener("mousedown", closeModalOnClick);

imageModal.addEventListener("mousedown", closeModalOnClick);

//when the user submits the add-card modal, it will create a card and add it to the beginnnig of the card list element.
addCardModal.addEventListener("submit", handleAddCardFormSubmit);

//an event listener of the form looking for when it gets submitted.
//We will call the handleEditProfileFormSubmit() function when this event happens.
editProfileFormElement.addEventListener("submit", handleEditProfileFormSubmit);

//this function will take the input fields of the form and create a card out of it.
function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const cardData = {
    name: addCardTitleInput.value,
    link: addCardImgUrlInput.value,
  };
  const newCard = new Card(cardData, "#card-template", ".cards__list");
  newCard.getView();
  addCardTitleInput.value = "";
  addCardImgUrlInput.value = "";
  addCardFormValidator.toggleButtonState();
  closeModal(addCardModal);
}

//prevents defualt behavior of the form. also replaces profile values with the input values we passed in.
//will also close the modal as well
function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeModal(editProfilemodal);
}

function renderCard(card, cardLocation) {
  const cardsListElement = document.querySelector(cardLocation);
  cardsListElement.prepend(card.getView());
  console.log("render card is being called");
}

function handleImageClick(cardData) {
  //TODO: open the image modal and pass in the current image data to the image modal
  const imageModal = document.querySelector(".image-modal");
  const popupImageElement = document.querySelector(
    ".image-modal__image-element"
  );
  const popupImageTextElement = document.querySelector(".image-modal__text");

  popupImageElement.setAttribute("src", cardData.link);
  popupImageElement.setAttribute("alt", cardData.name);
  popupImageTextElement.textContent = cardData.name;

  openModal(imageModal);
}

//creating all the cards using a loop and the card class
initialCards.forEach((cardData) => {
  const card = new Card(cardData, "#card-template");
  renderCard(card, ".cards__list", handleImageClick);
});

const addCardForm = document.querySelector("#add-card-form");
const addCardFormValidator = new FormValidator(config, addCardForm);
addCardFormValidator.enableValidation();
const editProfileForm = document.querySelector("#edit-profile-form");
const editFormValidator = new FormValidator(config, editProfileForm);
editFormValidator.enableValidation();
