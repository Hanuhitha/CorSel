import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import CollapsibleClass from './CollapsibleClass';
import { useNavigate } from 'react-router-dom';
import { useClassContext } from './ClassContext';
import ClassCart from './ClassCart';
import { db, auth } from './firebase';
//import CourseRecommendations from './CourseRecommendations';

const fetchDataFromBackend = async () => {
  const apiUrl = 'http://localhost:4000/data';

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return {};
  }
};

const ClassSearch = () => {

  const [currentUser, setCurrentUser] = useState(null); // Define currentUser state
  const [showRecommendations, setShowRecommendations] = useState(false); // New state for displaying recommendations
  const [showRegularCourses, setShowRegularCourses] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, []);
  
  const [data, setData] = useState({});
  const [filteredData, setFilteredData] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [recommendedCourses, setRecommendedCourses] = useState([]);

  
  const handleResetFilters = () => {
    setSubjectFilter('');
    setDifficultyFilter('');
    console.log(filteredData);
  };


  const handleShowRecommendations = async () => {
    try {
      const apiUrl = `http://localhost:4000/api/recommended-courses/${currentUser.uid}`;
      const response = await fetch(apiUrl);

      if (response.ok) {
        const recommendedData = await response.json();
        console.log('Recommended Courses data:', recommendedData);
        setRecommendedCourses(recommendedData);
      } else {
        console.error(`Error: ${response.statusText}`);
      }

      // Hide regular courses when showing recommendations
      setShowRegularCourses(false);
      setShowRecommendations(true);
    } catch (error) {
      console.error('Error fetching recommended courses:', error);
    }
  };

  // State to keep track of classes added to the Class Cart
  const [classesInCart, setClassesInCart] = useState([]);
  const { selectedClasses, setSelectedClasses } = useClassContext();

  // Use useHistory for navigation
  const history = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await fetchDataFromBackend();
        setData(fetchedData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setData({});
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const existingClasses = JSON.parse(localStorage.getItem('selectedClasses')) || [];
    setSelectedClasses(existingClasses);
  }, [setSelectedClasses]);

  useEffect(() => {
    const filterData = () => {
      const dataArray = Object.values(data);

      if (Array.isArray(dataArray)) {
        const filtered = dataArray.filter(
          item =>
            !selectedClasses.some(selected => selected.courseInfo_courseName === item.courseName) &&
            (subjectFilter === '' || item.courseCat.toLowerCase() === subjectFilter.toLowerCase()) &&
            (difficultyFilter === '' || item.courseDif.toLowerCase() === difficultyFilter.toLowerCase()) &&
            (Object.values(item).some(value =>
              typeof value === 'string' && value.toLowerCase().includes(searchQuery.toLowerCase())
            ))
        );
        setFilteredData(filtered);
      } else {
        setFilteredData([]);
      }
    };

    filterData();
  }, [data, selectedClasses, subjectFilter, difficultyFilter, searchQuery]);

  const subjects = ['Math', 'English', 'Social Studies', 'Science', 'Foreign Language', 'Art', 'MISC'];
  const difficulties = ['REG', 'HON', 'AP'];
  const [duplicateClassMessage, setDuplicateClassMessage] = useState('');

  const updateFinalizedSchedule = async (userId, selectedClass) => {
    try {
      const userDocRef = db.collection('users').doc(userId);
  
      await db.runTransaction(async (transaction) => {
        try {
          const doc = await transaction.get(userDocRef);
          const currentSchedule = doc.data().finalizedSchedule || [];
  
          const newCourseNumber = selectedClass?.courseInfo_courseNumber;
  
          if (typeof newCourseNumber === 'number' || !isNaN(newCourseNumber)) {
            const updatedSchedule = [...new Set([...currentSchedule, newCourseNumber])];
  
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
      console.log('Finalized Schedule after update:', updatedSchedule);
  
      return updatedSchedule;
    } catch (error) {
      console.error('Error updating finalized schedule:', error);
      return [];
    }
  };  
  
  const handleAddClass = (classData) => {
    // Check if the course number is already in selectedClasses or classesInCart
    const isClassAlreadyAdded = selectedClasses.some(selected => selected.courseInfo_courseNumber === classData.courseInfo_courseNumber) ||
                                classesInCart.some(cartItem => cartItem.courseInfo_courseNumber === classData.courseInfo_courseNumber);

    // If the class is not already added, proceed to add it
    if (!isClassAlreadyAdded) {
      // Add the class to the Class Cart state
      setClassesInCart((prevClasses) => [...prevClasses, classData]);
      // Clear any existing duplicate class message
      setDuplicateClassMessage('');
    } else {
      // Set a message to inform the user that the class is already added
      setDuplicateClassMessage(`Class with course number ${classData.courseInfo_courseNumber} is already in your cart or schedule.`);
    }
  };

  const handleRemoveClass = (classToRemove) => {
    // Remove the class from the Class Cart state
    const updatedClassesInCart = classesInCart.filter((classData) => classData !== classToRemove);
    setClassesInCart(updatedClassesInCart);
  };


  const handleAddCourses = async () => {
    // Add logic to send selected classes to the backend or perform any other action
  
    // Move classes from Class Cart to selectedClasses
    const updatedSelectedClasses = [...selectedClasses, ...classesInCart];
    setSelectedClasses(updatedSelectedClasses);
  
    // Clear the Class Cart state
    setClassesInCart([]);
  
    // Update localStorage
    localStorage.setItem('selectedClasses', JSON.stringify(updatedSelectedClasses));
  
    // Update finalized schedule for the current user
    const userId = currentUser.uid;
    for (const course of classesInCart) {
      await updateFinalizedSchedule(userId, course);
    }
  
    // Redirect to the Credits page after adding courses
    history('/Credits');
  };


  const addToCart = async (userId, extracurricularName) => {
    try {
        const userDocRef = db.collection('users').doc(userId);

        await db.runTransaction(async (transaction) => {
            try {
                const doc = await transaction.get(userDocRef);
                let userData = doc.data();

                // Create the finalizedExtracurriculars field if it doesn't exist
                if (!userData.finalizedExtracurriculars) {
                    userData = { ...userData, finalizedExtracurriculars: [] };
                }

                // Check if the extracurricular is already in the finalized extracurriculars
                const extracurricularExists = userData.finalizedExtracurriculars.includes(extracurricularName);

                if (!extracurricularExists) {
                    // Update the finalizedExtracurriculars array
                    userData.finalizedExtracurriculars.push(extracurricularName);
                    transaction.update(userDocRef, userData);
                } else {
                    console.error('Extracurricular already exists in the finalized extracurriculars.');
                    // Optionally handle this case further based on your needs
                }
            } catch (error) {
                console.error('Error within transaction:', error);
                throw error; // Rethrow the error to stop the transaction
            }
        });
    } catch (error) {
        console.error('Error adding extracurricular to finalized extracurriculars:', error);
        // Optionally handle this error based on your needs
    }
};


const handleAutofillClasses = async () => {
  try {
      const apiUrl = `http://localhost:4000/api/autofill-courses/${currentUser?.uid}`;
      const response = await fetch(apiUrl);
      console.log('hereeeeeee');

      if (response.ok) {
          const idArray = await response.json(); // Assuming the backend returns an array of IDs
          console.log('IDs:', idArray); // Log the array of IDs

          // Iterate over idArray and add each ID to the finalizedCourses array
          idArray.forEach(async (extracurricularName) => {
              await addToCart(currentUser?.uid, extracurricularName);
          });

      } else {
          console.error(`Error: ${response.statusText}`);
      }
  } catch (error) {
      console.error('Error fetching autofill courses:', error);
  }
};



  return (
    <div>
      <NavBar />
      <div style={{ marginTop: '100px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <div style={{ flex: '0 0 20%', marginBottom: '20px' }}>
          <div className="card" style={{ padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: '#f4f4f4' }}>
            <h5 className="card-title">Filters</h5>
            <div>
              <label htmlFor="searchQuery">Search:</label>
              <input
                type="text"
                id="searchQuery"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-control mb-2"
              />

              <label htmlFor="subjectFilter">Subject:</label>
              <select
                id="subjectFilter"
                value={subjectFilter}
                onChange={(e) => setSubjectFilter(e.target.value)}
                className="form-control mb-2"
              >
                <option value="">Select Subject</option>
                {subjects.map((subject, index) => (
                  <option key={index} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>

              <label htmlFor="difficultyFilter">Difficulty:</label>
              <select
                id="difficultyFilter"
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}
                className="form-control mb-2"
              >
                <option value="">Select Difficulty</option>
                {difficulties.map((difficulty, index) => (
                  <option key={index} value={difficulty}>
                    {difficulty}
                  </option>
                ))}
              </select>

              <button className="btn btn-secondary" onClick={handleResetFilters} style={{ marginRight: '10px'}}>
                Reset Filters
              </button>
              <button className="btn btn-primary" onClick={handleShowRecommendations} style={{ marginTop: '10px' }}>
                Show Recommendations
              </button>
              <button className="btn btn-primary" onClick={handleAutofillClasses} style={{ marginTop: '10px' }}>
                Autofill Classes
              </button>
            </div>
          </div>
        </div>

        <div style={{ flex: '20 0 0%', width: '1000px', marginBottom: '20px', marginLeft: '10px', marginRight: '10px'}}>
        <div className="card" style={{ width: '100%', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: '#f4f4f4', minHeight: '200px' }}>
          <h5 className="card-title">Courses</h5>
          <div style={{ height: '500px', overflowY: 'auto', marginBottom: '0px' }}>
            {loading ? (
              <p>Loading...</p>
            ) : showRecommendations ? (
              <div>
                {showRegularCourses && filteredData.map((item, index) => (
                  <div key={index} style={{ border: '0px', background: '#b3d7ed', borderRadius: '0px', marginBottom: '10px', minWidth: '20px' }}>
                    <CollapsibleClass classData={item} onAddClass={handleAddClass} />
                  </div>
                ))}
                {recommendedCourses.map((item, index) => (
                  <div key={index} style={{ border: '0px', background: '#b3d7ed', borderRadius: '0px', marginBottom: '10px', minWidth: '20px' }}>
                    <CollapsibleClass classData={item} onAddClass={handleAddClass} />
                  </div>
                ))}
              </div>
            ) : (
              <div>
                {filteredData.map((item, index) => (
                  <div key={index} style={{ border: '0px', background: '#b3d7ed', borderRadius: '0px', marginBottom: '10px', minWidth: '20px' }}>
                    <CollapsibleClass classData={item} onAddClass={handleAddClass} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

        <ClassCart
          classesInCart={classesInCart}
          onRemoveClass={handleRemoveClass}
          onAddCourses={handleAddCourses}
        />
      </div>
      {duplicateClassMessage && <p style={{ color: 'red' }}>{duplicateClassMessage}</p>}
    </div>
  );
};

export default ClassSearch;