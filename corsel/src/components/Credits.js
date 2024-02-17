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
  const [, setSelectedYear] = useState(null);
  const captureRef = useRef(null);

  const { classesInCart, setClassesInCart } = useClassContext();

  const [currentUser, setCurrentUser] = useState(null);
  const [finalizedCourses, setFinalizedCourses] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchFinalizedCourses = async () => {
      try {
        if (currentUser && currentUser.uid) {
          const userDoc = await db.collection('users').doc(currentUser.uid).get();
          const userData = userDoc.data();
    
          // Assuming 'finalizedSchedule' contains an array of course IDs
          const userFinalizedCoursesIDs = userData?.finalizedSchedule || [];
    
          // Fetch the detailed course information for each course ID
          const userFinalizedCourses = await Promise.all(
            userFinalizedCoursesIDs.map(async (courseID) => {
              try {
                const courseDoc = await db.collection('your_collection_name').doc(courseID).get();
    
                if (courseDoc.exists) {
                  return courseDoc.data();
                } else {
                  console.warn(`Course with ID ${courseID} not found in the database.`);
                  return null;
                }
              } catch (error) {
                console.error(`Error fetching course with ID ${courseID}:`, error);
                return null;
              }
            })
          );
    
          // Filter out null courses
          const filteredCourses = userFinalizedCourses.filter(Boolean);
    
          console.log('userFinalizedCourses:', filteredCourses);
          setFinalizedCourses(filteredCourses);
        }
      } catch (error) {
        console.error('Error fetching finalized courses:', error);
      }
    };

    fetchFinalizedCourses();
  }, [currentUser]);  

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
            // Optionally handle this case further based on your needs
          }
        } catch (error) {
          console.error('Error within transaction:', error);
          throw error; // Rethrow the error to stop the transaction
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

  const handleRemove = async (classToRemove, courseInfo_courseName) => {
    try {
      if (courseInfo_courseName) {
        const updatedCourses = finalizedCourses.filter(
          (course) => course.courseInfo_courseName !== courseInfo_courseName
        );

        setFinalizedCourses(updatedCourses);

        if (currentUser && currentUser.uid) {
          const updatedSchedule = await removeFromClassSchedule(currentUser.uid, classToRemove);
          console.log('Updated schedule from database:', updatedSchedule);
        } else {
          console.error('Error: currentUser or currentUser.uid is not defined');
        }
      } else {
        console.error('Error: courseInfo_courseName is not valid or not provided');
      }
    } catch (error) {
      console.error('Error handling removal:', error);
    }
  };

  const organizeCoursesByYear = () => {
    const coursesByYear = {};
  
    finalizedCourses.forEach((course) => {
      // Check if the course object and courseYear property exist before accessing
      const year = course && course.courseYear ? course.courseYear : 'Uncategorized';
  
      if (coursesByYear[year]) {
        coursesByYear[year].push(course);
      } else {
        coursesByYear[year] = [course];
      }
    });
  
    return coursesByYear;
  };

  const coursesByYear = organizeCoursesByYear();

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
              onClick={() => setSelectedYear(yearNumber)}
            >
              <h3 style={{ fontSize: '1.5rem', margin: '0.5rem 5%', textAlign: 'center', padding: '0', color: 'inherit', textDecoration: 'none' }}>
                {getYearClassName(yearNumber)}
              </h3>
              <FinalizedCourses
                finalizedCourses={coursesByYear[yearNumber]}
                onRemove={(classToRemove, removedCourse) => handleRemove(classToRemove, removedCourse.courseInfo_courseName)}
              />
              {coursesByYear[yearNumber] && coursesByYear[yearNumber].length > 0 && (
                <div style={{ marginTop: 'auto', textAlign: 'center' }}>
                  <Link to={`/Credits/${yearNumber}`} state={{ year: yearNumber, courses: coursesByYear[yearNumber] }} style={{ textDecoration: 'none' }}>
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
