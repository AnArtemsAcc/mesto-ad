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

const hideInputError = (settings) => {

};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};