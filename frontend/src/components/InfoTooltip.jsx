import React from 'react'
import True from '../images/true.svg'
import False from '../images/false.svg'
const InfoTooltip = (props) => {


  return (
    <div onClick={props.onClose} className={`popup po-tooltip ${props.isOpen ? 'popup__openned' : ''}`}>
      <div onClick={(e) => e.stopPropagation()} className="popup__window popup-tooltip__window">
        <img className='popup-tooltip__logo' alt='' src={props.isSuccessInfoTooltipStatus ? True : False}></img>
        <p className='popup-tooltip__text'>{props.isSuccessInfoTooltipStatus ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</p>
        <button onClick={props.onClose} className='popup__button-close popup-tooltip__button-close'></button>
      </div>
    </div>
  )
}

export default InfoTooltip
