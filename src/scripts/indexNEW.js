//Profile Section Elements
const profileName = document.querySelector("#profileName");
const profileDescription = document.querySelector("#profileDescription");
const profileAvatar = document.querySelector("#profileAvatar");

//Edit Profile Modal Elements
const editProfileButton = document.querySelector(
  '[data-button="edit-profile"]'
);
const editProfileModal = document.querySelector('[data-modal="edit-profile"]');
const editProfileForm = editProfileModal.querySelector("[data-form]");
const editProfileNameInput = editProfileForm.querySelector(
  '[data-input="name"]'
);
const editProfileDescriptionInput = editProfileForm.querySelector(
  '[data-input="description"]'
);
const editProfileSubmitButton = editProfileForm.querySelector(
  '[data-input="submit"]'
);

//New Post Modal Elements
const newPostButton = document.querySelector('[data-button="new-post"]');
const newPostModal = document.querySelector('[data-modal="new-post"]');
const newPostForm = newPostModal.querySelector("[data-form]");
const newPostNameInput = newPostForm.querySelector('[data-input="name"]');
const newPostLinkInput = newPostForm.querySelector('[data-input="link"]');
const newPostSubmitButton = newPostForm.querySelector('[data-button="submit"]');

//Image Preview Modal Eleemnts
const imagePreviewModal = document.querySelector(
  '[data-modal="image-preview"]'
);
const imagePreviewImage = imagePreviewModal.querySelector("#imagePreviewImage");
const imagePreviewCaption = imagePreviewModal.querySelector(
  "#imagePreviewCaption"
);

//Modal Close Buttons
const modalCloseButtons = document.querySelector(
  '[data-button="data-button="close""]'
);

//Card Elements
//const cardsList = []; May need may not
const cardsContainer = document.querySelector('[data-container="cards"]');
const cardsTemplate = document.querySelector("#card-template").content;

//Initial Cards (Will be removed later)
const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Wooldridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
];

//Imports
//Validation
import { validationSettings, resetFormValidation } from "./validation.js";
// also validityCheck, submitValidityCheck, but they weren't used

//Modal click background to close option
document.querySelectorAll("[data-modal]").forEach((modal) => {
  modal.addEventListener("click", (evt) => {
    if (evt.target === evt.currentTarget) {
      closeModal(evt.currentTarget);
    }
  });
});

//Modal Functions - Will switch to class definitions later
const openModal = (modal) => {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalKeydown);
};

const closeModal = (modal) => {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalKeydown);
};

const closeModalKeydown = (evt) => {
  if (evt.key === "Escape") {
    const modal = document.querySelector(".modal_opened");
    if (modal) {
      closeModal(modal);
    }
  }
};

//Edit Profile Functions
const editProfileSetDefault = () => {
  editProfileNameInput.value = profileName.textContent;
  editProfileDescriptionInput.value = profileDescription.textContent;
  const formInputsTemp = [editProfileNameInput, editProfileDescriptionInput];
  resetFormValidation(
    editProfileForm,
    formInputsTemp,
    editProfileSubmitButton,
    validationSettings
  );
};

const editProfileSubmit = (evt) => {
  evt.preventDefault();
  profileName.textContent = editProfileNameInput.value;
  profileDescription.textContent = editProfileDescriptionInput.value;
  closeModal(editProfileModal);
};

//New Post Functions
const newPostSubmit = (evt) => {
  evt.preventDefault();
  const formInputsTemp = [newPostNameInput, newPostLinkInput];
  const newPostTemp = {
    name: newPostNameInput.value,
    link: newPostLinkInput.value,
  };
  renderCard(newPostTemp);
  closeModal(newPostModal);
  newPostForm.reset();
  resetFormValidation(
    newPostForm,
    formInputsTemp,
    newPostSubmitButton,
    validationSettings
  );
};

//Card Functions
const getCardElement = (data) => {
  const cardElement = cardsTemplate.cloneNode(true);
  const cardElementImageButton = cardElement.querySelector(
    '[data-button="image"]'
  );
  const cardElementTitle = cardElement.querySelector("[data-title]");
  const cardElementLikeButton = cardElement.querySelector(
    '[data-button="like"]'
  );
  const cardElementDeleteButton = cardElement.querySelector(
    '[data-button="delete"]'
  );
  cardElementImageButton.src = data.link;
  cardElementImageButton.alt = data.name;
  cardElementTitle.textContent = data.name;
  cardElementLikeButton.addEventListener("click", () => {
    cardElementLikeButton.classList.toggle("card_liked");
  });
  cardElementDeleteButton.addEventListener("click", () => {
    cardElementDeleteButton.closest(".card").remove();
  });
  cardElementImageButton.addEventListener("click", () => {
    imagePreviewImage.src = cardElementImageButton.src;
    imagePreviewImage.alt = cardElementImageButton.alt;
    imagePreviewCaption.textContent = cardElementTitle.textContent;
    openModal(imagePreviewModal);
  });
  return cardElement;
};

const renderCard = (item, method = "prepend") => {
  const cardElement = getCardElement(item);
  cardsContainer[method](cardElement);
};

//Set Event Listeners
editProfileButton.addEventListener("click", () => {
  openModal(editProfileModal);
  editProfileSetDefault();
});

editProfileForm.addEventListener("submit", editProfileSubmit);

newPostButton.addEventListener("click", (evt) => {
  openModal(newPostModal);
});

newPostForm.addEventListener("submit", (evt) => newPostSubmit);

modalCloseButtons.forEach((closeButton) => {
  closeButton.addEventListener("click", (evt) => {
    const relatedModal = evt.target.closest(".modal");
    closeModal(relatedModal);
  });
});

//Initial Function Calls
initialCards.forEach((item) => {
  renderCard(item);
});
