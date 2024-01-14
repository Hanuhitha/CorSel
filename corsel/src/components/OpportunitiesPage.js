import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';

const fetchDataFromBackend = async () => {
  const apiUrl = 'http://localhost:4000/volunteeropportunities';

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      console.error(`Error fetching data. Status: ${response.status}`);
      throw new Error(`Error fetching data. Status: ${response.status}`);
    }

    const data = await response.json();
    return data || {};
  } catch (error) {
    console.error('Network error:', error);
    return {};
  }
};

const OpportunitiesPage = () => {
  const [opportunities, setOpportunities] = useState({});
  const [filteredOpportunities, setFilteredOpportunities] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [durationFilter, setDurationFilter] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const fetchedOpportunities = await fetchDataFromBackend();
        console.log('Fetched Opportunities:', fetchedOpportunities);

        setOpportunities(fetchedOpportunities);
        setFilteredOpportunities(fetchedOpportunities);
      } catch (error) {
        console.error('Error fetching opportunities:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOpportunities();
  }, []);

  useEffect(() => {
    // Filter logic goes here
    // Update setFilteredOpportunities based on searchQuery or other filters

    const filtered = Object.entries(opportunities).filter(
      ([opportunityId, opportunity]) =>
        opportunityId.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (durationFilter ? opportunity.Duration === durationFilter : true)
    );

    // Convert filtered array back to an object
    const filteredOpportunitiesObject = Object.fromEntries(filtered);
    setFilteredOpportunities(filteredOpportunitiesObject);
  }, [searchQuery, durationFilter, opportunities]);

  return (
    <div style={{ display: 'flex', marginLeft: '10%', marginRight: '10%', marginTop: '75px' }}>
      {/* Filters on the Left */}
      <div style={{ flex: '1', marginRight: '20px', border: '1px solid #ccc', padding: '10px', marginBottom: '10px', borderRadius: '10px', boxShadow: '0px 0px 8px #999', backgroundColor: 'whitesmoke', fontFamily: '\'Chess Club Font\', sans-serif' }}>
        <h2 style={{ textAlign: 'center', fontWeight: 'normal', marginBottom: '5px' }}>Filter</h2>

        <label htmlFor="searchQuery">Search:</label>
        <input type="text" id="searchQuery" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />

        <label htmlFor="durationFilter">Filter by Duration:</label>
        <select
          id="durationFilter"
          value={durationFilter}
          onChange={(e) => setDurationFilter(e.target.value)}
        >
          <option value="">All</option>
          {/* Add duration options based on your data */}
        </select>

        <p>Selected Duration: {durationFilter || 'All'}</p>
      </div>

      {/* Opportunities Content */}
      <div style={{ flex: '2' }}>
        <NavBar />

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            {Object.entries(filteredOpportunities).map(([opportunityId, opportunity]) => (
              <div key={opportunityId} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px', borderRadius: '10px', boxShadow: '0px 0px 8px #999', backgroundColor: 'whitesmoke' }}>
                <h3>{opportunity.Title}</h3>
                <p>{opportunity.Description}</p>
                {opportunity.Organization && <p>Organization: {opportunity.Organization}</p>}
                {opportunity.Location && <p>Location: {opportunity.Location}</p>}
                {opportunity.DateAndTime && <p>Date and Time: {opportunity.DateAndTime}</p>}
                {opportunity.Duration && <p>Duration: {opportunity.Duration}</p>}
                {opportunity.SkillsRequired && <p>Skills Required: {opportunity.SkillsRequired}</p>}
                {opportunity.ContactInformation && <p>Contact: {opportunity.ContactInformation}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OpportunitiesPage;
