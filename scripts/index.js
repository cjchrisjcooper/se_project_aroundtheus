// finding all the modal elements in the DOM
const editProfilemodal = document.querySelector("#edit-modal");
const editProfileFormElement = editProfilemodal.querySelector(".modal__form");
const addCardModal = document.querySelector("#add-card-modal");
const addCardModalSubmitButton = addCardModal.querySelector(
  ".modal__save-button"
);
const modalOverlays = document.querySelectorAll(".modal");
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

//card template element
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
//This is the element where we will place alll of our cards
const cardsListElement = document.querySelector(".cards__list");
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
const popupImageElement = document.querySelector(".image-modal__image-element");
const imageModalContainerElement = document.querySelector(
  ".image-modal__container"
);
const popupImageTextElement = document.querySelector(".image-modal__text");

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

function closeOnEscape(e) {
  const openModal = document.querySelector(".modal_opened");
  if (e.key === "Escape") {
    closeModal(openModal);
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

editProfilemodal.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("modal")) {
    closeModal(editProfilemodal);
  }
});

imageModal.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("modal")) {
    closeModal(imageModal);
  }
});

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
  renderCard(cardData);
  addCardTitleInput.value = "";
  addCardImgUrlInput.value = "";
  //addCardModalSubmitButton.classList.add("modal__button_disabled");

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

//the function creates a card and adds it to the beginnnig of the card list element.
function renderCard(cardData) {
  const cardElement = getCardElement(cardData);
  cardsListElement.prepend(cardElement);
}

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
    console.log("image is being clicked");
    openModal(imageModal);
    popupImageElement.setAttribute("src", cardData.link);
    popupImageElement.setAttribute("alt", cardData.name);
    popupImageTextElement.textContent = cardData.name;
  });
  //set the data in the card to the object data in our collection
  cardImageEL.setAttribute("src", cardData.link);
  cardImageEL.setAttribute("alt", cardData.name);
  cardTitleEL.textContent = cardData.name;
  return cardElement;
}

// loops

initialCards.forEach((cardData) => {
  renderCard(cardData);
});
