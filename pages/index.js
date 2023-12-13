//import all the classes
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
  addCardSelector,
  addCardButton,
  config,
  addCardFormElement,
} from "../components/Constants.js";
import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";

console.log(initialCards);

//set up all the classes
const handleImageClick = (data) => {
  ImagePopup.open(data);
};

const handleAddCardFormSubmit = function () {
  const cardData = {
    name: addCardTitleInput.value,
    link: addCardImgUrlInput.value,
  };
  const cardElement = new Card(
    cardData,
    selectors.Cardtemplate,
    handleImageClick
  );
  cardSelection.addItem(cardElement.getView());
};

const ImagePopup = new PopupWithImage(ImagePopupSelector);

const addCardFormValidator = new FormValidator(config, addCardFormElement);
addCardFormValidator.enableValidation();
//problem lies in the "PopupWithForm" class and/or in the handleAddCardFormSubmit() function
const addCardForm = new PopupWithForm(addCardSelector, handleAddCardFormSubmit);
addCardForm.setEventListeners();

addCardButton.addEventListener("click", () => {
  addCardForm.open();
});

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

//initialize all my instances
cardSelection.renderItems(initialCards);

//all the rest
