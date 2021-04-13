import React from 'react';
import {Link} from 'react-router-dom';

function Register(props) {

    //стейт-переменные для инпутов
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    //обработчики для изменения инпутов и обновления стейтов 

    function handleChangeEmail(e) {
        setEmail(e.target.value);
    }

    function handleChangePassword(e) {
        setPassword(e.target.value);
    }

    //функция по сбрасыванию действия по умолчанию и для передачи значений инпутов в следующий компонент
    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        props.onData({
            email: email,
            password: password
        })
    }


    return(
        <div className="userData-container">
            <h2 className="userData-container__title">Регистрация</h2>
            <form className="userData-container__form" onSubmit={handleSubmit} name="userData" noValidate>

                <input value={email} onChange={handleChangeEmail} type="email" className="userData-container__input userData-container_topform" name="userData-name" placeholder="Email" required minLength='2' maxLength='40' id="userData-name"/>
                <span className="userData-container__span" id="userData-name-error"></span>

                <input value={password} onChange={handleChangePassword}  type="password" className="userData-container__input userData-container_bottomform" name="userData-password" placeholder="Пароль" required minLength='2' maxLength='200' id="userData-password"/>
                <span className="userData-container__span" id="userData-password-error"></span>

                <button className="userData-container__button" type='submit'>Войти</button>
            </form>
            <Link  to="./sign-in">Уже зарегистрированы? Войти</Link>
        </div>
    )
}

export default Register;