import React, { useState, useEffect, useRef } from 'react';
import NavBar from './NavBar';
import FinalizedCourses from './FinalizedCourses';
import CreditBreakdown from './CreditBreakdown';
import { db, auth } from './firebase';
import { useClassContext } from './ClassContext';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Link } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import { getDatabase, ref, get } from 'firebase/database';


const Credits = () => {
  const [finalizedCourses, setFinalizedCourses] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [, setSelectedYear] = useState(null);
  const captureRef = useRef(null);
  const { classesInCart, setClassesInCart } = useClassContext();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        setCurrentUser(user);

        if (user) {
          const userDocRef = db.collection('users').doc(user.uid);
          const userDoc = await userDocRef.get();

          if (userDoc.exists) {
            const userData = userDoc.data();
            const courseIds = userData.finalizedSchedule || [];

            // Fetch course details from the Realtime Database
            const courses = await fetchCoursesFromDatabase(courseIds);
            setFinalizedCourses(courses);
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const fetchCoursesFromDatabase = async (courseIds) => {
    try {
      const projectAndCollectionId = '1U2CarXeOMX2zCAUFSDnO1ndxuE3tPDYfY3EOOqH7s_M/RCHS_SY2122_2223';
  
      const dbRef = ref(getDatabase(), projectAndCollectionId);
      const coursesSnapshot = await get(dbRef);
  
      const allCourses = [];
      coursesSnapshot.forEach((courseSnapshot) => {
        const courseData = courseSnapshot.val();
        allCourses.push({
          CourseDifficulty: courseData.CourseDifficulty,
          CourseSem: courseData.CourseSem,
          Credits: courseData.Credits,
          cal_name: courseData.cal_name,
          courseCat: courseData.courseCat,
          courseDif: courseData.courseDif,
          courseInfo_courseName: courseData.courseInfo_courseName,
          courseInfo_courseNumber: courseData.courseInfo_courseNumber,
          courseYear: courseData.courseYear,
          max_capacity: courseData.max_capacity,
          sch_name: courseData.sch_name,
          sectionInfo_sectionNumber: courseData.sectionInfo_sectionNumber,
          sectionInfo_teacherDisplay: courseData.sectionInfo_teacherDisplay,
        });
      });
  
      console.log('Fetched all courses from the Realtime Database:', allCourses);
  
      // Filter courses based on course IDs
      const fetchedCourses = allCourses.filter(course => courseIds.includes(course.courseInfo_courseNumber));
  
      console.log('Filtered courses based on course IDs:', fetchedCourses);
  
      return fetchedCourses;
    } catch (error) {
      console.error('Error fetching courses from the Realtime Database:', error);
      return [];
    }
  };
  
  
  const removeFromClassSchedule = async (userId, selectedClass) => {
    try {
      const userDocRef = db.collection('users').doc(userId);

      await db.runTransaction(async (transaction) => {
        try {
          const doc = await transaction.get(userDocRef);
          const currentSchedule = doc.data().finalizedSchedule || [];

          const removedCourseNumber = selectedClass?.courseInfo_courseNumber;

          if (typeof removedCourseNumber === 'number' || !isNaN(removedCourseNumber)) {
            const updatedSchedule = currentSchedule.filter((courseNumber) => courseNumber !== removedCourseNumber);

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

  const organizeCoursesByYear = () => {
    const coursesByYear = {};

    finalizedCourses.forEach((course) => {
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
              <FinalizedCourses finalizedCourses={coursesByYear[yearNumber]} onRemove={handleRemove} />
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
