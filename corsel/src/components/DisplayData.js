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
    <div style={{ display: 'flex', justifyContent: 'space-between' ,  flexDirection: 'column', marginTop: '10px' }}>

      <div style={{ marginBottom: '1px' }}>
      
        <div className="card" style={{ padding: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', backgroundColor: '#f4f4f4', margintop:'100px',marginBottom: '20px', width:'85rem', flexDirection: 'row'}}>
       
             {/* <h5 className="card-title">Filters</h5> */}
          
            <label htmlFor="searchQuery">Search:</label>
            <input
              type="text"
              id="searchQuery"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-control mb-2"
            />

            <label htmlFor="subjectFilter">Subject:</label>
            <select
              id="subjectFilter"
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
              className="form-control mb-2"
            >
              {subjects.map((subject, index) => (
                <option key={index} value={subject}>
                  {subject}
                </option>
              ))}
            </select>

            <label htmlFor="difficultyFilter">Difficulty:</label>
            <select
              id="difficultyFilter"
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="form-control mb-2"
            >
              {difficulties.map((difficulty, index) => (
                <option key={index} value={difficulty}>
                  {difficulty}
                </option>
              ))}
            </select>
          
        </div>
      </div>
      </div>
      <div style={{flexDirection: 'row', marginBottom: '20px' }}>

      <div style={{ marginBottom: '20px' }}>
        <div className="card" style={{ padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: '#f4f4f4', marginBottom: '20px' }}>
          <h5 className="card-title">Courses</h5>
          <div style={{ maxHeight: '500px', overflowY: 'auto', marginBottom: '0px' }} onScroll={handleScroll}>
            {loading ? (
              <p>Loading...</p>
            ) : filteredData.length === 0 ? (
              <p>No matching data found</p>
            ) : (
              <div>
                {filteredData
                  .slice(startIndex, startIndex + itemsPerPage)
                  .map((item, index) => (
                    <div key={index} style={{ border: '0px', background: '#b3d7ed', borderRadius: '0px', marginBottom: '10px' }}>
                      <CollapsibleClass classData={item} onAddClass={handleAddClass} />
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
      <div className="card" style={{ padding: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', backgroundColor: '#f4f4f4', marginBottom: '10px' }}>
      <FinalizedCourses finalizedCourses={selectedClasses} onRemove={handleRemoveClass} />
      <button className="btn btn-primary m-2" onClick={handleFinalizeSchedule}>
        Finalize Schedule
      </button>
         </div>
        
      </div>
      
    </div>
    </div>
  );
};

export default DisplayData;
