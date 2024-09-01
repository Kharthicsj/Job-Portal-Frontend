import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { clearUser } from '../Redux/userSlice'; 
import Cookies from 'js-cookie';
import { ListJobOffers } from '../API/Communicator';
import '../Styles/Dashboard.css';

const Dashboard = () => {
  const dispatch = useDispatch();
  const [jobOffers, setJobOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobOffers = async () => {
      try {
        const offers = await ListJobOffers();
        setJobOffers(offers);
      } catch (error) {
        setError('Failed to fetch job offers');
      } finally {
        setLoading(false);
      }
    };

    fetchJobOffers();
  }, []);

  const handleLogout = () => {
    dispatch(clearUser()); 
    Cookies.remove('authToken'); 
    localStorage.removeItem('authToken'); 
    window.location.href = '/login'; 
  };

  return (
    <div className="individual-dashboard-container">
      <button className="individual-logout-button" onClick={handleLogout}>Logout</button>
      <h1 className="individual-dashboard-title">Dashboard</h1>
      {loading ? (
        <p className="individual-loading-message">Loading...</p>
      ) : error ? (
        <p className="individual-error-message">{error}</p>
      ) : (
        <div className="individual-job-list">
          {jobOffers.map((offer, index) => (
            <div key={index} className="individual-job-card">
              <div className="individual-job-details">
                <div className="individual-company-name">{offer.company_name}</div>
                <div className="individual-job-title">{offer.job_title}</div>
                <div className="individual-job-description">{offer.description}</div>
                <div className="individual-job-email">{offer.email_address}</div>
                <div className="individual-job-phone">{offer.phone_number}</div>
              </div>
              <a
                href={`mailto:${offer.email_address}?subject=Job%20Application%20for%20${offer.job_title}`}
                className="individual-apply-button"
              >
                Apply
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
