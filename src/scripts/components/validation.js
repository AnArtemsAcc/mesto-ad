const showInputError = (settings, errorMessage) => {

};

const hideInputError = (settings) => {
  
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};