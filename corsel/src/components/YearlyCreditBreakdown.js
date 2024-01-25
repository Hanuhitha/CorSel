import React from 'react';

const YearlyCreditBreakdown = ({ year, finalizedCourses }) => {
  // Define categories and their required credits for each year
  const yearlyCategories = {
    1: [
      { name: 'Math', requiredCredits: 3 },
      { name: 'English', requiredCredits: 3 },
      { name: 'Social Studies', requiredCredits: 3 },
      { name: 'Science', requiredCredits: 3 },
      { name: 'Foreign Language', requiredCredits: 3 },
      { name: 'Art', requiredCredits: 1 },
      { name: 'MISC', requiredCredits: 1 },
    ],
    2: [
      { name: 'Math', requiredCredits: 3 },
      { name: 'English', requiredCredits: 3 },
      { name: 'Social Studies', requiredCredits: 3 },
      { name: 'Science', requiredCredits: 3 },
      { name: 'Foreign Language', requiredCredits: 3 },
      { name: 'Art', requiredCredits: 1 },
      { name: 'MISC', requiredCredits: 1 },
    ],
    3: [
      { name: 'Math', requiredCredits: 3 },
      { name: 'English', requiredCredits: 3 },
      { name: 'Social Studies', requiredCredits: 3 },
      { name: 'Science', requiredCredits: 3 },
      { name: 'Foreign Language', requiredCredits: 3 },
      { name: 'Art', requiredCredits: 1 },
      { name: 'MISC', requiredCredits: 1 },
    ],
    4: [
      { name: 'Math', requiredCredits: 3 },
      { name: 'English', requiredCredits: 3 },
      { name: 'Social Studies', requiredCredits: 3 },
      { name: 'Science', requiredCredits: 3 },
      { name: 'Foreign Language', requiredCredits: 3 },
      { name: 'Art', requiredCredits: 1 },
      { name: 'MISC', requiredCredits: 1 },
    ],
  };

  // Function to calculate credit breakdown for a specific year
  const calculateCreditBreakdown = () => {
    const creditBreakdown = {};

    // Initialize the breakdown with 0 credits for categories
    yearlyCategories[year].forEach(category => {
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
      <h3>{`Credit Breakdown`}</h3>
      {Object.entries(creditBreakdown).map(([category, { earned, required }]) => (
        <div
          key={category}
          style={{
            border: '1px solid #ccc',
            padding: '10px',
            marginBottom: '10px',
            backgroundColor: earned >= required ? '#a3e8b3' : '#b3d7ed',
            borderRadius: '10px',
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
          backgroundColor: totalEarnedCredits >= 28 ? '#a3e8b3' : '#b3d7ed',
          borderRadius: '10px',
        }}
      >
        <p>
          <strong>Total Credits:</strong> {totalEarnedCredits} out of 28 credits
        </p>
      </div>
    </div>
  );
};

export default YearlyCreditBreakdown;
