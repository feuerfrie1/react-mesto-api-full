import React from 'react';
import success from '../images/success.png';
import error from '../images/error.png';

function InfoTooltip(props) {
  const { isOpen, onClose, successStyle } = props;

  return (
    <section className={(isOpen ? "popup popup_opened" : "popup")}>
      <div className="popup__container popup__container_tooltip">
        <img className="popup__tooltip-image" src={(successStyle ? success : error)} alt="иконка" />
        <span className="popup__tooltip-message">{successStyle ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</span>
        <button onClick={onClose} className="popup__close popup__close_tooltip" type="button"></button>
      </div>
    </section>
  );
}

export default InfoTooltip;