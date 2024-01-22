import React from 'react';

const YearDetailsPage = ({ year, courses }) => {
  return (
    <div>
      <h4>Details for {`Year ${year}`}</h4>
      {courses && courses.length > 0 ? (
        <ul>
          {courses.map((course, index) => (
            <li key={index}>{course.courseInfo_courseName}</li>
          ))}
        </ul>
      ) : (
        <p>No courses available for this year.</p>
      )}
    </div>
  );
};

export default YearDetailsPage;
