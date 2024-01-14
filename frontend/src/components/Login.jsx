import React from 'react'
import AuthForm from './AuthForm'
import { Controller, FormProvider, useForm } from "react-hook-form";
import AuthInput from './AuthInput';
const Login = ({ submitHandler }) => {



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
    submitHandler(data);
  }


  return (
    <FormProvider {...methods}>
      <AuthForm onSubmit={handleSubmit(onSubmit)} title={'Вход'} buttonText={'Войти'} >
        <Controller name={"email"} control={control} render={({ field: { value, onChange, onBlur } }) => (<AuthInput onChange={onChange} onBlur={onBlur} value={value} type='email' placeholder='email' />)} />
        <Controller name={"password"} control={control} render={({ field: { value, onChange, onBlur } }) => (<AuthInput type="password" onChange={onChange} onBlur={onBlur} value={value} placeholder='password' />)} />
      </AuthForm>
    </FormProvider>
  )
}

export default Login
