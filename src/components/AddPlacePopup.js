import React from 'react';
import PopupWithForm from './PopupWithForm';


function AddPlacePopup(props) {
        
        //стейт-переменные для названия карточки и ссылки на картинку
        const [name, setName] = React.useState('')
        const [link, setLink] = React.useState('')
    
        // обработчики для изменения инпутов и обновления стейтов 
        function handleChangeName(e) {
            setName(e.target.value);
        } 
    
        function handleChangeLink(e) {
            setLink(e.target.value);
        } 

           //функция по сбрасыванию действия по умолчанию и для передачи значений инпутов в следующий компонент
        function handleSubmit(e) {
          // Запрещаем браузеру переходить по адресу формы
          e.preventDefault();
      
          // Передаём значения управляемых компонентов во внешний обработчик
          props.onAddPlace({
          name: name,
          link: link,
          });
          setName('');
          setLink('');
        }
        //Спасибо за замечание. Не могу сообразить пока как вытащить инпуты отсюда в App, чтобы там очищать их при успешном запросе к серверу. Вспомню и исправлю!!!
      
      return (
        <PopupWithForm
        name='place'
        title='Новое место'
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleSubmit}
        >
            
            <input value={name} onChange={handleChangeName} type="text" className="popup__input popup__input_topform" name="popup-name-place" placeholder="Название" required minLength='2' maxLength='30' id="name-place-input"/>
            <span className='popup__span span_all-error' id="name-place-input-error"></span>
            <input value={link} onChange={handleChangeLink} type="url" className="popup__input popup__input_bottomform" name="popup-link-photo" placeholder="Ссылка на картинку" required id="link-input"/>
            <span className='popup__span span_all-error' id="link-input-error"></span>
            <button className="popup__button" type='submit'>Сохранить</button>
            
        </PopupWithForm>
      );

}

export default AddPlacePopup;