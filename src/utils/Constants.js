export const initialCards = [
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

export const selectors = {
  CardSelection: "cards__list",
  Cardtemplate: "#card-template",
  ImageModalSelection: "image-modal",
};

const addCardModal = document.querySelector("#add-card-modal");
const editProfilemodal = document.querySelector("#edit-modal");

export const addCardImgUrlInput = addCardModal.querySelector(
  ".modal__input-description_type_url"
);

export const addCardTitleInput = addCardModal.querySelector(
  ".modal__input-title_type_title"
);

//every element needed for the edit form to work
export const profileName = document.querySelector(".profile__header");

export const profileJob = document.querySelector(".profile__subheader");

export const nameInput = editProfilemodal.querySelector(".modal__input-title");

export const jobInput = editProfilemodal.querySelector(
  ".modal__input-description"
);

export const addCardButton = document.querySelector(".profile__add-button");

export const editProfileButton = document.querySelector(
  ".profile__edit-button"
);

export const ImagePopupSelector = {
  popupSelector: ".image-modal",
};

export const addCardSelector = {
  popupSelector: "#add-card-modal",
};

export const addCardFormElement = document.querySelector("#add-card-form");

export const editProfileFormElement = document.querySelector("#edit-modal");

export const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

export const imageProfileAvatar = document.querySelector(".profile__picture");
