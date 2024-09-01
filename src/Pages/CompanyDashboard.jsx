import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { clearUser } from '../Redux/userSlice'; 
import Cookies from 'js-cookie';
import { JobOffers } from '../API/Communicator';
import '../Styles/CompanyDashboard.css';

const CompanyDashboard = () => {
  const dispatch = useDispatch();
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    dispatch(clearUser()); 
    Cookies.remove('authToken'); 
    localStorage.removeItem('authToken'); 
    window.location.href = '/login'; 
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const jobData = {
        jobTitle,
        companyName,
        description,
        email,
        phoneNumber,
      };
      await JobOffers(jobData);
      setSuccess('Job offer added successfully');
      setJobTitle('');
      setCompanyName('');
      setDescription('');
      setEmail('');
      setPhoneNumber('');
    } catch (error) {
      setError(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="company-dashboard">
      <button className="company-logout-btn" onClick={handleLogout}>Logout</button>
      <h1>Company Dashboard</h1>
      <form onSubmit={handleSubmit} className="company-job-form">
        <h2>Post a Job Offer</h2>
        {error && <p className="company-error-text">{error}</p>}
        {success && <p className="company-success-text">{success}</p>}
        <div className="company-form-item">
          <label htmlFor="company-jobTitleInput">Job Title</label>
          <input
            type="text"
            id="company-jobTitleInput"
            name="jobTitle"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            required
          />
        </div>
        <div className="company-form-item">
          <label htmlFor="company-companyNameInput">Company Name</label>
          <input
            type="text"
            id="company-companyNameInput"
            name="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
        </div>
        <div className="company-form-item">
          <label htmlFor="company-descriptionInput">Description</label>
          <textarea
            id="company-descriptionInput"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="company-form-item">
          <label htmlFor="company-emailInput">Email Address</label>
          <input
            type="email"
            id="company-emailInput"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="company-form-item">
          <label htmlFor="company-phoneInput">Phone Number</label>
          <input
            type="tel"
            id="company-phoneInput"
            name="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="company-submit-btn" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Job Offer'}
        </button>
      </form>
    </div>
  );
};

export default CompanyDashboard;
