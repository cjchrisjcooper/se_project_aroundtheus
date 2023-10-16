// find the form in the DOM
const profileFormElement = document.querySelector(".modal");
const formElement = profileFormElement.querySelector(".modal__form");
const profileAddFormElement = document.querySelector(".form");
const popupImageElement = document.querySelector(".image-popup__image");
//const popupImageContainerElement = document.querySelector(".page__image-popup");
const popupImageContainerElement = document.querySelector(".image-popup");
const popupImageTextElement = document.querySelector(".image-popup__text");
// find the form fields in the DOM
const nameInput = profileFormElement.querySelector(".modal__input-title");
const jobInput = profileFormElement.querySelector(".modal__input-description");
// find the profile elements in the DOM
const profileName = document.querySelector(".profile__header");
const profileJob = document.querySelector(".profile__subheader");
//all the buttons we need to open and close the modal and form
const editProfileModal = document.querySelector(".page__modal");
const editProfileButton = document.querySelector(".profile__edit-button");
const createCardFormButton = document.querySelector(".form__save-button");
const exitProfileButton = document.querySelector(".modal__close-button");
const exitFormButton = document.querySelector(".form__close-button");
const exitPopupImageButton = document.querySelector(
  ".image-popup__close-button"
);
//card template element
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
//This is the element where we will place alll of our cards
const cardsListElement = document.querySelector(".cards__list");
//grabbing the add button in the profile section
const addCardButton = document.querySelector(".profile__add-button");
//all the input fields form the add card form
const addCardTitleInput = document.querySelector(".form__input-title");
const addCardImgUrlInput = document.querySelector(".form__input-Img");

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

function openPopup(popup) {
  popup.classList.add("modal_opened");
}

function closePopup(popup) {
  popup.classList.remove("modal_opened");
}

function openForm(form) {
  form.classList.add("form_opened");
}

function closeForm(form) {
  form.classList.remove("form_opened");
}

function openImage(form) {
  form.classList.add("image-popup_opened");
}

function closeImage(form) {
  form.classList.remove("image-popup_opened");
}

addCardButton.addEventListener("click", function () {
  openForm(profileAddFormElement);
});

exitFormButton.addEventListener("click", function (evt) {
  evt.preventDefault();
  closeForm(profileAddFormElement);
});

editProfileButton.addEventListener("click", function () {
  openPopup(profileFormElement);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

exitProfileButton.addEventListener("click", function () {
  closePopup(profileFormElement);
});

exitPopupImageButton.addEventListener("click", function () {
  closeImage(popupImageContainerElement);
});

createCardFormButton.addEventListener("click", handleAddCardFormSubmit);

//this function will take the input fields of the form and create a card out of it.
function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  //Clone a new card and grab it's elements
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEL = cardElement.querySelector(".card__image");
  const cardTitleEL = cardElement.querySelector(".card__title");
  const cardLikeButtonEl = cardElement.querySelector(".card__like-button");
  const cardDeleteButtonEl = cardElement.querySelector(".card__delete-button");
  //add an event listener to the card will toggle the element between dark and light when the user clicks on it
  cardLikeButtonEl.addEventListener("click", () => {
    cardLikeButtonEl.classList.toggle("card__like-button_active");
  });
  cardDeleteButtonEl.addEventListener("click", () => {
    cardElement.remove();
  });
  cardImageEL.addEventListener("click", function () {
    openImage(popupImageContainerElement);
    popupImageElement.setAttribute("src", addCardImgUrlInput.value);
    popupImageTextElement.textContent = cardData.name;
  });
  //put our input fields into that new card
  cardTitleEL.textContent = addCardTitleInput.value;
  cardImageEL.setAttribute("src", addCardImgUrlInput.value);
  cardImageEL.setAttribute("alt", addCardTitleInput.value);
  //attach that card to the new card list element

  cardsListElement.prepend(cardElement);
  closeForm(profileAddFormElement);
}

//prevents defualt behavior of the form. also replaces profile values with the input values we passed in.
//will also close the modal as well
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(profileFormElement);
}

//an event listener of the form looking for when it gets submitted.
//We will call the handleProfileFormSubmit() function when this event happens.
formElement.addEventListener("submit", handleProfileFormSubmit);

//this function will clone the template and fill in the template elements with the values from our list
function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEL = cardElement.querySelector(".card__image");
  const cardTitleEL = cardElement.querySelector(".card__title");
  const cardLikeButtonEl = cardElement.querySelector(".card__like-button");
  const cardDeleteButtonEl = cardElement.querySelector(".card__delete-button");
  //add an event listener to the card will toggle the element between dark and light when the user clicks on it
  cardLikeButtonEl.addEventListener("click", () => {
    cardLikeButtonEl.classList.toggle("card__like-button_active");
  });
  cardDeleteButtonEl.addEventListener("click", () => {
    cardElement.remove();
  });
  cardImageEL.addEventListener("click", function () {
    openImage(popupImageContainerElement);
    popupImageElement.setAttribute("src", cardData.link);
    popupImageTextElement.textContent = cardData.name;
  });
  //set the data in the card to the object data in our collection
  cardImageEL.setAttribute("src", cardData.link);
  cardImageEL.setAttribute("alt", cardData.name);
  cardTitleEL.textContent = cardData.name;
  return cardElement;
}

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardsListElement.prepend(cardElement);
});
