import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './register.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const url = 'https://node-mern-blog-app.herokuapp.com/api';
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${url}/auth/register`, {
        username,
        email,
        password,
      });
      console.log(response.data);
      response.data && window.location.replace(`/login`);
    } catch (err) {
      setError(true);
    }
    setUsername('');
    setEmail('');
    setPassword('');
  };
  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          className="registerInput"
          type="text"
          value={username}
          placeholder="Enter your username..."
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Email</label>
        <input
          className="registerInput"
          type="text"
          value={email}
          placeholder="Enter your email..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          className="registerInput"
          type="password"
          value={password}
          placeholder="Enter your password..."
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="registerButton" type="submit">
          Register
        </button>
      </form>
      <button className="registerLoginButton">
        <Link className="link" to="/login">
          Login
        </Link>
      </button>
      {error && (
        <span style={{ color: 'red', marginTop: '10px' }}>
          Something went wrong! Try again!
        </span>
      )}
    </div>
  );
};

export default Register;
