const editProfileBtn = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileName = editProfileModal.querySelector("#userName");
const editProfileDesc = editProfileModal.querySelector("#userDescription");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const currentProfileName = document.querySelector(".profile__name");
const currentProfileDesc = document.querySelector(".profile__description");
const newPostBtn = document.querySelector(".profile__new-post-button");
const newPostModal = document.querySelector("#new-post-modal");
const newPostName = newPostModal.querySelector("#caption");
const newPostLink = newPostModal.querySelector("#imageLink");
const newPostForm = newPostModal.querySelector(".modal__form");
const previewImageModal = document.querySelector("#image-preview-modal");
const previewImageCaption = previewImageModal.querySelector(".modal__caption");
const previewImageImage = previewImageModal.querySelector(".modal__image");
const cardsList = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card-template").content;
const modalCloseBtns = document.querySelectorAll(
  ".modal__close-button, .modal__preview-close-button"
);
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

const openModal = (modal) => modal.classList.add("modal_is-opened");
const closeModal = (modal) => modal.classList.remove("modal_is-opened");

function editProfileSetDefault() {
  editProfileName.value = currentProfileName.textContent;
  editProfileDesc.value = currentProfileDesc.textContent;
}
function editProfileSave(evt) {
  evt.preventDefault();
  currentProfileName.textContent = editProfileName.value;
  currentProfileDesc.textContent = editProfileDesc.value;
  closeModal(editProfileModal);
}
function newPostSave(evt) {
  evt.preventDefault();
  const newPost = {
    name: newPostName.value,
    link: newPostLink.value,
  };
  renderCard(newPost);
  newPostForm.reset();
  closeModal(newPostModal);
}
function renderCard(item, method = "prepend") {
  const cardElement = getCardElement(item);
  cardsList[method](cardElement);
}
function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardElementImage = cardElement.querySelector(".card__image");
  const cardElementTitle = cardElement.querySelector(".card__title");
  const cardElementLike = cardElement.querySelector(".card__button_like");
  const cardElementDelete = cardElement.querySelector(".card__button_delete");
  cardElementImage.src = data.link;
  cardElementImage.alt = data.name;
  cardElementTitle.textContent = data.name;
  cardElementLike.addEventListener("click", () => {
    cardElementLike.classList.toggle("card_liked");
  });
  cardElementDelete.addEventListener("click", () => {
    cardElementDelete.closest(".card").remove();
  });
  cardElementImage.addEventListener("click", () => {
    previewImageCaption.textContent = cardElementTitle.textContent;
    previewImageImage.src = cardElementImage.src;
    previewImageImage.alt = cardElementImage.alt;
    openModal(previewImageModal);
  });
  return cardElement;
}

editProfileBtn.addEventListener("click", () => {
  openModal(editProfileModal);
  editProfileSetDefault();
});
editProfileForm.addEventListener("submit", editProfileSave);
newPostBtn.addEventListener("click", () => {
  openModal(newPostModal);
});
newPostForm.addEventListener("submit", newPostSave);

modalCloseBtns.forEach((closeButton) => {
  closeButton.addEventListener("click", (event) => {
    const relatedModal = event.target.closest(".modal");
    closeModal(relatedModal);
  });
});

initialCards.forEach((item) => {
  renderCard(item);
});
