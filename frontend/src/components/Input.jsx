import React from "react";

const Input = (props) => {


  return (
    <>

      <input
        onBlur={props.onBlur}
        onChange={(e) => {
          props.onChange && props.onChange(e);
        }}
        value={props.value}
        autoComplete="off"
        required={true}
        className={`popup__input popup__input_type_${props.name ? props.name : ''}`}
        id={`popup__input-name_${props.name ? props.name : ''}`}
        placeholder={props.placeholder}
        type={props.type}
        name={`popup__input_type_${props.name ? props.name : ''}`}
      />
      <span className="popup__error popup__input-span popup__input-name-error popup__error_visible">
        {props.errorMessage ? props.errorMessage : ''}
      </span>
    </>


  )
}


export default Input;
