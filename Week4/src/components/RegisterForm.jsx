// LoginForm.jsx
import {useNavigate} from 'react-router';
import {useForm} from '../hooks/formHooks';
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
    initValues
  );
  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="registeruser">Username</label>
          <input
            name="username"
            type="text"
            id="registeruser"
            onChange={handleInputChange}
            autoComplete="username"
          />
        </div>
        <div>
          <label htmlFor="registerpassword">Password</label>
          <input
            name="password"
            type="password"
            id="registerpassword"
            onChange={handleInputChange}
            autoComplete="current-password"
          />
        </div>
        <div>
          <label htmlFor="registeremail">E-Mail</label>
          <input
            name="email"
            type="email"
            id="registeremail"
            onChange={handleInputChange}
            autoComplete="current-password"
          />
        </div>
        <button type="submit" onClick={doRegister}>
          Login
        </button>
      </form>
    </>
  );
};

export default RegisterForm;
