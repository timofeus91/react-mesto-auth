import React from 'react';
import { Link } from 'react-router-dom';
import Cat from '../images/kat404.jpg';

function PageNotFound () {
  return (
    <div className="not-found">
      <h3 className="not-found__title">
       <span>404</span> - Страница не найдена
      </h3>
      <img className="not-found__image" src={Cat} alt="Очень грустная картинка"/>
      <Link className="not-found__button" to="/">Кликни и вернись на сайт!</Link>
    </div>
  )
}

export default PageNotFound;