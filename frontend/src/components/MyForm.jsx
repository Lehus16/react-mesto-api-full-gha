import React from 'react'

const MyForm = ({ onSubmit, isValid, title, name, children, buttonText }) => {
  return (
    <form
      onSubmit={onSubmit}
      autoComplete="off"
      noValidate={true}
      name={`popup-${name}`}
      className={`popup__form popup-${name}__form`}
    >
      <h2 className="popup__title">{title}</h2>
      {children}
      <button
        disabled={!isValid}
        aria-label="Сохранить"
        type="submit"
        className={`popup__button popup__button-save ${isValid ? '' : 'popup__button_disabled'}`}
      >
        {buttonText}
      </button>
    </form>
  )
}

export default MyForm
