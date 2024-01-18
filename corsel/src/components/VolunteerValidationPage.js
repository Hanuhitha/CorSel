import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';

const VolunteerValidationPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    studentId: '',
    volunteerHours: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle form submission (API call, validation, etc.)
    console.log('Form submitted:', formData);
  };

  return (
    <div style={{ marginTop: '2cm' }}>
      <NavBar />
      <div className="d-flex justify-content-center">
        <div style={{ margin: '20px' }}>
          <Link to="/my-commitments">
            <button className="btn btn-primary">My Commitments</button>
          </Link>
        </div>

        <div style={{ margin: '20px' }}>
          <Link to="/VolunteeringStats">
            <button className="btn btn-primary">View Stats & Goals</button>
          </Link>
        </div>

        <div style={{ margin: '20px' }}>
          <Link to="/find-opportunities">
            <button className="btn btn-primary">Find Opportunities</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VolunteerValidationPage;
