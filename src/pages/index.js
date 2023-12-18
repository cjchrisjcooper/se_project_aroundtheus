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
  handleFormSubmit: () => {
    const inputValues = addCardForm._getInputValues();
    const cardData = {
      name: inputValues.name,
      link: inputValues.link,
    };
    const cardElement = createCard(cardData);
    addCardTitleInput.value = "";
    addCardImgUrlInput.value = "";
    addCardFormValidator.toggleButtonState();
    cardSelection.addItem(cardElement);
    addCardForm.close();
  },
};
//the edit profile object
const editProfileObject = {
  popupSelector: "#edit-modal",
  handleFormSubmit: () => {
    const editProfileInputValues = editProfileForm._getInputValues();
    userProfile.setUserInfo(
      editProfileInputValues.profileName,
      editProfileInputValues.profileJob
    );
    profileName.textContent = userProfile.profileName;
    profileJob.textContent = userProfile.profileJob;
    // userProfile.setUserInfo(nameInput.value, jobInput.value);
    nameInput.value = "";
    jobInput.value = "";
    editProfileFormValidator.toggleButtonState();
    editProfileForm.close();
  },
};
//---------------------------------------------------------------------------------------------------------------------
//set up all the classes
//---------------------------------------------------------------------------------------------------------------------
const imagePopup = new PopupWithImage(ImagePopupSelector);
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
      // const cardElement = new Card(
      //   item,
      //   selectors.Cardtemplate,
      //   handleImageClick
      // );
      const cardElement = createCard(item);
      cardSelection.addItem(cardElement);
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
imagePopup.setEventListeners();
//-----------------------------------------------------------------------------------------------
//event listeners
//-----------------------------------------------------------------------------------------------
addCardButton.addEventListener("click", () => {
  addCardForm.open();
});

editProfileButton.addEventListener("click", () => {
  const { name, job } = userProfile.getUserInfo();
  nameInput.value = name;
  jobInput.value = job;
  editProfileForm.open();
});
