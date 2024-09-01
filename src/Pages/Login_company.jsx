import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../Redux/userSlice';
import { useNavigate } from 'react-router-dom';
import loginImg from '../assets/Company.jpeg';
import '../Styles/Login.css';
import { CompanySignin } from '../API/Communicator'; 
import { Link } from 'react-router-dom';

const LoginCompany = () => {
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
      const response = await CompanySignin({ username, password });

      const { companyName, token } = response;

      dispatch(setUser({ user: { companyName }, token }));
      navigate('/dashboard');
    } catch (error) {
      setError(error.message);
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
        <p>Got Offers!! pls post it here</p>
        <h2>Company Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Company Mail</label>
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
            <Link to="/" className="signup-link">Individual Login</Link>
            <Link to="/signup/company" className="company-login-link">Company Signup</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginCompany;
