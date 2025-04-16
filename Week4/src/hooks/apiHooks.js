import {fetchData} from '../utils/fetchData';
import useMedia from './useMedia';

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

const useFile = () => {
  // ApiHooks.js
  const postFile = async (file, token) => {
    // TODO: create FormData object
    // TODO: add file to FormData
    // TODO: upload the file to file server and get the file data (url = import.meta.env.VITE_UPLOAD_SERVER + '/upload')
    // TODO: return the file data.
    const formData = new FormData();
    formData.append('file', file);

    console.log('formData', formData);

    const fetchOptions = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer: ' + token,
      },
      body: formData,
    };
    const uploadResult = await fetchData(
      import.meta.env.VITE_UPLOAD_SERVER + '/upload',
      fetchOptions
    );

    return uploadResult;
  };

  return {postFile};
};

export {useAuthentication, useUser, useFile};
