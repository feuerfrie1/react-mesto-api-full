/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const { card, onCardLike, onCardDelete } = props;
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `elements__delete ${isOwn ? "" : "elements__delete_hidden"}`;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `elements__like ${isLiked ? " elements__like_active" : ""}`;

  function handleClick() {
    props.onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <div className="elements__card" key={card._id}>
      <button onClick={handleDeleteClick} className={cardDeleteButtonClassName} />
      <a href="#" className="elements__imagescale" onClick={handleClick}>
        <img className="elements__image" src={card.link} alt={card.name} />
      </a>
      <div className="elements__content">
        <p className="elements__title">{card.name}</p>
        <div className="elements__likes">
          <button onClick={handleLikeClick} className={cardLikeButtonClassName} />
          <p className="elements__like-amount">{card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
