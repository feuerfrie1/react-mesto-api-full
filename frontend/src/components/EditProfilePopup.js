import PopupWithForm from "./PopupWithForm";
import React from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const nameRef = React.useRef();
    const descriptionRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateUser({
            name: nameRef.current.value,
            about: descriptionRef.current.value,
        });
    }

    function handleChangeName() {
        nameRef.current.focus();
    }

    function handleChangeDescription() {
        descriptionRef.current.focus();
    }

    React.useEffect(() => {
        nameRef.current.value = currentUser.name;
        descriptionRef.current.value = currentUser.about;
    }, [currentUser]);

    return (
    <PopupWithForm title="Редактировать профиль" name="" buttontext="Сохранить" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
        <fieldset className="popup__field">
            <input type="text" onChange={handleChangeName} className="popup__input popup__input_name" name="name" id="nameinput" ref={nameRef} pattern="^[A-Za-zА-ЯЁёа-я\s-]+$" minLength="2" maxLength="40" required/>
            <span className="popup__error" id="nameinput-error"/>
            <input type="text" onChange={handleChangeDescription} className="popup__input popup__input_about" name="about" id="aboutinput" ref={descriptionRef} pattern="^[A-Za-zА-ЯЁёа-я\s-]+$" minLength="2" maxLength="200" required/>
            <span className="popup__error" id="aboutinput-error"/>
        </fieldset>
    </PopupWithForm>
    )
}

export default EditProfilePopup;

