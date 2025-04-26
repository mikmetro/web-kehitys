import {useState} from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const Login = () => {
  const [newUser, setNewUser] = useState(false);
  return (
    <>
      {newUser ? <RegisterForm /> : <LoginForm />}
      <span>{newUser ? 'Already a user?' : "Don't have an account yet?"}</span>
      <button
        onClick={() => setNewUser(!newUser)}
        className="ml-2 w-fit cursor-pointer rounded bg-stone-900 p-2"
      >
        Click here
      </button>
    </>
  );
};

export default Login;
