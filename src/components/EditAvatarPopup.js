import React from 'react';
import PopupWithForm from './PopupWithForm';


function EditAvatarPopup(props) {
    
    //создаем реф
    const avatarRef = React.useRef()
    
    //функция по сбрасыванию действия по умолчанию и для передачи значений инпутов в следующий компонент
    function handleSubmit(e) {
        e.preventDefault();
        
        props.onUpdateAvatar({
          avatar: avatarRef.current.value
        });
      }
      



    return (
        <PopupWithForm
            name='new-avatar'
            title='Обновить аватар'
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            >
                
                <input ref={avatarRef} type="url" className="popup__input popup__input_topform popup__input_new-avatar" name="new-avatar-photo" placeholder="Ссылка на картинку" required id="new-avatar"/>
                <span className='popup__span' id="new-avatar-error span_all-error"></span>
                <button className="popup__button popup__button_new-avatar" type='submit'>Сохранить</button>
                
            </PopupWithForm>
    )

}

export default EditAvatarPopup;