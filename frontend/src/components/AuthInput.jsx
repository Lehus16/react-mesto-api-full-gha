import React from 'react'

const AuthInput = (props) => {


  return (
    <>
      <input type={props.type} onChange={props.onChange} value={props.value} name={props.name} className='register-form__input' placeholder={props.placeholder}></input>
      <span className='register-form__input-span'></span>
    </>

  )
}

export default AuthInput
