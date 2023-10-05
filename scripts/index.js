// find the form in the DOM
const profileFormElement = document.querySelector(".modal");
const formElement = profileFormElement.querySelector(".modal__form");
// find the form fields in the DOM
const nameInput = profileFormElement.querySelector(".modal__input-title");
const jobInput = profileFormElement.querySelector(".modal__input-description");
// find the profile elements in the DOM
const profileName = document.querySelector(".profile__header");
const profileJob = document.querySelector(".profile__subheader");
//all the buttons we need to open and close the modal
const editProfileModal = document.querySelector(".page__modal");
const editProfileButton = document.querySelector(".profile__edit-button");
const exitProfileButton = document.querySelector(".modal__close-button");
//card template element
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
//This is the element where we will place alll of our cards
const cardsListElement = document.querySelector(".cards__list");
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

function closeModal() {
  editProfileModal.classList.add("page__modal_disabled");
}

editProfileButton.addEventListener("click", function () {
  editProfileModal.classList.remove("page__modal_disabled");
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

exitProfileButton.addEventListener("click", function () {
  closeModal();
});

//prevents defualt behavior of the form. also replaces profile values with the input values we passed in.
//will also close the modal as well
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeModal();
}

//an event listener of the form looking for when it gets submitted.
//We will call the handleProfileFormSubmit() function when this event happens.
formElement.addEventListener("submit", handleProfileFormSubmit);

//this function will clone the template and fill in the template elements with the values from our list
function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEL = cardElement.querySelector(".card__image");
  const cardTitleEL = cardElement.querySelector(".card__title");
  cardImageEL.setAttribute("src", cardData.link);
  cardImageEL.setAttribute("alt", cardData.name);
  cardTitleEL.textContent = cardData.name;
  return cardElement;
}

for (let cardData of initialCards) {
  const cardElement = getCardElement(cardData);
  cardsListElement.prepend(cardElement);
}
