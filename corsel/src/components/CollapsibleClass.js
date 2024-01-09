import React, { useState } from 'react';

const CollapsibleClass = ({ classData, onAddClass }) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', cursor: 'pointer' }} onClick={toggleCollapse}>
        <p>Course Name: {classData.courseInfo_courseName}</p>
        <p>Teacher: {classData.sectionInfo_teacherDisplay}</p>
      </div>
      {!collapsed && (
        <div>
          <p>Difficulty: {classData.courseDif}</p>
          <p>Subject: {classData.courseCat}</p>
          <p>Credits: {classData.Credits}</p>
          <button className="btn btn-primary m-2" onClick={() => onAddClass(classData)}>Add Class</button>
        </div>
      )}
    </div>
  );
};

export default CollapsibleClass;
