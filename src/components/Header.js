import React from 'react';
import { Link, Route } from 'react-router-dom';
import logo from '../images/Vector-mesto-logo.svg';

function Header(props) {
    return (
        (
        <header className='header page__header'>
            <img className='header__logo' src={logo} alt='Логотип'/>
            <div className="header__container">
                <Route exact path="/">
                    <h3 className="header__email">{props.email}</h3>
                    <Link to="/sign-in" onClick={props.logOut} className="header__description">Выйти</Link>
                </Route>

                <Route path="/sign-up">
                    <Link to="/sign-in" className="header__description">Войти</Link>
                </Route>

                <Route path="/sign-in">
                    <Link to="/sign-up" className="header__description">Зарегистрироваться</Link>
                </Route>
            </div>
        </header>
        )
    );
}

export default Header;