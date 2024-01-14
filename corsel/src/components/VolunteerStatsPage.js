import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';

const StatsPage = () => {
  const [overviewStats, setOverviewStats] = useState({
    totalHours: 0,
  });

  const [organizationData, setOrganizationData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
        hoverBackgroundColor: [],
      },
    ],
  });

  const [serviceRecord, setServiceRecord] = useState([]);

  useEffect(() => {
    // Fetch data from your database or API here
    // Replace the following with your actual API endpoint or database query

    // Example fetch for overview stats
    fetch('your-api-endpoint-for-overview-stats')
      .then(response => response.json())
      .then(data => setOverviewStats(data));

    // Example fetch for organization data
    fetch('your-api-endpoint-for-organization-data')
      .then(response => response.json())
      .then(data => setOrganizationData(data));

    // Example fetch for service record
    fetch('your-api-endpoint-for-service-record')
      .then(response => response.json())
      .then(data => setServiceRecord(data));
  }, []); // Empty dependency array ensures the effect runs once on component mount

  const exportServiceRecord = () => {
    // Add logic for exporting service record
    console.log('Exporting service record:', serviceRecord);
  };

  return (
    <div>
      <h2>Stats</h2>
      <div>
        <h3>Overview</h3>
        <p>Total Hours: {overviewStats.totalHours}</p>
        <div style={{ width: '50%', margin: 'auto' }}>
          {/* Pie chart for organizations */}
          <Pie data={organizationData} />
        </div>
      </div>
      <div>
        <h3>Service Record</h3>
        {serviceRecord.map((record, index) => (
          <div key={index}>
            {/* Display service record information */}
            <p>Date: {record.date}</p>
            <p>Hours: {record.hours}</p>
            <p>Project: {record.project}</p>
          </div>
        ))}
        {/* Button to export service record */}
        <button onClick={exportServiceRecord}>Export Service Record</button>
      </div>
    </div>
  );
};

export default StatsPage;
