import React from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from './NavBar';
import YearlyCreditBreakdown from './YearlyCreditBreakdown'; // Import the YearlyCreditBreakdown component

const getMissingCourses = (courses) => {
  // Define the required courses
  const requiredCourses = ['Math', 'English', 'Science', 'Social Studies'];

  // Find missing required courses
  const missingCourses = requiredCourses.filter((course) =>
    !courses.some((c) => c.courseCat === course)
  );

  return missingCourses;
};

const YearDetailsPage = () => {
  const location = useLocation();
  const year = location?.state?.year;
  const allCourses = location?.state?.courses;

  console.log("YearDetailsPage - Received year:", year);
  console.log("YearDetailsPage - Received courses:", allCourses);

  // Separate courses into core classes and elective courses
  const coreClasses = allCourses.filter((course) => ['Math', 'English', 'Science', 'Social Studies'].includes(course.courseCat));
  const electiveCourses = allCourses.filter((course) => !['Math', 'English', 'Science', 'Social Studies'].includes(course.courseCat));

  // Declare requiredCourses variable
  const requiredCourses = getMissingCourses(allCourses);

  // Function to calculate credit breakdown for core classes and elective courses
  const calculateCreditBreakdown = (courses) => {
    const creditBreakdown = {
      'Core Classes': { earned: 0, required: 28 }, // Adjust the required credits for core classes
      'Elective Courses': { earned: 0, required: 12 }, // Adjust the required credits for elective courses
    };

    // Accumulate credits for core classes
    coreClasses.forEach((course) => {
      const credits = course.Credits || 0;
      creditBreakdown['Core Classes'].earned += credits;
    });

    // Accumulate credits for elective courses
    electiveCourses.forEach((course) => {
      const credits = course.Credits || 0;
      creditBreakdown['Elective Courses'].earned += credits;
    });

    return creditBreakdown;
  };

  // Calculate credit breakdown for core classes and elective courses
  const creditBreakdown = calculateCreditBreakdown(allCourses);

  // Calculate total earned credits for core classes and elective courses
  const totalEarnedCoreCredits = creditBreakdown['Core Classes'].earned;
  const totalEarnedElectiveCredits = creditBreakdown['Elective Courses'].earned;

  return (
    <div>
      <NavBar />
      <div style={{ marginTop: '2cm', display: 'flex'}}>
        <div style={{ flex: 1, padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: '#f4f4f4', borderRadius: '10px', borderRadius: '10px',
          border: '1px solid #ccc' }}>
          <h4 style={{ fontSize: '1.65em', textAlign: 'center', margin: '10px 0 30px 0' }}>Details for {`Year ${year}`}</h4>
          {allCourses && allCourses.length > 0 ? (
            <div>
              <div style={{ display: 'flex' }}>
                <div style={{ flex: 1 }}>
                  <h5>Core Courses:</h5>
                  <ul style={{ listStyle: 'none', padding: '0' }}>
                    {coreClasses.map((course, index) => (
                      <li
                        key={index}
                        style={{
                          border: '1px solid #ccc',
                          padding: '10px',
                          marginBottom: '10px',
                          backgroundColor: '#a3e8b3',
                          borderRadius: '10px',
                        }}
                      >
                        <p>
                          <strong>Course Name:</strong> {course.courseInfo_courseName}<br />
                          <strong>Teacher:</strong> {course.sectionInfo_teacherDisplay}<br />
                          <strong>Course Number:</strong> {course.courseInfo_courseNumber}<br />
                          <strong>Difficulty:</strong> {course.courseDif}<br />
                          <strong>Credits:</strong> {course.Credits}<br />
                          {/* Add more fields as needed */}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
  
                <div style={{ flex: 1, marginLeft: '10px', marginRight: '10px' }}>
                  <h5>Elective Courses:</h5>
                  <ul style={{ listStyle: 'none', padding: '0' }}>
                    {electiveCourses.map((course, index) => (
                      <li
                        key={index}
                        style={{
                          border: '1px solid #ccc',
                          padding: '10px',
                          marginBottom: '10px',
                          backgroundColor: '#b3d7ed',
                          borderRadius: '10px',
                        }}
                      >
                        <p>
                          <strong>Course Name:</strong> {course.courseInfo_courseName}<br />
                          <strong>Teacher:</strong> {course.sectionInfo_teacherDisplay}<br />
                          <strong>Course Number:</strong> {course.courseInfo_courseNumber}<br />
                          <strong>Difficulty:</strong> {course.courseDif}<br />
                          <strong>Credits:</strong> {course.Credits}<br />
                          {/* Add more fields as needed */}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h5 style={{ flex: 1 }}>Missing Courses:</h5>
                  <ul style={{ listStyle: 'none', padding: '0' }}>
                    {requiredCourses.length === 0 ? (
                      <p style={{ margin: '0' }}>All required courses are completed!</p>
                    ) : (
                      requiredCourses.map((course, index) => (
                        <li
                          key={index}
                          style={{
                            border: '1px solid #ccc',
                            padding: '10px',
                            marginBottom: '10px',
                            backgroundColor: '#ff7f7f',
                            borderRadius: '10px',
                          }}
                        >
                          {course}
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <p>No courses available for this year.</p>
          )}
        </div>
  
        <div style={{ flex: 1, padding: '10px', marginLeft: '10px' }}>
          {/* Render YearlyCreditBreakdown component for the specific year */}
          <YearlyCreditBreakdown year={year} finalizedCourses={allCourses} />
        </div>
      </div>
    </div>
  );  
};

export default YearDetailsPage;
