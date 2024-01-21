import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import CollapsibleClass from './CollapsibleClass';
import { useNavigate } from 'react-router-dom';
import { useClassContext } from './ClassContext';
import ClassCart from './ClassCart';

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

const ClassSearch = () => {
  const [data, setData] = useState({});
  const [filteredData, setFilteredData] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('');
  const [loading, setLoading] = useState(true);
  
  const handleResetFilters = () => {
    setSubjectFilter('');
    setDifficultyFilter('');
  };

  // State to keep track of classes added to the Class Cart
  const [classesInCart, setClassesInCart] = useState([]);
  const { selectedClasses, setSelectedClasses } = useClassContext();

  // Use useHistory for navigation
  const history = useNavigate();

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

    const existingClasses = JSON.parse(localStorage.getItem('selectedClasses')) || [];
    setSelectedClasses(existingClasses);
  }, [setSelectedClasses]);

  useEffect(() => {
    const filterData = () => {
      const dataArray = Object.values(data);

      if (Array.isArray(dataArray)) {
        const filtered = dataArray.filter(
          item =>
            !selectedClasses.some(selected => selected.courseInfo_courseName === item.courseName) &&
            (subjectFilter === '' || item.courseCat.toLowerCase() === subjectFilter.toLowerCase()) &&
            (difficultyFilter === '' || item.courseDif.toLowerCase() === difficultyFilter.toLowerCase()) &&
            (Object.values(item).some(value =>
              typeof value === 'string' && value.toLowerCase().includes(searchQuery.toLowerCase())
            ))
        );
        setFilteredData(filtered);
      } else {
        setFilteredData([]);
      }
    };

    filterData();
  }, [data, selectedClasses, subjectFilter, difficultyFilter, searchQuery]);

  const subjects = ['Math', 'English', 'Social Studies', 'Science', 'Foreign Language', 'Art', 'MISC'];
  const difficulties = ['REG', 'HON', 'AP'];

  const handleAddClass = (classData) => {
    // Add the class to the Class Cart state
    setClassesInCart((prevClasses) => [...prevClasses, classData]);
  };

  const handleRemoveClass = (classToRemove) => {
    // Remove the class from the Class Cart state
    const updatedClassesInCart = classesInCart.filter((classData) => classData !== classToRemove);
    setClassesInCart(updatedClassesInCart);
  };


  const handleAddCourses = () => {
    // Add logic to send selected classes to the backend or perform any other action

    // Move classes from Class Cart to selectedClasses
    const updatedSelectedClasses = [...selectedClasses, ...classesInCart];
    setSelectedClasses(updatedSelectedClasses);

    // Clear the Class Cart state
    setClassesInCart([]);

    // Update localStorage
    localStorage.setItem('selectedClasses', JSON.stringify(updatedSelectedClasses));

    // Redirect to the Credits page after adding courses
    history('/Credits');
  };


  return (
    <div>
      <NavBar />
      <div style={{ marginTop: '100px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        {/* Filters Card */}
        <div style={{ flex: '0 0 20%', marginBottom: '20px' }}>
          <div className="card" style={{ padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: '#f4f4f4' }}>
            <h5 className="card-title">Filters</h5>
            <div>
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
                <option value="">Select Subject</option>
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
                <option value="">Select Difficulty</option>
                {difficulties.map((difficulty, index) => (
                  <option key={index} value={difficulty}>
                    {difficulty}
                  </option>
                ))}
              </select>

              <button className="btn btn-secondary" onClick={handleResetFilters}>
                Reset Filters
              </button>
            </div>
          </div>
        </div>

        {/* Courses Card (Wider) */}
        <div style={{ flex: '0 0 50%', maxWidth: '47%', marginBottom: '20px' }}>
          <div className="card" style={{ width: '100%', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: '#f4f4f4', minHeight: '200px' }}>
            {/* Set a min-height value based on your design preferences */}
            <h5 className="card-title">Courses</h5>
            <div style={{ maxHeight: '500px', overflowY: 'auto', marginBottom: '0px' }}>
              {loading ? (
                <p>Loading...</p>
              ) : filteredData.length === 0 ? (
                <p>No matching data found</p>
              ) : (
                <div>
                  {filteredData.map((item, index) => (
                    <div key={index} style={{ border: '0px', background: '#b3d7ed', borderRadius: '0px', marginBottom: '10px', minWidth: '20px' }}>
                      {/* Adjust the minWidth value based on your preference */}
                      <CollapsibleClass classData={item} onAddClass={handleAddClass} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Class Cart */}
        <ClassCart
          classesInCart={classesInCart}
          onRemoveClass={handleRemoveClass}
          onAddCourses={handleAddCourses}
        />
      </div>
    </div>
  );
};

export default ClassSearch;
