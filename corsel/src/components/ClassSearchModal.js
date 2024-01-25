import React from 'react';
import Modal from 'react-modal';

const ClassSearchModal = ({ isModalOpen, onRequestClose, onYearSelection }) => {
  const [selectedYear, setSelectedYear] = React.useState('');

  const handleYearSelection = () => {
    onYearSelection(selectedYear);
    setSelectedYear('');
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={onRequestClose}
      contentLabel="Select High School Year"
    >
      <h2>Select High School Year</h2>
      <select
        value={selectedYear}
        onChange={(e) => setSelectedYear(e.target.value)}
        className="form-control mb-2"
      >
        {/* Populate options based on your high school year categories */}
        <option value="Freshman">Freshman</option>
        <option value="Sophomore">Sophomore</option>
        <option value="Junior">Junior</option>
        <option value="Senior">Senior</option>
      </select>
      <button onClick={handleYearSelection}>Add Course</button>
    </Modal>
  );
};

export default ClassSearchModal;
