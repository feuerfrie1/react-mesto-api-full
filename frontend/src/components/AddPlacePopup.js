import PopupWithForm from "./PopupWithForm";
import React from "react";

function AddPlacePopup(props) {
  const [name, setName] = React.useState();
  const [link, setLink] = React.useState();

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: name,
      link: link,
    });
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="createcard"
      buttontext="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__field">
        <input
          onChange={handleChangeName}
          type="text"
          className="popup__input popup__input_card-name"
          placeholder="Название"
          name="name"
          id="cardname"
          minLength="1"
          maxLength="30"
          required
        />
        <span className="popup__error" id="cardname-error" />
        <input
          onChange={handleChangeLink}
          type="url"
          className="popup__input popup__input_card-about"
          placeholder="Ссылка на картинку"
          name="link"
          id="cardabout"
          required
        />
        <span className="popup__error" id="cardabout-error" />
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
