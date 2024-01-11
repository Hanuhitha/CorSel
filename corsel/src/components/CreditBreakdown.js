import React from 'react';

const CreditBreakdown = ({ finalizedCourses }) => {
  // Define categories and their required credits
  const allowedCategories = [
    { name: 'Math', requiredCredits: 7 },
    { name: 'English', requiredCredits: 7 },
    { name: 'Social Studies', requiredCredits: 7 },
    { name: 'Science', requiredCredits: 7 },
    { name: 'Foreign Language', requiredCredits: 7 },
    { name: 'Art', requiredCredits: 7 },
    { name: 'MISC', requiredCredits: 7 },
  ];

  // Function to calculate credit breakdown
  const calculateCreditBreakdown = () => {
    const creditBreakdown = {};

    // Initialize the breakdown with 0 credits for allowed categories
    allowedCategories.forEach(category => {
      creditBreakdown[category.name] = {
        earned: 0,
        required: category.requiredCredits,
      };
    });

    if (Array.isArray(finalizedCourses)) {
      finalizedCourses.forEach(course => {
        const category = course.courseCat || 'Uncategorized';
        const credits = course.Credits || 0;

        // Only accumulate credits for allowed categories
        if (creditBreakdown.hasOwnProperty(category)) {
          creditBreakdown[category].earned += credits;
        }
      });
    }

    return creditBreakdown;
  };

  // Calculate credit breakdown
  const creditBreakdown = calculateCreditBreakdown();

  // Calculate total earned credits
  const totalEarnedCredits = Object.values(creditBreakdown).reduce((acc, { earned }) => acc + earned, 0);

  return (
    <div>
      <h3>Credit Breakdown</h3>
      {Object.entries(creditBreakdown).map(([category, { earned, required }]) => (
        <div
          key={category}
          style={{
            border: '1px solid #ccc',
            padding: '10px',
            marginBottom: '10px',
            backgroundColor: earned >= required ? '#a3e8b3' : '#b3d7ed', // Light green when earned credits meet or exceed required
            borderRadius: '10px', // Optional: Add border radius for rounded corners
          }}
        >
          <p>
            <strong>{category}:</strong> {earned} out of {required} credits
          </p>
        </div>
      ))}
      <div
        style={{
          border: '1px solid #ccc',
          padding: '10px',
          marginBottom: '10px',
          backgroundColor: totalEarnedCredits >= 49 ? '#a3e8b3' : '#b3d7ed', // Light green when total earned credits meet or exceed 40
          borderRadius: '10px', // Optional: Add border radius for rounded corners
        }}
      >
        <p>
          <strong>Total Credits:</strong> {totalEarnedCredits} out of 40 credits
        </p>
      </div>
    </div>
  );
};

export default CreditBreakdown;
