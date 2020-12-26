import React from "react";
import { NavLink, Route } from 'react-router-dom';
import headerLogo from "../images/logo.svg";
import menu from '../images/menu.svg';
import menuClose from '../images/CloseIconSmall.svg';

function Header(props) {
  const { loggedIn, loggedInEmail, signOut } = props;
  const headerElement = React.createRef();
  const [headerWidth, setHeaderWidth] = React.useState('');
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  //console.log(loggedIn);
  //console.log(loggedInEmail);
  //console.log(signOut);
  function handleMenu () {
    setIsMenuOpen(!isMenuOpen);
  }

  const buttonMenuOpen = (
    <button className="header__open-menu" type="button" onClick={handleMenu}>
      <img className="header__menu-icon" src={isMenuOpen ? menuClose : menu} alt="инонка меню" />
    </button>
  );
  const nav = (
    <nav className={loggedIn ? "header__menu header__menu_mobile" : "header__menu"}>
      <Route path="/sign-up">
        <NavLink className="header__link" to="/sign-in">Войти</NavLink>
      </Route>
      <Route path="/sign-in">
        <NavLink className="header__link" to="/sign-up">Регистрация</NavLink>
      </Route>
      <Route path="/cards">
        <p className="header__email">{loggedInEmail}</p>
        <button onClick={signOut} type="button" className="header__logout">Выйти</button>
      </Route>
    </nav>
  );

  React.useEffect(() => {
    if (loggedIn) {
      setHeaderWidth(headerElement.current.parentElement.clientWidth);
    }
  }, [headerElement, loggedIn]);
  return (
    <>
    { (headerWidth < 375 && isMenuOpen && loggedIn) ? nav : null }
    <header ref={headerElement} className="header">
      <img className="header__logo" src={headerLogo} alt="лого" />
      { (headerWidth >= 375) ? nav : null }
      { (headerWidth >= 375) ? null : loggedIn ? buttonMenuOpen : nav }
    </header>
    </>
  );
}

export default Header;
