// LoginForm.jsx
import {useNavigate} from 'react-router';
import {useForm} from '../hooks/formHooks';
import {useUserContext} from '../hooks/contextHooks';
import TextInput from './ui/TextInput';

const LoginForm = () => {
  const initValues = {
    username: '',
    password: '',
  };
  const navigate = useNavigate();
  const {handleLogin} = useUserContext();

  const doLogin = async () => {
    try {
      await handleLogin(inputs);
    } catch (e) {
      alert(e.message);
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(
    doLogin,
    initValues,
  );
  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Username"
          name="username"
          type="text"
          id="loginuser"
          onChange={handleInputChange}
          autoComplete="username"
        />
        <TextInput
          label="Password"
          name="password"
          type="password"
          id="loginpassword"
          onChange={handleInputChange}
          autoComplete="current-password"
        />
        <button type="submit" onClick={doLogin}>
          Login
        </button>
      </form>
    </>
  );
};

export default LoginForm;
