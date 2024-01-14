// AddVolunteerOpportunityForm.js
import React, { useState } from 'react';

const AddVolunteerOpportunityForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    organization: '',
    location: '',
    dateAndTime: '',
    duration: '',
    skillsRequired: '',
    contactInformation: '',
    // Add other form fields as needed
  });

  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/volunteeropportunities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        console.error('Error adding volunteer opportunity. Status:', response.status);
        setSubmissionStatus('error');
        return;
      }

      const data = await response.json();
      console.log('Volunteer opportunity added successfully:', data);

      // Optionally, reset the form after successful submission
      setFormData({
        title: '',
        description: '',
        organization: '',
        location: '',
        dateAndTime: '',
        duration: '',
        skillsRequired: '',
        contactInformation: '',
        // Reset other form fields as needed
      });

      // Set submission status to success
      setSubmissionStatus('success');
    } catch (error) {
      console.error('Error adding volunteer opportunity:', error);
      setSubmissionStatus('error');
    }
  };

  return (
    <div className="form-container">
      <h2>Add New Volunteer Opportunity</h2>
      {submissionStatus === 'success' && <p className="success-message">Volunteer opportunity added successfully!</p>}
      {submissionStatus === 'error' && <p className="error-message">Error adding volunteer opportunity. Please try again.</p>}
      <form onSubmit={handleSubmit} className="volunteer-opportunity-form">
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <div>
          <label htmlFor="organization">Organization:</label>
          <input
            type="text"
            id="organization"
            name="organization"
            value={formData.organization}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="dateAndTime">Date and Time:</label>
          <input
            type="text"
            id="dateAndTime"
            name="dateAndTime"
            value={formData.dateAndTime}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="duration">Duration:</label>
          <input
            type="text"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="skillsRequired">Skills Required:</label>
          <input
            type="text"
            id="skillsRequired"
            name="skillsRequired"
            value={formData.skillsRequired}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="contactInformation">Contact Information:</label>
          <input
            type="text"
            id="contactInformation"
            name="contactInformation"
            value={formData.contactInformation}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit" className="button">
          Add Volunteer Opportunity
        </button>
      </form>
    </div>
  );
};

export default AddVolunteerOpportunityForm;
