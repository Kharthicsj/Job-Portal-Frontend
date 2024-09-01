import axios from 'axios';

const BASE_API_URL = 'http://localhost:4000';

export const IndividualSignupCommunicator = async (userData) => {
    try {
        const response = await axios.post(`${BASE_API_URL}/individuals`, userData);
        return response.data;
    } catch (error) {
        console.error('Error in IndividualSignupCommunicator:', error.response ? error.response.data : error.message);
        throw new Error(error.response.data.error || 'Error occurred');
    }
};

export const CompanySignupCommunicator = async (userData) => {
    try {
        const response = await axios.post(`${BASE_API_URL}/companies`, userData);
        return response.data;
    } catch (error) {
        console.error('Error in CompanySignupCommunicator:', error.response ? error.response.data : error.message);
        throw new Error(error.response.data.error || 'Error occurred');
    }
};

export const IndividualSignin = async (userData) => {
    try {
        const response = await axios.post(`${BASE_API_URL}/IndividualsSignin`, userData);
        return response.data;
    } catch (error) {
        console.error('Error in Sigin Process:', error.response ? error.response.data : error.message);
        throw new Error(error.response.data.error || 'Error occurred');
    }
};

export const CompanySignin = async (userData) => {
    try {
        const response = await axios.post(`${BASE_API_URL}/CompanySignin`, userData);
        return response.data;
    } catch (error) {
        console.error('Error in Sigin Process:', error.response ? error.response.data : error.message);
        throw new Error(error.response.data.error || 'Error occurred');
    }
};

export const JobOffers = async (jobData) => {
    try {
        const response = await axios.post(`${BASE_API_URL}/jobOffers`, jobData);
        return response.data;
    } catch (error) {
        console.error('Error in JobOffers:', error.response ? error.response.data : error.message);
        throw new Error(error.response.data.error || 'Error occurred');
    }
};

export const ListJobOffers = async () => {
    try {
      const response = await axios.get(`${BASE_API_URL}/ListjobOffers`);
      return response.data;
    } catch (error) {
      console.error('Error fetching job offers:', error.response ? error.response.data : error.message);
      throw new Error(error.response?.data?.error || 'An error occurred while fetching job offers');
    }
  };