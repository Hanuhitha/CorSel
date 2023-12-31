// DataComponent.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DataComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/data');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Data Component</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            <strong>ID:</strong> {item.id} <br />
            <strong>Name:</strong> {item.name} <br />
            <strong>Other Property:</strong> {item.otherProperty} {/* Add more properties as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DataComponent;



