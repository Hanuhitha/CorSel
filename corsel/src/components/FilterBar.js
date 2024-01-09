import React from 'react';

const FilterBar = ({ searchQuery, onSearchChange, subjectFilter, onSubjectChange, difficultyFilter, onDifficultyChange, subjects, difficulties }) => {
  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search..."
      />
      <label>
        Subject:
        <select value={subjectFilter} onChange={(e) => onSubjectChange(e.target.value)}>
          <option value="">All</option>
          {subjects.map((subject, index) => (
            <option key={index} value={subject}>{subject}</option>
          ))}
        </select>
      </label>
      <label>
        Difficulty:
        <select value={difficultyFilter} onChange={(e) => onDifficultyChange(e.target.value)}>
          <option value="">All</option>
          {difficulties.map((difficulty, index) => (
            <option key={index} value={difficulty}>{difficulty}</option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default FilterBar;
