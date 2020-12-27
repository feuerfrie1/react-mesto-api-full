import React from 'react';
import { NavLink } from 'react-router-dom';

function Login(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleChangeEmail (e) {
    setEmail(e.target.value);
  }
  function handleChangePassword (e) {
    setPassword(e.target.value);
  }

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    props.onLogin(email, password);
  }

  return (
    <div className="authorization">
      <form onSubmit={handleLoginSubmit} className="authorization__form" id="login">
        <h2 className="authorization__form-header">Вход</h2>
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
        <button type="submit" className="authorization__submit">Войти</button>
        <div className="authorization__form-nav">
          <span>Ещё не зарегистрированы?&nbsp;</span>
          <NavLink className="authorization__form-link" to="/sign-up">Регистрация</NavLink>
        </div>
      </form>
    </div>
  );
}

export default Login;