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
  editAvatarFormElement,
  editProfileFormElement,
  editProfileButton,
} from "../utils/Constants.js";
import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import { Api } from "../components/Api.js";
import DeleteConfirmationPopup from "../components/DeleteConfirmationPopup.js";

const handleImageClick = (data) => {
  imagePopup.open(data);
};

const createCard = (cardData) => {
  const card = new Card(
    cardData,
    selectors.Cardtemplate,
    handleImageClick,
    function handleDeleteModal() {
      deleteCardForm.open();

      deleteCardForm.setSubmitAction(() => {
        deleteCardForm.renderLoading(true, "Deleting...");
        api
          .deleteCard(card.id)
          .then((res) => {
            console.log("The delete card function is being called");
            // delete the card element
            card.deleteCard();
          })
          .then(() => {
            deleteCardForm.close();
          })
          .finally(() => {
            deleteCardForm.renderLoading(false);
          })
          .catch((res) => {
            console.log(`There is an error in the program: ${res}`);
          });
      });
    },
    function addLikeButton() {
      api
        .addLike(card.id)
        .then((res) => {
          card.isLiked = res.isLiked;
          card.addLikeButtonElement();
        })
        .catch((res) => {
          console.log(`There is an error in the program: ${res}`);
        });
    },
    function removeLikeButton() {
      api
        .removeLike(card.id)
        .then((res) => {
          card.isLiked = res.isLiked;
          card.removeLikeButtonElement();
        })
        .catch((res) => {
          console.log(`There is an error in the program: ${res}`);
        });
    }
  );
  //card.isLiked = false;
  return card.getView();
};

//-----------------------------------------------------------
//Objects
//----------------------------------------------------------

//Add Card object
const addCardObject = {
  popupSelector: "#add-card-modal",
  handleFormSubmit: (inputValues) => {
    addCardForm.renderLoading(true, "Saving...");
    api
      .addCard(inputValues.name, inputValues.link)
      .then((res) => {
        // cardElement = createCard(inputValues);
        // const cardElement = createCard(inputValues);
        const cardElement = createCard(res);
        // addCardForm.popupForm.reset();
        // addCardFormValidator.toggleButtonState();
        cardSelection.addItem(cardElement);
      })
      .then(() => {
        addCardForm.close();
        addCardForm.popupForm.reset();
        addCardFormValidator.toggleButtonState();
      })
      .finally(() => {
        addCardForm.renderLoading(false);
      })
      .catch((res) => {
        console.log(`There is an error in the program: ${res}`);
      });
  },
};
//the edit profile object
const editProfileObject = {
  popupSelector: "#edit-modal",
  handleFormSubmit: (inputValues) => {
    editProfileForm.renderLoading(true, "Saving...");
    api
      .editProfile(inputValues.profileName, inputValues.profileJob)
      .then((res) => {
        userProfile.setUserInfo(
          inputValues.profileName,
          inputValues.profileJob
        );

        console.log(res);
      })
      .then((res) => {
        editProfileForm.popupForm.reset();
        editProfileFormValidator.toggleButtonState();
        editProfileForm.close();
      })
      .finally(() => {
        editProfileForm.renderLoading(false);
      })
      .catch((res) => {
        console.log(`There is an error in the program: ${res}`);
      });
  },
};

const deleteCardObject = {
  popupSelector: "#delete-card-modal",
};

const editAvatarObject = {
  popupSelector: "#edit-profile-avatar-modal",
  handleFormSubmit: (inputValues) => {
    editProfileAvatarForm.renderLoading(true, "Saving...");
    api
      .updateProfilePicture(inputValues.avatar)
      .then((res) => {
        userProfile.setUserAvatar(inputValues.avatar);

        console.log(res);
      })
      .then(() => {
        editProfileAvatarForm.close();
        editProfileAvatarForm.popupForm.reset();
        editAvatarFormValidator.toggleButtonState();
      })
      .finally(() => {
        editProfileAvatarForm.renderLoading(false);
      })
      .catch((res) => {
        console.log(`There is an error in the program: ${res}`);
      });
  },
};

const editAvatarObjectHandleSubmit = {
  popupSelector: "#edit-profile-avatar-modal",
  handleFormSubmit: (inputValues) => {
    handleSubmit(
      () => {
        api
          .updateProfilePicture(inputValues.avatar)
          .then((res) => {
            userProfile.setUserAvatar(inputValues.avatar);

            console.log(res);
          })
          .then(() => {
            editProfileAvatarForm.close();
            editProfileAvatarForm.popupForm.reset();
            editAvatarFormValidator.toggleButtonState();
          })
          .finally(() => {
            editProfileAvatarForm.renderLoading(false);
          })
          .catch((res) => {
            console.log(`There is an error in the program: ${res}`);
          });
      },
      editProfileAvatarForm,
      "Saving..."
    );
  },
};
//---------------------------------------------------------------------------------------------------------------------
//set up all the classes
//---------------------------------------------------------------------------------------------------------------------
const imagePopup = new PopupWithImage(ImagePopupSelector);
const userProfile = new UserInfo(
  ".profile__header",
  ".profile__subheader",
  ".profile__picture_image"
);
const addCardFormValidator = new FormValidator(config, addCardFormElement);
const addCardForm = new PopupWithForm(addCardObject);
const editProfileFormValidator = new FormValidator(
  config,
  editProfileFormElement
);
const editProfileForm = new PopupWithForm(editProfileObject);
let cardSelection;
const deleteCardForm = new DeleteConfirmationPopup(deleteCardObject);
const editProfileAvatarForm = new PopupWithForm(editAvatarObject);
const editAvatarFormValidator = new FormValidator(
  config,
  editAvatarFormElement
);
//--------------------------------------------------------------------------------------------
//Adding functionality to index.js
//---------------------------------------------------------------------------------------
editProfileAvatarForm.setEventListeners();
deleteCardForm.setEventListeners();
addCardForm.setEventListeners();
editProfileForm.setEventListeners();
imagePopup.setEventListeners();
editAvatarFormValidator.enableValidation();
editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();
//-----------------------------------------------------------------------------------------------
//event listeners
//-----------------------------------------------------------------------------------------------
addCardButton.addEventListener("click", () => {
  addCardForm.open();
});

editProfileButton.addEventListener("click", () => {
  const { name, job } = userProfile.getUserInfo();
  console.log(userProfile.getUserInfo());
  nameInput.value = name;
  jobInput.value = job;
  editProfileForm.open();
});
imageProfileAvatar.addEventListener("click", () => {
  console.log("Image profile avatar is being clicked");
  editProfileAvatarForm.open();
});
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
api
  .loadUserInfo()
  .then(({ name, about, avatar }) => {
    userProfile.setUserInfo(name, about);
    userProfile.setUserAvatar(avatar);
  })
  .catch((res) => {
    console.log(`There is an error in the program: ${res}`);
  });
api
  .getInitialCards()
  .then((cards) => {
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
    cardSelection.renderItems();
  })
  .catch((res) => {
    console.log(`There is an error in the program: ${res}`);
  });

function handleSubmit(request, popupInstance, loadingText = "Saving...") {
  // here we change the button text
  popupInstance.renderLoading(true, loadingText);
  request()
    .then(() => {
      // We need to close only in `then`
      popupInstance.close();
    })
    // we need to catch possible errors
    // console.error is used to handle errors if you don’t have any other ways for that
    .catch(console.error)
    // in `finally` we need to return the initial button text back in any case
    .finally(() => {
      popupInstance.renderLoading(false);
    });
}
