export const baseUrl = `${window.location.protocol}${process.env.REACT_APP_API_URL}`;

export const setToken = (token) => {
  localStorage.setItem('jwt', token);
}

export const getToken = () => localStorage.getItem('jwt');

export const object = {
  formSelector: ".popup__container",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_inactive",
  inputErrorClass: "popup__input_error",
  errorClass: "popup__error_active",
};
