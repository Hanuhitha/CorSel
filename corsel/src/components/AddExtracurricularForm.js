// AddExtracurricularForm.js
import React, { useState } from 'react';

const AddExtracurricularForm = () => {
  const [formData, setFormData] = useState({
    activityName: '',
    activityType: '',
    activityAdvisor: '',
    fee: '',
    studentContact: '',
    meetingTime: '',
    activityDescription: '',
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
    const response = await fetch('http://localhost:4000/extracurricular', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      console.error('Error adding extracurricular. Status:', response.status);
      setSubmissionStatus('error');
      return;
    }

    const data = await response.json();
    console.log('Extracurricular added successfully:', data);

    // Optionally, reset the form after successful submission
    setFormData({
      activityName: '',
      activityType: '',
      activityAdvisor: '',
      fee: '',
      studentContact: '',
      meetingTime: '',
      activityDescription: '',
      // Reset other form fields as needed
    });

    // Set submission status to success
    setSubmissionStatus('success');
  } catch (error) {
    console.error('Error adding extracurricular:', error);
    setSubmissionStatus('error');
  }
};

  return (
    <div className="form-container">
      <h2>Add New Extracurricular</h2>
      {submissionStatus === 'success' && <p className="success-message">Extracurricular added successfully!</p>}
      {submissionStatus === 'error' && <p className="error-message">Error adding extracurricular. Please try again.</p>}
      <form onSubmit={handleSubmit} className="extracurricular-form">
      <div>
        <label htmlFor="activityName">Activity Name:</label>
        <input
          type="text"
          id="activityName"
          name="activityName"
          value={formData.activityName}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label htmlFor="activityType">Activity Type:</label>
        <input
          type="text"
          id="activityType"
          name="activityType"
          value={formData.activityType}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label htmlFor="activityAdvisor">Activity Advisor:</label>
        <input
          type="text"
          id="activityAdvisor"
          name="activityAdvisor"
          value={formData.activityAdvisor}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label htmlFor="fee">Fee:</label>
        <input
          type="text"
          id="fee"
          name="fee"
          value={formData.fee}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label htmlFor="studentContact">Student Contact:</label>
        <input
          type="text"
          id="studentContact"
          name="studentContact"
          value={formData.studentContact}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label htmlFor="meetingTime">Meeting Time:</label>
        <input
          type="text"
          id="meetingTime"
          name="meetingTime"
          value={formData.meetingTime}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label htmlFor="activityDescription">Activity Description:</label>
        <textarea
          id="activityDescription"
          name="activityDescription"
          value={formData.activityDescription}
          onChange={handleInputChange}
        ></textarea>
      </div>
        <button type="submit" className="button">
          Add Extracurricular
        </button>
      </form>
    </div>
  );
};

export default AddExtracurricularForm;
