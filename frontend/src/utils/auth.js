export const BASE_URL = 'https://auth.nomoreparties.co';

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
  .then((res) => {
    if(res.ok) {
        return res.json();
    }
    return res.json().then((data) => Promise.reject(`${res.status} - ${data.error || 'Ошибка'}`));
  })
  .catch((err) => console.log(err));
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
  .then((res) => {
    if(res.ok) {
        return res.json();
    }
    return res.json().then((data) => Promise.reject(`${res.status} - ${data.error || 'пользователь с email не найден'}`));
  })
  .catch((err) => console.log(err));
};

export const getToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then((res) => {
    if(res.ok) {
        return res.json();
    }
    return res.json().then((data) => Promise.reject(`${res.status} - ${data.error || 'токен не передан или передан не в том формате'}`));
  })
  .catch((err) => console.log(err));
};