import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Signup.css';
import signupImg from '../assets/personal_signup.jpeg';
import { IndividualSignupCommunicator } from '../API/Communicator';

const PersonSignup = () => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const userData = { full_name: fullname, email, password };

    try {
      await IndividualSignupCommunicator(userData);
      alert('Signup successful!');
      window.location.href = '/'; // Navigate to login page
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-image">
        <img src={signupImg} alt="Signup" />
      </div>
      <div className="signup-form">
        <h1>Sign Up</h1>
        <p>Everything starts from here</p>
        <h2>Personal Signup</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullname">Full Name</label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
          <div className="login-links">
            <Link to="/" className="signup-link">Individual Login</Link>
            <Link to="/login/company" className="company-login-link">Company Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PersonSignup;
