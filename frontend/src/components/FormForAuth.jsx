import React from 'react'
import { Link } from 'react-router-dom'
const FormForAuth = (classes, onSubmit, isValid, title, buttonText, children, name) => {
  return (
    <form className='register-form'>
      <h2 className='register-form__title'>Регистрация</h2>
      <input className='register-form__input' placeholder='email'></input>
      <span className='register-form__input-span'></span>
      <input className='register-form__input' placeholder='password'></input>
      <span className='register-form__input-span'></span>
      <button className='register-form__button' type='submit'>Зарегистрироваться</button>
      <p className='register-form__text'>Уже зарегистрированы?
        <Link className='register-form__link' to='/login'> Войти</Link>
      </p>
    </form>
  )
}

export default FormForAuth
