import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import { Card } from './Card';
const fetchDataFromBackend = async () => {
  const apiUrl = 'http://localhost:4000/data';

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

const DisplayData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await fetchDataFromBackend();
      setData(fetchedData);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Data Display</h2>
      <ul>
        {Object.keys(data).map((key) => (
          <li key={key}>
            {/* Assuming you want to display the course name and teacher display */}
            <p>{data[key].courseInfo_courseName}</p>
            <p>{data[key].sectionInfo_teacherDisplay}</p>
            {/* Add more fields as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};


export default function ClassSearch() {
  return (
    <>
      <NavBar />
      <div style={{ justifyContent: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
          <div style={{}}>
            <Card
              title='Search/Filter'
              description=''
              width='15rem'
              height='31rem'
            />
          </div>
          <div>
            <Card
              title='Filtered Courses'
              description=''
              width='45rem'
              height='31rem'
              
            />
          </div>
          <div style={{ textAlign: 'center' }}>
            <Card
              title='Course Description'
              description=''
              width='16rem'
              height='31rem'
            />
          </div>
        </div>

        {/* Include the DisplayData component here */}
        <DisplayData />
      </div>
<<<<<<< Updated upstream
=======
      <div>
      <Card 
      title='Filtered Courses'
      description='courses list'
      width='45rem'
      height='31rem'
      />
      </div>
      <div style={{textAlign:'center'}}>
      <Card 
      title='Course Description'
      description=''
      width='16rem'
      height='31rem'
      />
      </div>
      </div>
    </div>

>>>>>>> Stashed changes
    </>
  );
}

