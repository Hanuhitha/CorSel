import React, { useState, useEffect } from 'react';

const TeacherList = () => {
  const [teacherList, setTeacherList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from the backend (replace the URL with your actual API endpoint)
        const response = await fetch('http://localhost:4000/data');
        const data = await response.json();

        if (typeof data === 'object' && data !== null) {
          // Extract unique teachers and initialize their counts to 0
          const uniqueTeachers = Array.from(new Set(Object.values(data).map(item => item.sectionInfo_teacherDisplay)));
          setTeacherList(uniqueTeachers.map((teacher) => ({ name: teacher, count: 0 })));
        } else {
          console.error('Fetched data is not an object:', data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="card" style={{ width: '90%', maxWidth: '1200px', margin: 'auto', maxHeight: '300px', overflowY: 'auto', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: '#f4f4f4', marginBottom: '20px' }}>
      <h5 className="card-title">All Teachers</h5>
      <ul>
        {teacherList.map((teacher, index) => (
          <li key={index}>
            {teacher.name} : {teacher.count}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeacherList;
