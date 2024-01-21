import React, { useContext, useEffect, useState } from 'react'
import PopupWithForm from './PopupWithForm'
import Input from './Input'
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'
import { Controller, FormProvider, useForm } from "react-hook-form";
const EditProfilePopup = ({ formName, title, buttonText, isOpen, onClose, onUpdateUser, isLoading }) => {


  const currentUser = useContext(CurrentUserContext)
  const [name, setName] = useState('')
  const [about, setAbout] = useState('')

  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      name: '',
      about: ''
    }
  });

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors, isValid },
    reset
  } = methods
  const onSubmit = ({ name, about }) => {
    onUpdateUser({
      name: name,
      about: about,
    })
  }



  useEffect(() => {
    setName(currentUser.name)
    setAbout(currentUser.about)
  }, [currentUser])

  useEffect(() => {
    reset()
    setValue('name', name)
    setValue('about', about)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])


  return (
    <FormProvider {...methods}>
      <PopupWithForm isValid={isValid} onSubmit={handleSubmit(onSubmit)} onClose={onClose} isOpen={isOpen} name={formName} title={title} buttonText={isLoading ? 'Сохранение...' : buttonText}>
        {/* <input placeholder='Имя' className='popup__input popup__input_type_name'  {...register('name', {
        required: "Обязательное к заполнению поле",
        minLength: {
          value: 2,
          message: "Минимальная длина 2 символа"
        },
        maxLength: {
          value: 40,
          message: "Максимальная длина 40 символов"
        }
      })} />
      <div className="popup__error popup__input-span popup__input-name-error popup__error_visible"> {errors?.name && <span >{errors?.name?.message || 'Ошибка'}</span>}</div>
      <input placeholder='О себе' className='popup__input popup__input_type_occupation' {...register('about', {
        required: "Обязательное к заполнению поле",
        minLength: {
          value: 2,
          message: "Минимальная длина 2 символа"
        },
        maxLength: {
          value: 200,
          message: "Максимальная длина 40 символов"
        },


      })} />
      <div className="popup__error popup__input-span popup__input-name-error popup__error_visible"> {errors?.about && <span >{errors?.about?.message || 'Ошибка'}</span>}</div> */}
        <Controller name="name" control={control} rules={{
          required: 'Обязательное к заполнению поле',
          minLength: {
            value: 2,
            message: "Минимальная длина 2 символа"
          },
          maxLength: {
            value: 40,
            message: "Максимальная длина 40 символов"
          },

        }} render={({ field: { value, onChange, onBlur } }) => (
          <Input errorMessage={errors?.name?.message} onChange={onChange} onBlur={onBlur} value={value} name={'name'} placeholder={'Имя'} type={'text'} />
        )} />
        <Controller name="about" control={control} rules={{
          required: 'Обязательное к заполнению поле',
          minLength: {
            value: 2,
            message: "Минимальная длина 2 символа"
          },
          maxLength: {
            value: 200,
            message: "Максимальная длина 40 символов"
          }
          ,
        }} render={({ field: { value, onChange, onBlur } }) => (
          <Input errorMessage={errors?.about?.message} onChange={onChange} onBlur={onBlur} value={value} name={'occupation'} placeholder={'О себе'} type={'text'} />
        )} />
      </PopupWithForm>
    </FormProvider>
  )
}

export default EditProfilePopup
