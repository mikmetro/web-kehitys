// UserContext.jsx
import {createContext, useCallback, useMemo, useState} from 'react';
import {useAuthentication, useUser} from '../hooks/apiHooks';
import {useNavigate, useLocation} from 'react-router';

const UserContext = createContext(null);

const UserProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const {postLogin} = useAuthentication();
  const {getUserByToken} = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  // login, logout and autologin functions are here instead of components
  const handleLogin = useCallback(
    async (credentials) => {
      // TODO: post login credentials to API
      // TODO: set token to local storage
      // TODO: set user to state
      // TODO: navigate to home
      console.log(credentials);

      const data = await postLogin(credentials);
      setUser(data.user);
      localStorage.setItem('token', data.token);

      navigate('/');

      console.log(data);
    },
    [navigate, postLogin],
  );

  const handleLogout = useCallback(() => {
    try {
      // TODO: remove token from local storage
      localStorage.removeItem('token');
      // TODO: set user to null
      setUser(null);
      // TODO: navigate to home
      navigate('/');
    } catch (e) {
      console.log(e.message);
    }
  }, [navigate]);

  // handleAutoLogin is used when the app is loaded to check if there is a valid token in local storage
  const handleAutoLogin = useCallback(async () => {
    try {
      // TODO: get token from local storage
      const token = localStorage.getItem('token');
      // TODO: if token exists, get user data from API
      if (token) {
        const data = await getUserByToken(token);
        // TODO: set user to state
        setUser(data.user);

        console.log(location);
        const origin = location.pathname || '/';
        navigate(origin);
      }
      // TODO: navigate to home
    } catch (e) {
      handleLogout();
      console.log(e.message);
    }
  }, [getUserByToken, handleLogout, location, navigate]);

  return (
    <UserContext.Provider
      value={{user, handleLogin, handleLogout, handleAutoLogin}}
    >
      {children}
    </UserContext.Provider>
  );
};
export {UserProvider, UserContext};
