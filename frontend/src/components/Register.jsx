import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AuthForm from './AuthForm'
import { Controller, FormProvider, useForm } from "react-hook-form";
import AuthInput from './AuthInput';

const Register = ({ submitHandler }) => {


  // const hidePass = (str) => {
  //   let result = '';
  //   for (let i = 0; i < str.length; i++) {
  //     result = result + '*';
  //   }
  //   return result
  // }



  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: ''
    }
  });


  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset
  } = methods

  function onSubmit(data) {
    submitHandler(data)

  }

  return (
    <FormProvider {...methods}>
      <AuthForm onSubmit={handleSubmit(onSubmit)} title={'Регистрация'} buttonText={'Зарегистрироваться'} >
        <Controller name={"email"} control={control} render={({ field: { value, onChange, onBlur } }) => (<AuthInput onChange={onChange} onBlur={onBlur} value={value} type='email' placeholder='email' />)} />
        <Controller name={"password"} control={control} render={({ field: { value, onChange, onBlur } }) => (<AuthInput onChange={onChange} onBlur={onBlur} value={value} type='password' placeholder='password' />)} />
      </AuthForm>
      <p className='register-form__text'>Уже зарегистрированы?
        <Link className='register-form__link' to='/sign-in'> Войти</Link>
      </p>
    </FormProvider>

  )
}

export default Register
