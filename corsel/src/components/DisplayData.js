import React, { useState, useEffect } from 'react';

const fetchDataFromBackend = async () => {
  const apiUrl = 'http://localhost:4000/data';  // Replace with your actual API URL

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return {};
  }
};

const DisplayData = () => {
  const [data, setData] = useState({});
  const [filteredData, setFilteredData] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await fetchDataFromBackend();
        setData(fetchedData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setData({});
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filterData = () => {
      const dataArray = Object.values(data);

      if (Array.isArray(dataArray)) {
        const filtered = dataArray.filter(
          item =>
            (subjectFilter === '' || item.courseCat.toLowerCase() === subjectFilter.toLowerCase()) &&
            (difficultyFilter === '' || item.courseDif.toLowerCase() === difficultyFilter.toLowerCase()) &&
            (Object.values(item).some(value =>
              typeof value === 'string' && value.toLowerCase().includes(searchQuery.toLowerCase())
            ))
        );
        setFilteredData(filtered);
      } else {
        setFilteredData({});
      }
    };

    filterData();
  }, [data, subjectFilter, difficultyFilter, searchQuery]);

  const subjects = ['Math', 'English', 'Social Studies', 'Science', 'Foreign Language', 'Art', 'MISC'];
  const difficulties = ['REG', 'AP'];

  const handleScroll = (e) => {
    const element = e.target;
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      // User has reached the bottom of the scroll container
      setStartIndex((prevIndex) => Math.min(prevIndex + itemsPerPage, filteredData.length));
    }
  };

  return (
    <div style={{ overflowY: 'auto', maxHeight: '500px' }} onScroll={handleScroll}>
      <h2>Data Display</h2>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search..."
      />
      <label>
        Subject:
        <select value={subjectFilter} onChange={(e) => setSubjectFilter(e.target.value)}>
          <option value="">All</option>
          {subjects.map((subject, index) => (
            <option key={index} value={subject}>{subject}</option>
          ))}
        </select>
      </label>
      <label>
        Difficulty:
        <select value={difficultyFilter} onChange={(e) => setDifficultyFilter(e.target.value)}>
          <option value="">All</option>
          {difficulties.map((difficulty, index) => (
            <option key={index} value={difficulty}>{difficulty}</option>
          ))}
        </select>
      </label>
      {loading ? (
        <p>Loading...</p>
      ) : filteredData.length === 0 ? (
        <p>No matching data found</p>
      ) : (
        <ul>
          {filteredData
            .slice(startIndex, startIndex + itemsPerPage)
            .map((item, index) => (
              <li key={index}>
                <p>Course Name: {item.courseInfo_courseName}</p>
                <p>Teacher: {item.sectionInfo_teacherDisplay}</p>
                {/* Add more fields as needed */}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default DisplayData;