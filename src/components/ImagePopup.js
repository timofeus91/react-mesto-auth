import React from 'react';

function ImagePopup(props) {

    return(
        
        <div className={`popup ${props.card.imgOpen ? 'popup_opened' :''}`}>
            <div className='popup__container popup__container_img'>
                <button className="popup__close popup__close_img" type="button" onClick={props.onClose}></button>
                <img className="popup__image" src={props.card.link} alt={props.card.name}/>
                <h2 className="popup__title popup__title_img">{props.card.name}</h2>
            </div>
        </div>
        
    );
}

export default ImagePopup;