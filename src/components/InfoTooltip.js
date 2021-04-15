import React from 'react';
import successIcon from '../images/successIcon.svg';
import noSuccessIcon from '../images/noSuccessIcon.svg';

function InfoTooltip(props) {
    return(
        <div className={`popup popup_${props.name} ${props.isOpen ? 'popup_opened' :''}`}>
            <div className={`popup__container popup__container_${props.name}`}>
                <button className={`popup__close popup__close_${props.name}`} type='button' onClick={props.onClose}></button>
                <img className="popup__registration-img" src={props.isAuthReqSuccess ? successIcon : noSuccessIcon} alt={props.isAuthReqSuccess ? 'Успех!' : 'Неудача :('}></img>
                <h2 className="popup__registration-title">{props.isAuthReqSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте еще раз.'}</h2>
            </div>
        </div>
    )
}

export default InfoTooltip;