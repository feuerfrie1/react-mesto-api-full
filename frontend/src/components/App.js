import React from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import Header from './Header';
import MainPage from './MainPage';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/auth';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [loggedInEmail, setLoggedInEmail] = React.useState('');
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [successInfoToolTip, setSuccessInfoToolTip] = React.useState(false);
  const history = useHistory();
  // eslint-disable-next-line
  const [email, setEmail] = React.useState('');
  // eslint-disable-next-line
  const [password, setPassword] = React.useState('');

  function handleLogin() {
    setLoggedIn(true);
  }
  function handleSuccessInfoToolTip() {
    setSuccessInfoToolTip(true);
  }
  function handleInfoTooltipOpen() {
    setIsInfoTooltipOpen(true);
  }

  const handleLoginSubmit = (email, password) => {
    auth.authorize(email, password)
        .then(data => {
            if (data.token) {
                localStorage.setItem('jwt', data.token);
                setEmail('');
                setPassword('');
                handleLogin();
                checkToken();
                history.push('/cards');
            } else {
                throw new Error('Ошибка сервера: не удалось получить токен');
            }
        })
        .catch(err => {
            console.log(alert(`Ошибка авторизации: ${err}. Проверьте корректность данных`))
        })
}

const handleRegisterSubmit = (email, password) => {
  auth.register(email, password)
      .then((res) => {
          if (res) {

              handleSuccessInfoToolTip();
              setTimeout(handleInfoTooltipOpen, 700);
              history.push('/sign-in');
          } else {

            handleInfoTooltipOpen();
          }
      });
}

  function closeAllPopups() {
    setIsInfoTooltipOpen(false);
    setTimeout(setSuccessInfoToolTip, 2000, false);
  }
  function signOut () {
    setLoggedInEmail('');
    localStorage.removeItem('token');
    setLoggedIn(false);
    history.push('/sign-in');
  }
  function checkToken() {
    const token = localStorage.getItem('token');
    if (token) {
      auth.getToken(token)
      .then((res) => {
        if (res.data) {
          handleLogin();
          setLoggedInEmail(res.data.email);
          history.push('/cards');
        } else {
          localStorage.removeItem('token');
        }
      })
      .catch((err) => console.log(err));
    }
  }

  React.useEffect(() => {
    checkToken();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);
              
  return (
    <div className="page">
        <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeAllPopups} successStyle={successInfoToolTip} />
        <Header loggedInEmail={loggedInEmail} signOut={signOut} loggedIn={loggedIn} />
        <Switch>
          <ProtectedRoute path="/cards" loggedIn={loggedIn} component={MainPage} />
          <Route path="/sign-up">
            <Register 
              openInfoToolTip={handleInfoTooltipOpen} 
              successInfoToolTip={handleSuccessInfoToolTip} 
              onRegister={handleRegisterSubmit}
            />
          </Route>
          <Route path="/sign-in">
            <Login 
              openInfoToolTip={handleInfoTooltipOpen} 
              successInfoToolTip={handleSuccessInfoToolTip} 
              handleLogin={handleLogin}
              checkToken={checkToken}
              onLogin={handleLoginSubmit}
            />
          </Route>
          <Route path="/">
            <Redirect to="/sign-in" />
          </Route>
        </Switch>
    </div>
  );
}

export default App;