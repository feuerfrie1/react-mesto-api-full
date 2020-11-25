import PopupWithForm from "./PopupWithForm";
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditAvatarPopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  function handleChangeAvatar() {
    avatarRef.current.focus();
  }

  React.useEffect(() => {
    avatarRef.current.value = currentUser.avatar;
  }, [currentUser]);

  return (
    <PopupWithForm title="Обновить аватар" name="update-avatar" close="avatar" buttontext="Сохранить" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} submit="avatar">
      <input onChange={handleChangeAvatar} ref={avatarRef} type="url" className="popup__input popup__input_avatar-src" placeholder="Ссылка на картинку" name="avatar" id="avatarsrc" required />
      <span className="popup__error" id="avatarsrc-error" />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
