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
    formInput.setCustomValidity(formInput.data-error-message);
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