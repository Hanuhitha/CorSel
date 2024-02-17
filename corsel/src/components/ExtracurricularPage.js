import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import {db, auth} from './firebase'

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
  const [cart, setCart] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const userId = currentUser?.uid; // Replace 'your_user_id' with the actual user ID

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
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
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
  const addToCart = async (userId, extracurricularName) => {
    try {
      const userDocRef = db.collection('users').doc(userId);
  
      await db.runTransaction(async (transaction) => {
        try {
          const doc = await transaction.get(userDocRef);
          let userData = doc.data();
  
          // Create the finalizedExtracurriculars field if it doesn't exist
          if (!userData.finalizedExtracurriculars) {
            userData = { ...userData, finalizedExtracurriculars: [] };
          }
  
          // Check if the extracurricular is already in the finalized extracurriculars
          const extracurricularExists = userData.finalizedExtracurriculars.includes(extracurricularName);
  
          if (!extracurricularExists) {
            // Update the finalizedExtracurriculars array
            userData.finalizedExtracurriculars.push(extracurricularName);
            transaction.update(userDocRef, userData);
          } else {
            console.error('Extracurricular already exists in the finalized extracurriculars.');
            // Optionally handle this case further based on your needs
          }
        } catch (error) {
          console.error('Error within transaction:', error);
          throw error; // Rethrow the error to stop the transaction
        }
      });
    } catch (error) {
      console.error('Error adding extracurricular to finalized extracurriculars:', error);
      // Optionally handle this error based on your needs
    }
  };

  const handleAddToCart = (activityName) => {
    addToCart(userId, activityName);
    setCart(prevCart => [...prevCart, activityName]);
  };

  return (
    <div style={{ display: 'flex', marginLeft: '10%', marginRight: '10%', marginTop: '75px' }}>
      {/* Filters on the Left */}
      <div style={{ flex: '1', marginRight: '20px', border: '1px solid #ccc', padding: '20px', marginBottom: '20px', borderRadius: '10px', boxShadow: '0px 0px 8px #999', backgroundColor: '#f4f4f4', maxHeight: '250px', overflowY: 'auto' }}>
        <h5 style={{ textAlign: 'center', fontWeight: 'normal', marginBottom: '10px' }}>Filter</h5>

        <label htmlFor="searchQuery">Search:</label>
        <input type="text" id="searchQuery" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="form-control mb-2" />

        <label htmlFor="activityTypeFilter">Filter:</label>
        <select
          id="activityTypeFilter"
          value={activityTypeFilter}
          onChange={(e) => setActivityTypeFilter(e.target.value)}
          className="form-control mb-2"
        >
          <option value="">All</option>
          {activityTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Extracurricular Content */}
      <div style={{ flex: '2', maxHeight: '500px', overflowY: 'auto' }}>
        <NavBar />

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            {Object.entries(filteredActivities).map(([activityName, activity]) => (
              <div key={activityName} className="activity-card">
                <div className="activity-details">
                  {/* Club Content */}
                  <h3>{activity.ActivityName}</h3>
                  <p>{activity.ActivityDescription}</p>
                  {activity.ActivityAdvisor && <p>Advisor: {activity.ActivityAdvisor}</p>}
                  {activity.ActivityType && <p>Type: {activity.ActivityType}</p>}
                  {activity.Fee && <p>Fee: {activity.Fee}</p>}
                  {activity.StudentContact && <p>Contact: {activity.StudentContact}</p>}
                  {activity.MeetingTime && <p>Meeting Details: {activity.MeetingTime}</p>}
                </div>
                <button
                  className="add-to-cart-btn"
                  onClick={() => handleAddToCart(activityName)}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Extracurricular Cart */}
      <div style={{ flex: '1', marginLeft: '20px', border: '1px solid #ccc', padding: '20px', borderRadius: '10px', boxShadow: '0px 0px 8px #999', backgroundColor: '#f4f4f4', maxHeight: '500px', overflowY: 'auto' }}>
        <h5 style={{ textAlign: 'center', fontWeight: 'normal', marginBottom: '10px' }}>Extracurricular Cart</h5>
        <ul>
          {cart.map((activityName, index) => (
            <li key={index}>
              <h3>{activityName}</h3>
              {/* Optionally display more information about the extracurricular */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExtracurricularPage;
