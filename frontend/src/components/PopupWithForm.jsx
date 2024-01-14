import React from "react";
import MyForm from "./MyForm";

const PopupWithForm = ({ name, title, buttonText, children, isOpen, onClose, onSubmit, isValid }) => {

  return (

    <div>
      <div onClick={() => {
        onClose();
      }} className={`popup popup-${name} popup-overlay ${isOpen ? 'popup__openned' : ''}`}>
        <div onClick={(e) => e.stopPropagation()} className="popup__window">
          <MyForm isValid={isValid} onSubmit={onSubmit} name={name} title={title} buttonText={buttonText} children={children} />
          <button
            onClick={(e) => {
              e.stopPropagation()
              onClose()
            }}
            aria-label="Закрыть окно редактирования"
            type="button"
            className={`popup-${name}__button-close popup__button-close`}
          />
        </div>
      </div>
    </div>
  )

};

export default PopupWithForm;
