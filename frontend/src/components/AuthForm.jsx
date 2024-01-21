import React from 'react'
const AuthForm = ({ title, children, onSubmit, buttonText }) => {
  return (
    <form autoComplete="off" onSubmit={onSubmit} className='register-form'>
      <h2 className='register-form__title'>{title}</h2>
      {children}
      <button className='register-form__button' type='submit'>{buttonText}</button>

    </form>
  )
}

export default AuthForm
