import React, { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { CardsContext } from "../contexts/CardsContext";


const Main = ({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete, handleTrashBtnClick }) => {


  const currentUser = useContext(CurrentUserContext)
  const cards = useContext(CardsContext)

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__image-container">
          <button
            onClick={onEditAvatar}
            className="profile__image-edit"
          />
          <img
            src={currentUser.avatar}
            className="profile__image"
            alt="Аватарка"
          />
        </div>

        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button
            onClick={onEditProfile}
            aria-label="Редактировать профиль"
            type="button"
            className="profile__button-edit"
          />
          <p className="profile__paragraph">{currentUser.about}</p>
        </div>
        <button
          onClick={onAddPlace}
          aria-label="Добавить фотографию"
          type="button"
          className="profile__button-add"
        />
      </section>
      <section className="elements" aria-label="Элементы">
        {cards.map((card) => (
          <Card handleTrashBtnClick={handleTrashBtnClick} onCardDelete={onCardDelete} onCardLike={onCardLike} key={card._id} card={card} onCardClick={onCardClick} />
        ))}
      </section>
    </main>
  );
};

export default Main;
