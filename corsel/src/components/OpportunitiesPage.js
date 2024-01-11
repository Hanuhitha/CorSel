import React, { useState, useEffect } from 'react';

const OpportunitiesPage = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [newOpportunity, setNewOpportunity] = useState({
    title: '',
    description: '',
    // Add other fields as needed
  });

  useEffect(() => {
    // Fetch opportunities from the database
    // Replace the following with your actual API endpoint or database query
    fetch('your-api-endpoint-for-opportunities')
      .then(response => response.json())
      .then(data => setOpportunities(data));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOpportunity({
      ...newOpportunity,
      [name]: value,
    });
  };

  const handleAddOpportunity = () => {
    // Add logic for adding opportunity to the database
    // You can send a POST request to your API with the new opportunity data
    // After successfully adding, you can update the local state to reflect the changes
    console.log('Adding opportunity:', newOpportunity);
  };

  return (
    <div>
      <h2>Find Opportunities</h2>

      {/* Display existing opportunities */}
      <div>
        <h3>Available Opportunities</h3>
        <ul>
          {opportunities.map((opportunity, index) => (
            <li key={index}>
              <strong>{opportunity.title}</strong>: {opportunity.description}
              {/* Add other details as needed */}
            </li>
          ))}
        </ul>
      </div>

      {/* Form to add new opportunity */}
      <div>
        <h3>Add New Opportunity</h3>
        <form>
          <label>
            Title:
            <input type="text" name="title" value={newOpportunity.title} onChange={handleInputChange} />
          </label>
          <br />
          <label>
            Description:
            <textarea name="description" value={newOpportunity.description} onChange={handleInputChange} />
          </label>
          {/* Add other input fields as needed */}
          <br />
          <button type="button" onClick={handleAddOpportunity}>
            Add Opportunity
          </button>
        </form>
      </div>
    </div>
  );
};

export default OpportunitiesPage;
