import React from "react";

function PopupWithForm(props) {
  const {name, isOpen, title, children, submit, buttontext, close, onClose} = props;
  return (
    <section className={`popup popup__${name} ${isOpen && "popup_opened"}`}>
      <form onSubmit={props.onSubmit} className={`popup__container popup__container_${name}`} method="post" action="#" name="form" noValidate>
        <p className="popup__title">{title}</p>
        {children}
        <button className={`popup__submit popup__submit_${submit}`} type="submit">
          {buttontext}
        </button>
        <button className={`popup__close popup__close_${close}`} onClick={onClose} type="button" />
      </form>
    </section>
  );
}

export default PopupWithForm;
