
import { baseUrl } from "./utils";

export const register = (email, password) => {
  return fetch(`${baseUrl}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
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
  return fetch(`${baseUrl}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
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
  return fetch(`${baseUrl}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then((res) => res.json()) 
};