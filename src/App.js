import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPerson from './Pages/Login_person';
import CompanySignup from './Pages/Signup_company';
import LoginCompany from './Pages/Login_company';
import PersonSignup from './Pages/Signup_person';
import ProtectedRoute from './Redux/ProtectedRoute';
import Dashboard from './Pages/Dashboard';
import CompanyDashboard from './Pages/CompanyDashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPerson />} />
        <Route path="/signup/company" element={<CompanySignup />} />
        <Route path="/login/company" element={<LoginCompany />} />
        <Route path="/signup/person" element={<PersonSignup />} />

        {/* Protected Route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <CompanyDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/company-dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/" element={<LoginPerson />} />

      </Routes>
    </Router>
  );
};

export default App;
