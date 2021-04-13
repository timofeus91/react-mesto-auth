import React from 'react';
import PopupWithForm from './PopupWithForm';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {

    //Подписываемся на контекст
    const currentUser = React.useContext(CurrentUserContext);

    //стейт-переменные для имени и профессии
    const [name, setName] = React.useState('')
    const [description, setDescription] = React.useState('')

    // обработчики для изменения инпутов и обновления стейтов 
    function handleChangeName(e) {
        setName(e.target.value);
    } 

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    } 


    //эффект для обновления переменных состояния при изминении контекста
    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
      }, [currentUser]); 

    //функция по сбрасыванию действия по умолчанию и для передачи значений инпутов в следующий компонент
    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
      
        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser({
          name,
          about: description,
        });
      } 





    return (
        <PopupWithForm 
            name='user'
            title='Редактировать профиль' 
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            >
            
                <input value={name} onChange={handleChangeName} type="text" className="popup__input popup__input_topform" name="popup-name" placeholder="Имя" required minLength='2' maxLength='40' id="name-user-input"/>
                <span className="popup__span span_all-error" id="name-user-input-error"></span>
                <input value={description} onChange={handleChangeDescription}  type="text" className="popup__input popup__input_bottomform" name="popup-about" placeholder="О себе" required minLength='2' maxLength='200' id="about-user-input"/>
                <span className="popup__span span_all-error" id="about-user-input-error"></span>
                <button className="popup__button" type='submit'>Сохранить</button>
            
        </PopupWithForm>
    )

}

export default EditProfilePopup;