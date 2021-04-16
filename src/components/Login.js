import React from 'react';


function Login(props) {
    //стейт-переменные для инпутов
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

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
        props.onLogin({
            email,
            password,
        });
    }

    return(
        
        <div className="user-data-container page__user-data-container">
            <h2 className="user-data-container__title">Вход</h2>
            <form className="user-data-container__form" onSubmit={handleSubmit} name="user-data" noValidate>

                <input value={email} onChange={handleChangeEmail} type="email" className="user-data-container__input" name="user-data-name" placeholder="Email" required minLength='2' maxLength='40' id="user-data-name"/>
                <span className="user-data-container__span span_all-error" id="user-data-name-error"></span>

                <input value={password} onChange={handleChangePassword}  type="password" className="user-data-container__input" name="user-data-password" placeholder="Пароль" required minLength='2' maxLength='200' id="user-data-password"/>
                <span className="user-data-container__span span_all-error" id="user-data-password-error"></span>

                <button className="user-data-container__button" type='submit'>Войти</button>
            </form>
        </div>
    
    )
    
}

export default Login;