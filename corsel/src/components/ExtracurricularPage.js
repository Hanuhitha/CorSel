import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';

const fetchDataFromBackend = async () => {
  const apiUrl = 'http://localhost:4000/extracurricular';

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

const ExtracurricularPage = () => {
  const [activities, setActivities] = useState({});
  const [filteredActivities, setFilteredActivities] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [activityTypeFilter, setActivityTypeFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [activityTypes, setActivityTypes] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const fetchedActivities = await fetchDataFromBackend();
        console.log('Fetched Extracurricular Activities:', fetchedActivities);

        setActivities(fetchedActivities);
        setFilteredActivities(fetchedActivities);

        // Extract unique activity types
        const types = [...new Set(Object.values(fetchedActivities).map((activity) => activity.ActivityType))];
        setActivityTypes(types);
      } catch (error) {
        console.error('Error fetching extracurricular activities:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  useEffect(() => {
    // Filter logic goes here
    // Update setFilteredActivities based on searchQuery or other filters

    const filtered = Object.entries(activities).filter(
      ([activityName, activity]) =>
        activityName.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (activityTypeFilter ? activity.ActivityType === activityTypeFilter : true)
    );

    // Convert filtered array back to an object
    const filteredActivitiesObject = Object.fromEntries(filtered);
    setFilteredActivities(filteredActivitiesObject);
  }, [searchQuery, activityTypeFilter, activities]);

  return (
    <div>
      {/* Navigation Bar */}
      <NavBar />

      {/* Rest of the content */}
      <div style={{ marginTop: '75px' }}>
        {/* Filters */}
        <label htmlFor="searchQuery">Search:</label>
        <input type="text" id="searchQuery" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />

        {/* Dropdown filter for Activity Type */}
        <label htmlFor="activityTypeFilter">Filter by Activity Type:</label>
        <select
          id="activityTypeFilter"
          value={activityTypeFilter}
          onChange={(e) => setActivityTypeFilter(e.target.value)}
        >
          <option value="">All</option>
          {activityTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        {/* Display selected Activity Type filter */}
        <p>Selected Activity Type: {activityTypeFilter || 'All'}</p>

        {/* Display filtered activities */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            {Object.entries(filteredActivities).map(([activityName, activity]) => (
              <div key={activityName} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                <h3>{activity.ActivityName}</h3>
                <p>{activity.ActivityDescription}</p>
                {activity.ActivityAdvisor && <p>Advisor: {activity.ActivityAdvisor}</p>}
                {activity.ActivityType && <p>Type: {activity.ActivityType}</p>}
                {activity.Fee && <p>Fee: {activity.Fee}</p>}
                {activity.StudentContact && <p>Contact: {activity.StudentContact}</p>}
                {activity.MeetingTime && <p>Meeting Details: {activity.MeetingTime}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExtracurricularPage;
