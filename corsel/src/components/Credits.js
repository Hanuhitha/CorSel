import React, { useState } from 'react';
import NavBar from './NavBar';
import FinalizedCourses from './FinalizedCourses';
import CreditBreakdown from './CreditBreakdown';

const Credits = () => {
  // Retrieve finalized courses from local storage or any other source
  const [finalizedCourses, setFinalizedCourses] = useState(
    JSON.parse(localStorage.getItem('selectedClasses')) || []
  );

  // Function to remove a course from the schedule
  const handleRemove = (removedCourse) => {
    // Filter out the removed course from the list
    const updatedCourses = finalizedCourses.filter(
      (course) => course.courseInfo_courseName !== removedCourse.courseInfo_courseName
    );

    // Update state with the new list of finalized courses
    setFinalizedCourses(updatedCourses);

    // Update local storage with the new list
    localStorage.setItem('selectedClasses', JSON.stringify(updatedCourses));
  };

  // Function to organize finalized courses into separate arrays based on courseYear
  const organizeCoursesByYear = () => {
    const coursesByYear = {};

    finalizedCourses.forEach(course => {
      const year = course.courseYear || 'Uncategorized'; // Use 'Uncategorized' if courseYear is undefined

      if (coursesByYear[year]) {
        coursesByYear[year].push(course);
      } else {
        coursesByYear[year] = [course];
      }
    });

    return coursesByYear;
  };

  // Organize finalized courses by year
  const coursesByYear = organizeCoursesByYear();

  // Map the numeric year to its corresponding string
  const yearMappings = {
    1: 'Freshman',
    2: 'Sophomore',
    3: 'Junior',
    4: 'Senior',
  };

  return (
    <div>
      <NavBar />
      <div style={{ display: 'flex' }}>
        {[1, 2, 3, 4].map((yearNumber) => (
          <div key={yearNumber} style={{ flex: 1, marginRight: '20px' }}>
            <h3>{`${yearMappings[yearNumber]} Year`}</h3>
            <FinalizedCourses
              finalizedCourses={coursesByYear[yearNumber]}
              onRemove={handleRemove}
            />
            {/* Add other content related to courses if needed */}
          </div>
        ))}
        <div style={{ flex: 1 }}>
          <CreditBreakdown finalizedCourses={finalizedCourses} />
        </div>
      </div>
    </div>
  );
};

export default Credits;
