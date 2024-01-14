// AddClassForm.js
import React, { useState } from 'react';

const AddClassForm = () => {
  const [formData, setFormData] = useState({
    courseInfo_courseNumber: '',
    credits: '',
    courseInfo_courseName: '',
    sch_name: '',
    sectionInfo_sectionNumber: '',
    sectionInfo_teacherDisplay: '',
    cal_name: '',
    courseYear: '',
    courseDif: '',
    courseCat: '',
    ID: '',
    max_capacity: '',
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
      // Perform data submission to your backend/API here
      const response = await fetch('http://localhost:4000/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        console.error('Error adding class. Status:', response.status);
        // Handle error as needed
        setSubmissionStatus('error');
        return;
      }

      const data = await response.json();
      console.log('Class added successfully:', data);

      // Optionally, reset the form after successful submission
      setFormData({
        courseInfo_courseNumber: '',
        credits: '',
        courseInfo_courseName: '',
        sch_name: '',
        sectionInfo_sectionNumber: '',
        sectionInfo_teacherDisplay: '',
        cal_name: '',
        courseYear: '',
        courseDif: '',
        courseCat: '',
        ID: '',
        max_capacity: '',
        // Reset other form fields as needed
      });

      // Set submission status to success
      setSubmissionStatus('success');
    } catch (error) {
      console.error('Error adding class:', error);
      // Handle error as needed
      setSubmissionStatus('error');
    }
  };

  return (
    <div className="form-container">
      <h2>Add New Class</h2>
      {submissionStatus === 'success' && <p className="success-message">Class added successfully!</p>}
      {submissionStatus === 'error' && <p className="error-message">Error adding class. Please try again.</p>}
      <form onSubmit={handleSubmit} className="class-form">
      <div>
        <label htmlFor="courseInfo_courseNumber">Course Number:</label>
        <input
          type="text"
          id="courseInfo_courseNumber"
          name="courseInfo_courseNumber"
          value={formData.courseInfo_courseNumber}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label htmlFor="credits">Credits:</label>
        <input
          type="text"
          id="credits"
          name="credits"
          value={formData.credits}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label htmlFor="courseInfo_courseName">Course Name:</label>
        <input
          type="text"
          id="courseInfo_courseName"
          name="courseInfo_courseName"
          value={formData.courseInfo_courseName}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label htmlFor="sch_name">School Name:</label>
        <input
          type="text"
          id="sch_name"
          name="sch_name"
          value={formData.sch_name}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label htmlFor="sectionInfo_sectionNumber">Section Number:</label>
        <input
          type="text"
          id="sectionInfo_sectionNumber"
          name="sectionInfo_sectionNumber"
          value={formData.sectionInfo_sectionNumber}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label htmlFor="sectionInfo_teacherDisplay">Teacher Display:</label>
        <input
          type="text"
          id="sectionInfo_teacherDisplay"
          name="sectionInfo_teacherDisplay"
          value={formData.sectionInfo_teacherDisplay}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label htmlFor="cal_name">Calendar Name:</label>
        <input
          type="text"
          id="cal_name"
          name="cal_name"
          value={formData.cal_name}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label htmlFor="courseYear">Course Year:</label>
        <input
          type="text"
          id="courseYear"
          name="courseYear"
          value={formData.courseYear}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label htmlFor="courseDif">Course Difficulty:</label>
        <input
          type="text"
          id="courseDif"
          name="courseDif"
          value={formData.courseDif}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label htmlFor="courseCat">Course Category:</label>
        <input
          type="text"
          id="courseCat"
          name="courseCat"
          value={formData.courseCat}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label htmlFor="ID">ID:</label>
        <input
          type="text"
          id="ID"
          name="ID"
          value={formData.ID}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label htmlFor="max_capacity">Max Capacity:</label>
        <input
          type="text"
          id="max_capacity"
          name="max_capacity"
          value={formData.max_capacity}
          onChange={handleInputChange}
        />
      </div>

        <button type="submit" className="button">
          Add Class
        </button>
      </form>
    </div>
  );
};

export default AddClassForm;
