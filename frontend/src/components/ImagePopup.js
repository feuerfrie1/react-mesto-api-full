import React from "react";

function ImagePopup(props) {
  return (
    <section className={`popup popup__imagescale ${props.isOpen && "popup_opened"}`}>
      <div className="popup__imagecontainer">
        <img className="popup__image" src={props.card.link} alt={props.card.name} />
        <p className="popup__imagename">{props.card.name}</p>
        <button className="popup__close popup__close_imagescale" onClick={props.onClose} />
      </div>
    </section>
  );
}

export default ImagePopup;
