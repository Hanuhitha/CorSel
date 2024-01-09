import React, { useState, useEffect } from 'react';
import CollapsibleClass from './CollapsibleClass';
import FinalizedCourses from './FinalizedCourses';
import FilterBar from './FilterBar';

const fetchDataFromBackend = async () => {
  const apiUrl = 'http://localhost:4000/data';

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
  const [selectedClasses, setSelectedClasses] = useState([]);
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

  // Retrieve existing classes from local storage
  const existingClasses = JSON.parse(localStorage.getItem('selectedClasses')) || [];
  setSelectedClasses(existingClasses);
}, []); // Empty dependency array ensures it runs only once on mount

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
  const difficulties = ['REG', 'HON', 'AP'];

  const handleScroll = (e) => {
    const element = e.target;
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      setStartIndex((prevIndex) => Math.min(prevIndex + itemsPerPage, filteredData.length));
    }
  };

  const handleAddClass = (classData) => {
    const updatedSelectedClasses = [...selectedClasses, classData];
    setSelectedClasses(updatedSelectedClasses);
    localStorage.setItem('selectedClasses', JSON.stringify(updatedSelectedClasses));
  };

  const handleFinalizeSchedule = () => {
    console.log('Finalized Schedule:', selectedClasses);
    // You can send the selected classes to the central database here
  };

  const handleRemoveClass = (classToRemove) => {
    const updatedSelectedClasses = selectedClasses.filter((classData) => classData !== classToRemove);
    setSelectedClasses(updatedSelectedClasses);
    localStorage.setItem('selectedClasses', JSON.stringify(updatedSelectedClasses));
  };

  return (
    <div>
      <div>
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          subjectFilter={subjectFilter}
          onSubjectChange={setSubjectFilter}
          difficultyFilter={difficultyFilter}
          onDifficultyChange={setDifficultyFilter}
          subjects={subjects}
          difficulties={difficulties}
        />
      </div>
      <div style={{ maxHeight: '500px', overflowY: 'auto', padding: '10px', marginBottom: '20px' }} onScroll={handleScroll}>
        {loading ? (
          <p>Loading...</p>
        ) : filteredData.length === 0 ? (
          <p>No matching data found</p>
        ) : (
          <div>
            {filteredData
              .slice(startIndex, startIndex + itemsPerPage)
              .map((item, index) => (
                <div key={index}>
                  <CollapsibleClass classData={item} onAddClass={handleAddClass} />
                </div>
              ))}
          </div>
        )}
      </div>

      <div style={{ marginTop: '20px' }}>
        <FinalizedCourses finalizedCourses={selectedClasses} onRemove={handleRemoveClass} />
      </div>
      <button className="btn btn-primary m-2" onClick={handleFinalizeSchedule}>
        Finalize Schedule
      </button>
    </div>
  );
};

export default DisplayData;
