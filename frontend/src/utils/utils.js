const TOKEN_KEY = 'jwt';

export const token = {
  baseUrl: "//api.feuerfrie.students.nomoreparties.xyz",
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': "application/json",
  },
};

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const object = {
  formSelector: ".popup__container",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_inactive",
  inputErrorClass: "popup__input_error",
  errorClass: "popup__error_active",
};
