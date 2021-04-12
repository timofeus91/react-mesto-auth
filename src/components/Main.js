import React from 'react';
import Card from './Card';
import {CurrentUserContext} from '../contexts/CurrentUserContext';



function Main(props) {
    
    
    //подписываемся на контекст
    const currentUser = React.useContext(CurrentUserContext);

   
    return(
        (
        <main className='content'>
            
            <section className='profile page__profile'>
              <div className='profile__main-container'>
                <div className='profile__avatar-container'>
                    <img className='profile__avatar' src={currentUser.avatar} alt='Аватарка'/>
                    <div className="profile__avatar-overlay">
                        <button onClick={props.onEditAvatar} className='profile__avatar-edit' type="button"></button>
                    </div> 
                </div>
                <div className='profile__info'>
                    <div className='profile__title-button'>
                        <h1 className='profile__title'>{currentUser.name}</h1>
                        <button onClick={props.onEditProfile} className='profile__edit-button' type='button'></button>
                    </div>
                    <p className='profile__subtitle'>{currentUser.about}</p>
                </div>
              </div>
                <button onClick={props.onAddPlace} className='profile__add-button' type='button'></button>

            </section>
            <section className='elements page__elements'>
                <ul className='elements__list'>
                    { props.cards.map(item => (
                            <Card
                            key={item._id}
                            link={item.link}
                            name={item.name}
                            likes={item.likes}
                            onCardClick={props.onCardClick}
                            owner = {item.owner}
                            onCardLike = {props.onCardLike}
                            id = {item._id}
                            onCardDelete = {props.onCardDelete}
                            
                            
                            />
                    )
                        )}
                </ul>
            </section>
        </main>
        )
    );
}

export default Main;