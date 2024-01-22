import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import { useAuth } from '../contexts/AuthContext';
import { getCourseRecommendations } from './api'; // Replace with your actual API call or recommendation logic

const CourseRecommendations = () => {
  const { currentUser } = useAuth();
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    // Fetch course recommendations based on user's finalized courses
    if (currentUser) {
      const userId = currentUser.id; // Replace with your actual user ID retrieval logic
      getCourseRecommendations(userId)
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
