import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import { useAuth } from '../contexts/AuthContext';
import { db, auth } from './firebase';

const CourseRecommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchDataFromBackend = async () => {  
      try {
        if (currentUser) {
          const apiUrl = `http://localhost:4000/api/recommended-courses/${currentUser.uid}`;
          const response = await fetch(apiUrl);

          if (response.ok) {  
            const data = await response.json();
            console.log('Recommendations data:', data);
            setRecommendations(data);
          } else {
            setError(`Error: ${response.statusText}`);
          }
        }
      } catch (error) {
        setError(`Error: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchDataFromBackend();
  }, [currentUser]);

  // Render loading state until authentication state is resolved
  if (loading) {
    return (
      <div>
        <NavBar />
        <div style={{ marginTop: '100px' }}>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // Render recommendations once authentication state is resolved
  return (
    <div>
      <NavBar />
      <div style={{ marginTop: '100px' }}>
        <h2>Course Recommendations</h2>
        {error ? (
          <p>{error}</p>
        ) : recommendations.length > 0 ? (
          <ul>
            {recommendations.map((course, index) => (
              <li key={index}>{course.courseName}</li>
            ))}
          </ul>
        ) : (
          <p>No recommendations available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default CourseRecommendations;
