import React from 'react';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';



function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({name: '', link: '', imgOpen: false});
    const [currentUser, setCurrentUser] = React.useState({
        //пока идет загрузка с сервера чтобы позиции не были пустыми и говорили о выполнении загрузки
        name: 'Ждёмс',
        about: 'Ждёмс',
        avatar: 'https://i007.fotocdn.net/s124/4a5340ffd4d2b33c/public_pin_l/2826322361.jpg'
    });
    const [cards, setCards] = React.useState([]);


    //Загружаем карточки с сервера. Проставлена зависимость. 
    React.useEffect(() => {
        
        api.getInitialCards()
            .then(cards => {
                setCards(cards);
            })

            .catch((err) => {
                console.log(`Произошла ошибка - ${err}`);
            })
        
    }, []);


    //эффект для получения информации о пользователе
    React.useEffect(() => {
        api.getUserInfo()
        .then(userInfo => {
            setCurrentUser(userInfo);
        })
        .catch((err) => {
            console.log(`Произошла ошибка - ${err}`);
        })
    }, []);

    //обработчки для открытия попапов
    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }
    
    
    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }
    
    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }


    //обработчик по закрытию попапов
    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard({name: '', link: '', imgOpen: false});
    }

    //обработчик для открытия большого варианта фото
    function handleCardClick(card) {
        setSelectedCard(card);
    }

    //функция по снятию-постановке лайка на карточку с использованием api
    function handleCardLike(card) {

        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        
        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card.id, !isLiked)
            .then((newCard) => {
                setCards(state => state.map((c) => c._id === card.id ? newCard : c)); 
            })
            .catch((err) => {
                console.log(`Произошла ошибка - ${err}`);
            })
    }

    //функция по удалению карточки с использованием api
    function handleCardDelete(card) {
        api.deleteCard(card.id)
            .then((deleteCard) => {
                //console.log(deleteCard);
                setCards(state => state.filter((c) => c._id === card.id ? null : c));
            })
            .catch((err) => {
                console.log(`Произошла ошибка - ${err}`);
            })

    }

    //обработчки для отправки через api новых данных о пользователе и обновлении страницы
    function handleUpdateUser(data) {
        api.editUserInfo(data)
            .then(data => {
                setCurrentUser(data)
                closeAllPopups()
            })
            .catch((err) => {
                console.log(`Произошла ошибка - ${err}`);
            })
    }

    //обработчик для отправки через api данных о новом аватаре и обновлении страницы
    function handleUpdateAvatar(avatar) {
        console.log(avatar);
        api.editUserAvatar(avatar)
            .then(avatar => {
                setCurrentUser(avatar)
                closeAllPopups()
            })
            .catch((err) => {
                console.log(`Произошла ошибка - ${err}`);
            })
    }

    //обработчик для добавления новой карточки через api и обновлении страницы
    function handleAddPlace(data) {
        //console.log(data);
        api.addNewCard(data)
            .then(newCard => {
                setCards([newCard, ...cards]);
                closeAllPopups() 
            })
            .catch((err) => {
                console.log(`Произошла ошибка - ${err}`);
            })

    }

  return (
    <CurrentUserContext.Provider value={ currentUser }>
    <div className="page">
        <Header />
        <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
        cards={cards}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
        />
        <Footer />

        <section className='popups'>

            <EditProfilePopup 
            isOpen={isEditProfilePopupOpen} 
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser} /> 


            <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlace} />


            <PopupWithForm name='areyousure' title='Вы уверены?'>
                
                <button className="popup__button popup__button_areyousure" type='submit'>Да</button>
                
            </PopupWithForm>

            <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen} 
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            />

            <ImagePopup
            onClose={closeAllPopups}
            card={selectedCard}
            
             />
            
        </section>
    </div>
</CurrentUserContext.Provider>
  );
}

export default App;