import React from 'react';
import './FinalizedCourses.css'; // Import the CSS file

const FinalizedCourse = ({ course, onRemove }) => {
  const handleCardHover = (value) => {
    // You can add additional logic for handling card hover if needed
  };

  return (
    <div
      className="course-card"
      onMouseEnter={() => handleCardHover(true)}
      onMouseLeave={() => handleCardHover(false)}
    >
      {/* Course details */}
      <p>Course Name: {course.courseInfo_courseName}</p>
      <div className="details">
        <p>Teacher: {course.sectionInfo_teacherDisplay}</p>
        <p>Credits: {course.Credits}</p>
        {/* Add more details as needed */}
      </div>

      {/* Remove button */}
      <button className="btn btn-danger m-2" onClick={() => onRemove(course)}>
        Remove from Schedule
      </button>
    </div>
  );
};

const FinalizedCourses = ({ finalizedCourses, onRemove }) => {
  return (
    <div className="finalized-courses-container">
      {finalizedCourses && finalizedCourses.length > 0 ? (
        finalizedCourses.map((course, index) => (
          <FinalizedCourse key={index} course={course} onRemove={onRemove} />
        ))
      ) : (
        <p>No finalized courses available</p>
      )}
    </div>
  );
};

export default FinalizedCourses;
