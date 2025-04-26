// LoginForm.jsx
import {useNavigate} from 'react-router';
import {useForm} from '../hooks/formHooks';
import TextInput from './ui/TextInput';
import {useUser} from '../hooks/apiHooks';

const RegisterForm = () => {
  const initValues = {
    username: '',
    password: '',
  };
  const {postUser} = useUser();
  const navigate = useNavigate();

  const doRegister = async () => {
    console.log(inputs);
    const r = await postUser(inputs);
    console.log(r);
    navigate('/');
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(
    doRegister,
    initValues,
  );
  return (
    <>
      <h1 className="text-3xl font-bold">Register</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center p-8">
        <TextInput
          label="Username"
          name="username"
          type="text"
          id="reguser"
          onChange={handleInputChange}
          autoComplete="username"
        />
        <TextInput
          label="Password"
          name="password"
          type="password"
          id="regpass"
          onChange={handleInputChange}
          autoComplete="password"
        />
        <TextInput
          label="Email"
          name="email"
          type="email"
          id="regemail"
          onChange={handleInputChange}
          autoComplete="email"
        />
        <button
          type="submit"
          onClick={doRegister}
          className="w-fit cursor-pointer bg-stone-900 p-2"
        >
          Register
        </button>
      </form>
    </>
  );
};

export default RegisterForm;
