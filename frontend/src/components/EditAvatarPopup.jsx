import React, { useEffect } from 'react'
import PopupWithForm from './PopupWithForm'
import Input from './Input'
import { Controller, FormProvider, useForm } from "react-hook-form";
import { urlRegex } from '../utils/utils'
const EditAvatarPopup = ({ name, title, buttonText, isOpen, onClose, onUpdateAvatar, isLoading }) => {



  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      avatar: ''
    }
  })

  const {
    control,
    formState: { errors, isValid },
    reset,
    handleSubmit
  } = methods;

  function onSubmit({ avatar }) {
    onUpdateAvatar({
      avatar: avatar
    });
  }



  useEffect(() => {
    reset()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  return (
    <FormProvider {...methods}>
      <PopupWithForm isValid={isValid} onSubmit={handleSubmit(onSubmit)} onClose={onClose} isOpen={isOpen} name={name} title={title} buttonText={isLoading ? 'Сохранение...' : buttonText} >
        <Controller name={'avatar'} control={control} rules={{ required: "Обязательное к заполнению поле", pattern: { value: urlRegex, message: 'Укажите URL на картинку' } }} render={({ field: { onChange, value, onBlur } }) => (
          <Input errorMessage={errors?.avatar?.message} onBlur={onBlur} onChange={onChange} value={value} name={'avatar'} placeholder={'Ссылка на картинку'} />
        )} />

      </PopupWithForm>
    </FormProvider>
  )
}

export default EditAvatarPopup
