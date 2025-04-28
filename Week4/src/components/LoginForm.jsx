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
      <h1 className="text-3xl font-bold">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center p-8">
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
        <button type="submit" className="w-fit cursor-pointer bg-stone-900 p-2">
          Login
        </button>
      </form>
    </>
  );
};

export default LoginForm;
