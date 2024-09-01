import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../Redux/userSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Styles/Login.css';
import loginImg from '../assets/Login.jpeg';
import { Link } from 'react-router-dom'; 
import { IndividualSignin } from '../API/Communicator';

const LoginPerson = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('https://job-portal-backend-psap.onrender.com/IndividualsSignin', {
        username,
        password,
      });

      const { firstName, token } = response.data;

      dispatch(setUser({ user: { firstName }, token }));
      navigate('/company-dashboard');
    } catch (error) {
      setError(error.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-image">
        <img src={loginImg} alt="Login" />
      </div>
      <div className="login-form">
        <h1>Sign In</h1>
        <p>Find your job here</p>
        <h2>Personal Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Logging In...' : 'Login'}
          </button>
          <div className="login-links">
            <Link to="/signup/person" className="signup-link">Sign Up</Link>
            <Link to="/login/company" className="company-login-link">Company Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPerson;
