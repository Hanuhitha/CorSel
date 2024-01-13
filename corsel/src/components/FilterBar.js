// FilterBar.jsx
import React from 'react';

const FilterBar = ({
  searchQuery,
  onSearchChange,
  activityTypeFilter,
  onActivityTypeChange,
  activityTypes,
}) => (
  <div
    style={{
      border: '1px solid #ccc',
      padding: '10px',
      marginBottom: '10px',
      borderRadius: '10px',
      boxShadow: '0px 0px 8px #999',
      backgroundColor: 'whitesmoke',
    }}
  >
    <label htmlFor="searchQuery">Search:</label>
    <input type="text" id="searchQuery" value={searchQuery} onChange={(e) => onSearchChange(e.target.value)} />

    <label htmlFor="activityTypeFilter">Filter by Activity Type:</label>
    <select
      id="activityTypeFilter"
      value={activityTypeFilter}
      onChange={(e) => onActivityTypeChange(e.target.value)}
    >
      <option value="">All</option>
      {activityTypes.map((type) => (
        <option key={type} value={type}>
          {type}
        </option>
      ))}
    </select>

    <p>Selected Activity Type: {activityTypeFilter || 'All'}</p>
  </div>
);

export default FilterBar;
