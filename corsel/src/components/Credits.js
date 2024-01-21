import React, { useState, useRef } from 'react';
import NavBar from './NavBar';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import FinalizedCourses from './FinalizedCourses';
import CreditBreakdown from './CreditBreakdown';

const Credits = () => {
  const [finalizedCourses, setFinalizedCourses] = useState(
    JSON.parse(localStorage.getItem('selectedClasses')) || []
  );
  const captureRef = useRef(null);

  const handleRemove = (removedCourse) => {
    const updatedCourses = finalizedCourses.filter(
      (course) => course.courseInfo_courseName !== removedCourse.courseInfo_courseName
    );

    setFinalizedCourses(updatedCourses);
    localStorage.setItem('selectedClasses', JSON.stringify(updatedCourses));
  };

  const organizeCoursesByYear = () => {
    const coursesByYear = {};

    finalizedCourses.forEach(course => {
      const year = course.courseYear || 'Uncategorized';

      if (coursesByYear[year]) {
        coursesByYear[year].push(course);
      } else {
        coursesByYear[year] = [course];
      }
    });

    return coursesByYear;
  };

  const coursesByYear = organizeCoursesByYear();
  const yearMappings = {
    1: 'Freshman',
    2: 'Sophomore',
    3: 'Junior',
    4: 'Senior',
  };

  const handleCaptureSnapshot = () => {
    if (captureRef.current) {
      html2canvas(captureRef.current).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save('snapshot.pdf');
      });
    }
  };

  return (
    <div style={{ marginTop: '2cm' }}>
      <NavBar />
      <div ref={captureRef}>
        <div style={{ display: 'flex' }}>
          {[1, 2, 3, 4].map((yearNumber, index, array) => (
            <div
              key={yearNumber}
              style={{
                flex: 1,
                marginRight: index === array.length - 1 ? '10px' : '0px',
                marginLeft: index === 0 ? '10px' : '0px',
                borderRadius: '1rem',
                boxShadow: '0px 0px 8px #999',
                display: 'flex',
                flexDirection: 'column',
                margin: '1rem',
                backgroundColor: 'whitesmoke',
                height: 'fit-content',
                overflow: 'auto',
                padding: '1rem',
                width: '265px',
              }}
            >
              <h3 style={{ fontSize: '1.5rem', margin: '0.5rem 5%', textAlign: 'center', padding: '0', color: 'inherit', textDecoration: 'none' }}>
                {`${yearMappings[yearNumber]} Year`}
              </h3>
              <FinalizedCourses
                finalizedCourses={coursesByYear[yearNumber]}
                onRemove={handleRemove}
              />
              {/* Add other content related to courses if needed */}
            </div>
          ))}
          <div
            style={{
              flex: 1,
              marginRight: '10px',
              borderRadius: '1rem',
              boxShadow: '0px 0px 8px #999',
              display: 'flex',
              flexDirection: 'column',
              margin: '1rem',
              backgroundColor: 'whitesmoke',
              height: 'fit-content',
              overflow: 'auto',
              padding: '1rem',
              width: '250px',
            }}
          >
            <CreditBreakdown finalizedCourses={finalizedCourses} />
            <button className="btn btn-primary m-2" onClick={handleCaptureSnapshot}>Download Snapshot</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Credits;
