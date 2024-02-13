import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import FinalizedCourses from './FinalizedCourses';
import CreditBreakdown from './CreditBreakdown';
import { db, auth } from './firebase';
import { useClassContext } from './ClassContext';

const Credits = () => {

  const [, setFinalizedCourses] = useState(
    JSON.parse(localStorage.getItem('selectedClasses')) || []
  );

  const [currentUser, setCurrentUser] = useState(null); 

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  const [finalizedCourses] = useState(
    JSON.parse(localStorage.getItem('selectedClasses')) || []
  );
  const [, setSelectedYear] = useState(null);
  const captureRef = useRef(null);

  const { classesInCart, setClassesInCart } = useClassContext();

  const removeFromClassSchedule = async (userId, selectedClass) => {
    try {
      const userDocRef = db.collection('users').doc(userId);
  
      await db.runTransaction(async (transaction) => {
        try {
          const doc = await transaction.get(userDocRef);
          const currentSchedule = doc.data().finalizedSchedule || [];
  
          const removedCourseNumber = selectedClass?.courseInfo_courseNumber;
  
          if (typeof removedCourseNumber === 'number' || !isNaN(removedCourseNumber)) {
            const updatedSchedule = currentSchedule.filter(courseNumber => courseNumber !== removedCourseNumber);
  
            transaction.update(userDocRef, { finalizedSchedule: updatedSchedule });
          } else {
            console.error('Error: courseInfo_courseNumber is not a number.');
          }
        } catch (error) {
          console.error('Error within transaction:', error);
          throw error; 
        }
      });
  
      const updatedSchedule = await db.collection('users').doc(userId).get().then((doc) => doc.data().finalizedSchedule || []);
      console.log('Finalized Schedule after removal:', updatedSchedule);
  
      return updatedSchedule;
    } catch (error) {
      console.error('Error removing class from schedule:', error);
      return [];
    }
  };  

  const handleRemove = async (classToRemove, removedCourse) => {

    const updatedCourses = finalizedCourses.filter(
      (course) => course.courseInfo_courseName !== removedCourse.courseInfo_courseName
    );

    setFinalizedCourses(updatedCourses);
    localStorage.setItem('selectedClasses', JSON.stringify(updatedCourses));

    try { 
      if (currentUser && currentUser.uid) {
        const updatedSchedule = await removeFromClassSchedule(currentUser.uid, classToRemove);

      } else {
        console.error('Error: currentUser or currentUser.uid is not defined');
      }
    } catch (error) {
      console.error('Error handling removal:', error);
    }
  };

  const organizeCoursesByYearAndSemester = () => {
    const coursesByYearAndSemester = {};

    finalizedCourses.forEach((course) => {
      const year = course.courseYear || 'Uncategorized';
      const semester = course.CourseSem || 'Unknown';

      if (!coursesByYearAndSemester[year]) {
        coursesByYearAndSemester[year] = {};
      }

      if (!coursesByYearAndSemester[year][semester]) {
        coursesByYearAndSemester[year][semester] = [];
      }

      coursesByYearAndSemester[year][semester].push(course);
    });

    return coursesByYearAndSemester;
  };

  const coursesByYearAndSemester = organizeCoursesByYearAndSemester();

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

  const getYearClassName = (yearNumber) => {
    const yearNames = ['Freshman Year', 'Sophomore Year', 'Junior Year', 'Senior Year'];
    return yearNames[yearNumber - 1] || `Year ${yearNumber}`;
  };

  return (
    <div style={{ marginTop: '2cm' }}>
      <NavBar />
      <div ref={captureRef}>
        <div style={{ display: 'flex' }}>
          {Object.entries(coursesByYearAndSemester).map(([year, coursesBySemester]) => (
            <div
              key={year}
              style={{
                flex: 1,
                marginRight: '10px',
                marginLeft: '10px',
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
              onClick={() => setSelectedYear(year)}
            >
              <h3 style={{ fontSize: '1.5rem', margin: '0.5rem 5%', textAlign: 'center', padding: '0', color: 'inherit', textDecoration: 'none' }}>
                {getYearClassName(year)}
              </h3>
              {Object.entries(coursesBySemester).map(([semester, courses]) => (
                <div key={semester}>
                  <h4>{semester}</h4>
                  <FinalizedCourses finalizedCourses={courses} onRemove={handleRemove} />
                </div>
              ))}
              {coursesBySemester && Object.keys(coursesBySemester).length > 0 && (
                <div style={{ marginTop: 'auto', textAlign: 'center' }}>
                  <Link to={`/Credits/${year}`} state={{ year: year, courses: coursesBySemester }} style={{ textDecoration: 'none' }}>
                    <button className="btn btn-primary">More Details</button>
                  </Link>
                </div>
              )}
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
