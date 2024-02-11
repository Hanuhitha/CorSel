import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import { useAuth } from '../contexts/AuthContext';

const CourseRecommendations = () => {
  const { currentUser } = useAuth();
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    // Fetch course recommendations from the backend API
    if (currentUser) {
      // Assuming your backend API endpoint is /api/recommendations and it requires authentication
      fetch('/api/recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Include any necessary authentication headers
        },
        body: JSON.stringify({ studentId: currentUser.id }), // Send the current user's ID to the backend
      })
        .then((response) => response.json())
        .then((data) => setRecommendations(data))
        .catch((error) => console.error('Error fetching recommendations:', error));
    }
  }, [currentUser]);

  return (
    <div>
      <NavBar />

      <div style={{ marginTop: '100px' }}>
        <h2>Course Recommendations</h2>
        <p>Based on your finalized courses and other factors, we recommend the following courses:</p>

        {recommendations.length > 0 ? (
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
