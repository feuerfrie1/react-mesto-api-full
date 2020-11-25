import React from 'react';
import { NavLink } from 'react-router-dom';

function Register(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleChangeEmail (e) {
    setEmail(e.target.value);
  }

  function handleChangePassword (e) {
    setPassword(e.target.value);
  }

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    props.onRegister(email, password);
}

  return (
    <div className="authorization">
      <form onSubmit={handleRegisterSubmit} className="authorization__form" id="register">
        <h2 className="authorization__form-header">Регистрация</h2>
        <input
          value={email}
          onChange={handleChangeEmail}
          type="email" 
          className="authorization__input"
          id="email"
          name="email"
          required 
          placeholder="Email"
        />
        <input
          value={password}
          onChange={handleChangePassword}
          type="password" 
          className="authorization__input" 
          id="password"
          name="password"
          required
          placeholder="Пароль"
          pattern="[A-Za-zА-Яа-яЁё0-9 -]{2,40}" 
        />
        <button type="submit" className="authorization__submit">Зарегистрироваться</button>
        <div className="authorization__form-nav">
          <span>Уже зарегистрированы?&nbsp;</span>
          <NavLink className="authorization__form-link" to="/sign-in">Войти</NavLink>
        </div>
      </form>
    </div>
  );
}

export default Register;