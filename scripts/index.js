const editProfileBtn = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(
  ".modal__close-button"
);
const editProfileName = editProfileModal.querySelector("#userName");
const editProfileDesc = editProfileModal.querySelector("#userDescription");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const currentProfileName = document.querySelector(".profile__name");
const currentProfileDesc = document.querySelector(".profile__description");
const newPostBtn = document.querySelector(".profile__new-post-button");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-button");
const newPostName = newPostModal.querySelector("#caption");
const newPostLink = newPostModal.querySelector("#imageLink");
const newPostForm = newPostModal.querySelector(".modal__form");
let initialCards = [
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
];

function editProfileSetDefault() {
  editProfileName.value = currentProfileName.textContent;
  editProfileDesc.value = currentProfileDesc.textContent;
}

function editProfileSave(evt) {
  evt.preventDefault();
  currentProfileName.textContent = editProfileName.value;
  currentProfileDesc.textContent = editProfileDesc.value;
  editProfileModal.classList.remove("modal_is-opened");
}

function newPostSave(evt) {
  evt.preventDefault();
  console.log(newPostLink.value);
  console.log(newPostName.value);
  newPostModal.classList.remove("modal_is-opened");
}

editProfileBtn.addEventListener("click", () => {
  editProfileModal.classList.add("modal_is-opened");
  editProfileSetDefault();
});

editProfileCloseBtn.addEventListener("click", () => {
  editProfileModal.classList.remove("modal_is-opened");
});

editProfileForm.addEventListener("submit", editProfileSave);

newPostBtn.addEventListener("click", () => {
  newPostModal.classList.add("modal_is-opened");
});

newPostCloseBtn.addEventListener("click", () => {
  newPostModal.classList.remove("modal_is-opened");
});

newPostForm.addEventListener("submit", newPostSave);

initialCards.forEach((item) => {
  console.log(item.name);
});
