const validationSettings = {
  formList: [...document.forms],
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__submit-button",
  errorShownClass: "modal__error-message_shown",
};

export const validityCheck = (inputEle, errorEle) => {
  if (!inputEle.validity.valid) {
    errorEle.textContent = inputEle.validationMessage;
    errorEle.classList.add(validationSettings.errorShownClass);
  } else {
    errorEle.classList.remove(validationSettings.errorShownClass);
    errorEle.textContent = "";
  }
};

export const submitValidityCheck = (formEle, submitEle) => {
  if (formEle.checkValidity()) {
    submitEle.disabled = false;
  } else {
    submitEle.disabled = true;
  }
};

const enableValidation = (validConfig) => {
  validConfig.formList.forEach((form) => {
    const formInputs = form.querySelectorAll(validConfig.inputSelector);
    const formSubmit = form.querySelector(validConfig.submitButtonSelector);
    submitValidityCheck(form, formSubmit);
    formInputs.forEach((formInput) => {
      const errorMessage = formInput.nextElementSibling;
      formInput.addEventListener("input", () => {
        validityCheck(formInput, errorMessage);
        submitValidityCheck(form, formSubmit);
      });
    });
  });
};

enableValidation(validationSettings);
