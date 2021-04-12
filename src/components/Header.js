import React from 'react';
import logo from '../images/Vector-mesto-logo.svg';

function Header() {
    return (
        (
        <header className='header page__header'>
            <img className='header__logo' src={logo} alt='Логотип'/>
        </header>
        )
    );
}

export default Header;