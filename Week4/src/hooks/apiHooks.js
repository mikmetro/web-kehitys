import {fetchData} from '../utils/fetchData';

const useAuthentication = () => {
  const postLogin = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    const loginResult = await fetchData(
      import.meta.env.VITE_AUTH_API + '/auth/login',
      fetchOptions
    );

    console.log(loginResult);
    window.localStorage.setItem('token', loginResult.token);

    return loginResult;
  };
  return {postLogin};
};

const useUser = () => {
  const postUser = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    return await fetchData(
      import.meta.env.VITE_AUTH_API + '/users',
      fetchOptions
    );
  };

  const getUserByToken = async (token) => {
    const fetchOptions = {
      headers: {
        Authorization: 'Bearer: ' + token,
      },
    };
    const userResult = await fetchData(
      import.meta.env.VITE_AUTH_API + '/users/token',
      fetchOptions
    );
    console.log('userResult', userResult);

    return userResult;
  };

  return {getUserByToken, postUser};
};

export {useAuthentication, useUser};
