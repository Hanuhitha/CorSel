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
    <div style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }} className="form-container">
      <h2 style={{ textAlign: 'center' }}>Add New Extracurricular</h2>
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
            style={{ width: '50%', padding: '2px', boxSizing: 'border-box', marginBottom: '2px', border: '1px solid #ddd', borderRadius: '5px' }}
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
            style={{ width: '50%', padding: '2px', boxSizing: 'border-box', marginBottom: '2px', border: '1px solid #ddd', borderRadius: '5px' }}
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
            style={{ width: '50%', padding: '2px', boxSizing: 'border-box', marginBottom: '2px', border: '1px solid #ddd', borderRadius: '5px' }}
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
            style={{ width: '50%', padding: '2px', boxSizing: 'border-box', marginBottom: '2px', border: '1px solid #ddd', borderRadius: '5px' }}
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
            style={{ width: '50%', padding: '2px', boxSizing: 'border-box', marginBottom: '2px', border: '1px solid #ddd', borderRadius: '5px' }}
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
            style={{ width: '50%', padding: '2px', boxSizing: 'border-box', marginBottom: '2px', border: '1px solid #ddd', borderRadius: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="activityDescription">Activity Description:</label>
          <input
            id="activityDescription"
            name="activityDescription"
            value={formData.activityDescription}
            onChange={handleInputChange}
            style={{ width: '50%', padding: '2px', boxSizing: 'border-box', marginBottom: '2px', border: '1px solid #ddd', borderRadius: '5px', marginTop: '2px' }}
          ></input>
        </div>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button type="submit" className="button" style={{ backgroundColor: '#235dfc', color: 'white', padding: '8px 16px', borderRadius: '5px', outline: 'none' }}>
            Add Extracurricular
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddExtracurricularForm;
