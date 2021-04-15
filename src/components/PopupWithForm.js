import React from 'react';
//popup__form_${props.name} необходимы для стилизации
function PopupWithForm(props) {

    return (
        (
        <div className={`popup  ${props.isOpen ? 'popup_opened' :''}`}>
            <div className={`popup__container popup__container_${props.name}`}>
                <button className={`popup__close popup__close_${props.name}`} type='button' onClick={props.onClose}></button>
                <h2 className='popup__title'>{props.title}</h2>
                <form onSubmit={props.onSubmit} className={`popup__form popup__form_${props.name}`} name={`${props.name}-form`} noValidate>
                    {props.children}
                </form>
            </div>
        </div>
        )
    );

}

export default PopupWithForm;


