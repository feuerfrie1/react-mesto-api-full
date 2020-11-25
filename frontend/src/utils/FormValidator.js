export default class FormValidator {
  constructor(object, form) {
    this._form = form;
    this._inputSelector = object.inputSelector;
    this._submitButtonSelector = object.submitButtonSelector;
    this._inactiveButtonClass = object.inactiveButtonClass;
    this._inputErrorClass = object.inputErrorClass;
    this._errorClass = object.errorClass;
    this._inputList = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
    this._buttonElement = form.querySelector(object.submitButtonSelector);
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }

  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputList.every((inputElement) => inputElement.validity.valid);
  }

  _showButtonError() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.setAttribute("disabled", true);
  }

  _hideButtonError() {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.removeAttribute("disabled");
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._hideButtonError();
    } else {
      this._showButtonError();
    }
  }

  clearError() {
    this._inputList.forEach((input) => {
      this._hideInputError(input);
      if (!input.value) {
        this._showButtonError();
      } else {
        this._hideButtonError();
      }
    });
  }

  enableValidation() {
    const current = this;
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
        current._toggleButtonState();
        current._isValid(inputElement);
      });
    });
  }
}
