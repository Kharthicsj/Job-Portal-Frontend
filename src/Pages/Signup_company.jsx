import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Signup.css';
import signupImg from '../assets/company_signup.jpeg';
import { CompanySignupCommunicator } from '../API/Communicator';

const CompanySignup = () => {
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const companyData = { company_name: companyName, company_email: email, password };

    try {
      await CompanySignupCommunicator(companyData);
      alert('Signup successful!');
      window.location.href = '/login/company';
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-image">
        <img src={signupImg} alt="Company Signup" />
      </div>
      <div className="signup-form">
        <h1>Sign Up</h1>
        <p>Grateful for you to provide opportunities!!</p>
        <h2>Company Signup</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="companyName">Company Name</label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Company Email</label>
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
            <Link to="/signup/person" className="signup-link">Individual Signup</Link>
            <Link to="/login/company" className="company-login-link">Company Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanySignup;
