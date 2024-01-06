//import all the classes
import "../pages/index.css";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import {
  initialCards,
  selectors,
  imageProfileAvatar,
  nameInput,
  jobInput,
  ImagePopupSelector,
  addCardButton,
  config,
  addCardFormElement,
  editProfileFormElement,
  editProfileButton,
} from "../utils/Constants.js";
import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import { Api } from "../components/Api.js";

const handleImageClick = (data) => {
  imagePopup.open(data);
};

const createCard = (cardData) => {
  const card = new Card(cardData, selectors.Cardtemplate, handleImageClick);
  return card.getView();
};

//-----------------------------------------------------------
//Objects
//----------------------------------------------------------

//Add Card object
const addCardObject = {
  popupSelector: "#add-card-modal",
  handleFormSubmit: (inputValues) => {
    api.addCard(inputValues.name, inputValues.link).then(() => {
      // cardElement = createCard(inputValues);
      const cardElement = createCard(inputValues);
      addCardForm.popupForm.reset();
      addCardFormValidator.toggleButtonState();
      cardSelection.addItem(cardElement);
      addCardForm.close();
    });
  },
};
//the edit profile object
const editProfileObject = {
  popupSelector: "#edit-modal",
  handleFormSubmit: (inputValues) => {
    userProfile.setUserInfo(inputValues.profileName, inputValues.profileJob);
    editProfileForm.popupForm.reset();
    editProfileFormValidator.toggleButtonState();
    editProfileForm.close();
  },
};
//---------------------------------------------------------------------------------------------------------------------
//set up all the classes
//---------------------------------------------------------------------------------------------------------------------
const imagePopup = new PopupWithImage(ImagePopupSelector);
const userProfile = new UserInfo(".profile__header", ".profile__subheader");
const addCardFormValidator = new FormValidator(config, addCardFormElement);
const addCardForm = new PopupWithForm(addCardObject);
const editProfileFormValidator = new FormValidator(
  config,
  editProfileFormElement
);
const editProfileForm = new PopupWithForm(editProfileObject);
let cardSelection;
//--------------------------------------------------------------------------------------------
//Adding functionality to index.js
//---------------------------------------------------------------------------------------

addCardForm.setEventListeners();
addCardFormValidator.enableValidation();
editProfileForm.setEventListeners();
editProfileFormValidator.enableValidation();
imagePopup.setEventListeners();
//-----------------------------------------------------------------------------------------------
//event listeners
//-----------------------------------------------------------------------------------------------
addCardButton.addEventListener("click", () => {
  addCardForm.open();
});

editProfileButton.addEventListener("click", () => {
  api.loadUserInfo().then(({ name, about }) => {
    userProfile.setUserInfo(name, about);
  });

  const { name, job } = userProfile.getUserInfo();
  console.log(userProfile.getUserInfo());
  nameInput.value = name;
  jobInput.value = job;
  editProfileForm.open();
});
// imageProfileAvatar.addEventListener("click", () => {
//   //do something
//   //open the edit profile image modal
// });
//-----------------------------------------------------------------------------------------------
// testing the API
//-----------------------------------------------------------------------------------------------
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "883a5f27-9ca4-4397-af55-ef56c8ad3047",
    "Content-Type": "application/json",
  },
});
api.getInitialCards();
api.getInitialCards().then((cards) => {
  cardSelection = new Section(
    {
      renderer: (item) => {
        const cardElement = createCard(item);
        cardSelection.addItem(cardElement);
      },
      items: cards,
    },
    selectors.CardSelection
  );
  cardSelection.renderItems(cards);
});
