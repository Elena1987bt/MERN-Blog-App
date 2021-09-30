import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAppContext } from '../../context/context';
import { Link } from 'react-router-dom';
import './login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [{ loading, user, error }, dispatch] = useAppContext();
  const url = 'https://node-mern-blog-app.herokuapp.com/api';

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({
      type: 'LOADING',
      payload: true,
    });
    try {
      const response = await axios.post(`${url}/auth/login`, {
        username,
        password,
      });
      // console.log(response.data);
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: response.data.user,
      });
      response.data && window.location.replace(`/posts`);
      alert('You are logged in successfully!');
    } catch (err) {
      console.log(err);
      dispatch({
        type: 'ERROR',
        payload: true,
      });
    }
    setUsername('');
    setPassword('');
  };

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          className="loginInput"
          type="text"
          value={username}
          placeholder="Enter your username..."
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Password</label>
        <input
          className="loginInput"
          type="password"
          value={password}
          placeholder="Enter your password..."
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="loginButton" type="submit">
          {loading ? 'Loading' : 'Login'}
        </button>
        {error && (
          <span style={{ color: 'red', marginTop: '10px' }}>
            Something went wrong! Try again!
          </span>
        )}
      </form>
      <button className="loginRegisterButton">
        <Link className="link" to={`/register`}>
          Register
        </Link>
      </button>
    </div>
  );
};

export default Login;
