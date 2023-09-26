import { setCookie, getCookie } from './cookies';

const baseUrl = 'https://reqres.in/api';
const defaultHeaders = {
  'Content-Type': 'application/json',
};

const handleResponse = async (response) => {
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || 'Произошла ошибка');
  }

  if (response.status === 204) {
    return null;
  }

  const data = await response.json();
  return data;
};

const request = async (url, options) => {
  try {
    const response = await fetch(url, options);
    return handleResponse(response);
  } catch (error) {
    throw new Error(`${error.message}`);
  }
};

// регистрация
export const registerUserAPI = async (userData) => {
  const url = `${baseUrl}/register`;
  const options = {
    method: 'POST',
    headers: {
      ...defaultHeaders,
    },
    body: JSON.stringify(userData),
  };

  return request(url, options);
};

// авторизация
export const loginUserAPI = async (userData) => {
  const url = `${baseUrl}/login`;
  const options = {
    method: 'POST',
    headers: {
      ...defaultHeaders,
    },
    body: JSON.stringify(userData),
  };

  const data = await request(url, options);
  if (data && data.token) {
    setCookie('token', data.token);
  }
  return data;
};

// данные пользователя
export const getUserAPI = async (id) => {
  const url = `${baseUrl}/users/${id}`;
  const options = {
    method: 'GET',
    headers: {
      ...defaultHeaders,
      authorization: `Bearer ${getCookie('token')}`,
    },
  };
  const data = await request(url, options);
  return data;
};

// все пользователи
export const getUsersAPI = async () => {
  const url = `${baseUrl}/users/`;
  const options = {
    method: 'GET',
    headers: {
      ...defaultHeaders,
      authorization: `Bearer ${getCookie('token')}`,
    },
  };
  const data = await request(url, options);
  return data;
};
