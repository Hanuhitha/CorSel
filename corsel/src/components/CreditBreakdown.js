import React from 'react';

const CreditBreakdown = ({ finalizedCourses }) => {
  // Function to calculate credit breakdown
const calculateCreditBreakdown = () => {
  const allCategories = ['Math', 'English', 'Social Studies', 'Science', 'Foreign Language', 'Art', 'MISC'];
  const creditBreakdown = {};

  // Initialize the breakdown with 0 credits for all categories
  allCategories.forEach(category => {
    creditBreakdown[category] = 0;
  });

  if (Array.isArray(finalizedCourses)) {
    finalizedCourses.forEach(course => {
      const category = course.courseCat || 'Uncategorized';
      const credits = course.Credits || 0;

      // Accumulate credits for each category
      creditBreakdown[category] += credits;
    });
  }

  return creditBreakdown;
};

  // Calculate credit breakdown
  const creditBreakdown = calculateCreditBreakdown();

  return (
    <div>
      <h3>Credit Breakdown</h3>
      {Object.entries(creditBreakdown).map(([category, credits]) => (
        <div key={category} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
          <p>
            <strong>{category}:</strong> {credits} credits
          </p>
        </div>
      ))}
      <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
        <p>
          <strong>Total Credits:</strong>{' '}
          {Object.values(creditBreakdown).reduce((acc, credits) => acc + credits, 0)} credits
        </p>
      </div>
    </div>
  );
};

export default CreditBreakdown;
