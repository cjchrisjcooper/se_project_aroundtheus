//import all the classes
import "../pages/index.css";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import {
  initialCards,
  selectors,
  addCardImgUrlInput,
  addCardTitleInput,
  profileName,
  profileJob,
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

const handleImageClick = (data) => {
  ImagePopup.open(data);
  ImagePopup.setEventListeners();
};
//-----------------------------------------------------------
//Objects
//----------------------------------------------------------
//Add Card object
const addCardObject = {
  popupSelector: "#add-card-modal",
  handleFormSubmit: () => {
    // const cardData = {
    //   name: addCardTitleInput.value,
    //   link: addCardImgUrlInput.value,
    // };
    const inputValues = addCardForm._getInputValues();
    const cardData = {
      name: inputValues.name,
      link: inputValues.link,
    };
    const cardElement = new Card(
      cardData,
      selectors.Cardtemplate,
      handleImageClick
    );
    addCardTitleInput.value = "";
    addCardImgUrlInput.value = "";
    addCardFormValidator.toggleButtonState();
    cardSelection.addItem(cardElement.getView());
    addCardForm.close();
  },
};
//the edit profile object
const editProfileObject = {
  popupSelector: "#edit-modal",
  handleFormSubmit: () => {
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    userProfile.setUserInfo(nameInput.value, jobInput.value);
    nameInput.value = "";
    jobInput.value = "";
    editProfileFormValidator.toggleButtonState();
    editProfileForm.close();
  },
};
//---------------------------------------------------------------------------------------------------------------------
//set up all the classes
//---------------------------------------------------------------------------------------------------------------------
const ImagePopup = new PopupWithImage(ImagePopupSelector);
// const userProfile = new UserInfo(
//   profileName.textContent,
//   profileJob.textContent
// );
const userProfile = new UserInfo(".profile__header", ".profile__subheader");
const addCardFormValidator = new FormValidator(config, addCardFormElement);
const addCardForm = new PopupWithForm(addCardObject);
const editProfileFormValidator = new FormValidator(
  config,
  editProfileFormElement
);
const editProfileForm = new PopupWithForm(editProfileObject);
const cardSelection = new Section(
  {
    renderer: (item) => {
      const cardElement = new Card(
        item,
        selectors.Cardtemplate,
        handleImageClick
      );
      cardSelection.addItem(cardElement.getView());
    },
    initialCards,
  },
  selectors.CardSelection
);
//--------------------------------------------------------------------------------------------
//Adding functionality to index.js
//---------------------------------------------------------------------------------------
cardSelection.renderItems(initialCards);
addCardForm.setEventListeners();
addCardFormValidator.enableValidation();
editProfileForm.setEventListeners();
editProfileFormValidator.enableValidation();
//-----------------------------------------------------------------------------------------------
//event listeners
//-----------------------------------------------------------------------------------------------
addCardButton.addEventListener("click", () => {
  addCardForm.open();
});

editProfileButton.addEventListener("click", () => {
  nameInput.value = userProfile.profileName;
  jobInput.value = userProfile.profileJob;
  editProfileForm.open();
});
