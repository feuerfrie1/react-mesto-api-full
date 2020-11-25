import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__info">
          <img className="profile__avatar" src={currentUser.avatar} alt="Фото профиля" />
          <div className="profile__cover" onClick={props.onEditAvatar} />
          <div className="profile__content">
            <h1 className="profile__info-title">{currentUser.name}</h1>
            <h2 className="profile__info-subtitle">{currentUser.about}</h2>
          </div>
          <button className="profile__edit-button" onClick={props.onEditProfile} />
        </div>
        <button className="profile__add-button" onClick={props.onAddPlace} />
      </section>

      <section className="elements">
        <CurrentUserContext.Provider value={currentUser}>
          {props.cards &&
            props.cards.map((card) => (
              <Card
                key={card._id}
                card={card}
                onCardClick={props.onImageClick}
                onCardLike={props.onCardLike}
                onCardDelete={props.onCardDelete}
              />
            ))}
        </CurrentUserContext.Provider>
      </section>
    </main>
  );
}

export default Main;
