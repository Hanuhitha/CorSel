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
    <div style={{ backgroundColor: '#f4f4f4', padding: '20px', borderRadius: '10px', boxShadow: '0px 0px 8px #999', marginTop: '75px' }}>
      <div style={{ display: 'flex', marginLeft: '10%', marginRight: '10%' }}>
        {/* Extracurricular Content */}
        <div style={{ flex: '2', maxHeight: '500px', overflowY: 'auto' }}>
          <NavBar />
    
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div>
              {Object.entries(filteredActivities).map(([activityName, activity]) => (
                <div key={activityName} style={{ width: '800px', border: '1px solid #ccc', padding: '10px', marginBottom: '20px', borderRadius: '10px', boxShadow: '0px 0px 8px #999', backgroundColor: '#f4f4f4' }}>
                  <div style={{ width: '50px', border: '2px solid #007BFF', padding: '5px', borderRadius: '8px', marginBottom: '10px' }}>
                    {/* Club Content */}
                    <h3>Question 1</h3> {/* Here's the change */}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );    
  
}

export default ExtracurricularPage;
