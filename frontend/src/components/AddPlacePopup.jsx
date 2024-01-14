import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import Input from "./Input";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { urlRegex } from "../utils/utils";

const AddPlacePopup = ({
  name,
  title,
  buttonText,
  isOpen,
  onClose,
  submitHandler,
  isLoading,
}) => {


  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      placeName: "",
      placeLink: "",
    },
  });


  const { control, handleSubmit, formState: { errors, isValid }, reset } = methods

  function onSubmit({ placeName, placeLink }) {
    submitHandler({
      name: placeName,
      link: placeLink
    })
  }




  useEffect(() => {
    reset()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <FormProvider {...methods}>
      <PopupWithForm
        isValid={isValid}
        onSubmit={handleSubmit(onSubmit)}
        onClose={onClose}
        isOpen={isOpen}
        name={name}
        title={title}
        buttonText={isLoading ? "Создание..." : buttonText}
      >
        <Controller name={"placeName"} control={control}
          rules={{
            required: "Обязательное к заполнению поле",
            minLength: {
              value: 2,
              message: "Минимальная длина 2 символа"
            },
            maxLength: {
              value: 30,
              message: "Максимальная длина 30 символов"
            }
          }}
          render={({ field: { value, onChange, onBlur } }) =>
          (<Input errorMessage={errors?.placeName?.message} onChange={onChange} onBlur={onBlur} value={value} name={"place-name"} placeholder={"Название"} />
          )} />
        <Controller name={"placeLink"} control={control}
          rules={{ required: "Обязательное к заполнению поле", pattern: { value: urlRegex, message: 'Укажите URL на картинку' } }}
          render={({ field: { value, onChange, onBlur } }) =>
          (<Input
            errorMessage={errors?.placeLink?.message} onChange={onChange} onBlur={onBlur} value={value} name={"url"} placeholder={"Ссылка на картинку"} />
          )}
        />
      </PopupWithForm>
    </FormProvider>
  );
};

export default AddPlacePopup;
