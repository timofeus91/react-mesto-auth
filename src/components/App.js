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

import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import InfoTooltip from './InfoTooltip';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
import * as auth from '../utils/auth';




function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isInfoTooltip, setIsInfoTooltip] = React.useState(false);
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
        handleTokenCheck();
        api.getUserInfo()
        .then(userInfo => {
            setCurrentUser(userInfo);
        })
        .catch((err) => {
            console.log(`Произошла ошибка - ${err}`);
        })
    }, []);

    //обработчки для открытия попапов

    function handleInfoTooltip() {
        setIsInfoTooltip(true);
    }

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
        setIsInfoTooltip(false);
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

    //сюда все что связано с новый спринтом. Потом раскидать по своим местам
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [checkRegistration, setCheckRegistration] = React.useState('');
    const history = useHistory();

    //функция по регистрации
    function handleRegister(data) {
        auth.register(data)
            .then(() => {
                handleInfoTooltip();
                setCheckRegistration(true);
                history.push('/sign-in');
            })
            .catch((err) => {
                console.log(`Произошла ошибка - ${err}`);
                handleInfoTooltip();
                setCheckRegistration(false);
            })
    }

    //функция по авторизации 
    function handleLogin(data) {
        auth.authorize(data)
            .then(res => {
                localStorage.setItem('jwt', res.token);
                setEmail(data.email);
                setLoggedIn(true);
                history.push('/');
            })
            .catch((err) => {
                console.log(`Произошла ошибка - ${err}`);
                handleInfoTooltip();
                setCheckRegistration(false);
            })
    }

    //функция по проверке токена
    function handleTokenCheck() {
        if(localStorage.getItem('jwt')) {
            const token = localStorage.getItem('jwt');
            if(token) {
                auth.checkToken(token)
                    .then(res => {
                        if(res) {
                            setLoggedIn(true);
                            setEmail(res.data.email);
                            history.push('/');
                        }
                    })
                    .catch((err) => {
                        console.log(`Произошла ошибка - ${err}`);
                    })
            }
        }
    }


    //функция по выходу из аккаунта 
    function handleLogOut() {

    }



  return (
    <CurrentUserContext.Provider value={ currentUser }>
    <div className="page">
        <Header
        email={email}
        logOut={handleLogOut}
         />

        <Switch>
             <ProtectedRoute
             exact path="/"
             loggedIn={loggedIn}
             component={Main}
             onEditProfile={handleEditProfileClick}
             onAddPlace={handleAddPlaceClick}
             onEditAvatar={handleEditAvatarClick}
             onCardClick={handleCardClick}
             cards={cards}
             onCardLike={handleCardLike}
             onCardDelete={handleCardDelete}
             />

             <Route path="/sign-up">
               <Register onData={handleRegister} />
             </Route>

             <Route path="/sign-in">
               <Login onData={handleLogin} />
             </Route>

        </Switch>

        <Footer />

        <section className='popups'>

            <InfoTooltip
            onClose={closeAllPopups}
            isOpen={isInfoTooltip}
            checkRegistration={checkRegistration}
            />

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