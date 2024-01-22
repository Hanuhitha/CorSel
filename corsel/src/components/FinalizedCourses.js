import React, { useState } from 'react';
import './FinalizedCourses.css'; // Import the CSS file

const FinalizedCourse = ({ course, onRemove }) => {
  const [isCardExpanded, setCardExpanded] = useState(false);

  const handleCardHover = (value) => {
    setCardExpanded(value);
  };

  return (
    <div
      className={isCardExpanded ? 'expanded-card' : 'collapsed-card'}
      onMouseEnter={() => handleCardHover(true)}
      onMouseLeave={() => handleCardHover(false)}
    >
      <p>Course Name: {course.courseInfo_courseName}</p>
      {/* Show additional details always, but style based on card expansion */}
      <div className={isCardExpanded ? 'expanded-details' : 'collapsed-details'}>
        <p>Teacher: {course.sectionInfo_teacherDisplay}</p>
        <p>Credits: {course.Credits}</p>
        {/* Add more details as needed */}
      </div>

      {/* Remove button */}
      {isCardExpanded && (
        <button className="btn btn-danger m-2" onClick={() => onRemove(course)}>
          Remove from Schedule
        </button>
      )}
    </div>
  );
};

const FinalizedCourses = ({ finalizedCourses, onRemove }) => {
  return (
    <div style={{ textAlign: 'center', marginTop: 'auto' }}>
      {finalizedCourses ? (
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
