export const showInputError = (settings, formInput, formElement, errorMessage) => {
  const formError = formElement.querySelector(`#${formInput.id}-error`);
  formInput.classList.add(settings.inputErrorClass);
  formError.classList.add(settings.errorClass);
  if (errorMessage && formInput.validity.patternMismatch){
    formError.textContent = errorMessage;
  } else {
    formError.textContent = formInput.validationMessage;
  }
};

const hideInputError = (settings, formInput, formElement) => {
  const formError = formElement.querySelector(`#${formInput.id}-error`);
  formInput.classList.remove(settings.inputErrorClass);
  formError.classList.remove(settings.errorClass);
  formError.textContent = "";
};

const checkInputValidity = (settings, formInput, formElement) => {
  if (formInput.validity.patternMismatch) {
    formInput.setCustomValidity(formInput.dataset.errorMessage);
  } else {
    formInput.setCustomValidity("");
  }

  if (!formInput.validity.valid) {
    showInputError(settings, formInput, formElement, formInput.validationMessage);
  } else {
    hideInputError(settings, formInput, formElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const disableSubmitButton = (settings, buttonElement) => {
  buttonElement.classList.add(settings.inactiveButtonClass);
  buttonElement.disabled = true; 
}

const enableSubmitButton = (settings, buttonElement) => {
  buttonElement.classList.remove(settings.inactiveButtonClass);
  buttonElement.disabled = false; 
}

const toggleButtonState = (settings, inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    disableSubmitButton(settings, buttonElement)
  } else {
    enableSubmitButton(settings, buttonElement);
  }
};

const setEventListeners = (settings, formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(settings, inputElement, formElement);
      toggleButtonState(settings, inputList, buttonElement);
    });
  });
};

export const clearValidation = (settings, formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);
  disableSubmitButton(settings, buttonElement);
  inputList.forEach((inputElement) => {
    hideInputError(settings, inputElement, formElement);
  });
};

export const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(settings, formElement);
  });
};