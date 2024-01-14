import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";


const Card = ({ card, onCardClick, onCardLike, handleTrashBtnClick }) => {

  const currentUser = useContext(CurrentUserContext)
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (
    `element__button ${isLiked && 'element__button-liked'}`
  );;
  const handleClick = (card) => {
    onCardClick(card)
  }

  const handleDeleteButtonClick = () => {
    handleTrashBtnClick(card)
  }

  return (

    <figure className="element">
      {isOwn && <button onClick={() => {
        handleDeleteButtonClick()
      }} className="element__trash" />}
      <img onClick={() => {
        handleClick(card)
      }} className="element__image" src={card.link} alt={card.name} />
      <figcaption className="element__footer">
        <h3 className="element__paragraph">
          {card.name}
        </h3>
        <div className="element__button-container">
          <button
            onClick={() => {
              onCardLike(card)
            }}
            aria-label="Поставить лайк"
            type="button"
            className={cardLikeButtonClassName}
          />
          <p className="element__likes">{card.likes.length}</p>
        </div>
      </figcaption>
    </figure>

  )
}


export default Card;


