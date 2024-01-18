import React, { useState } from 'react';
import AddClassForm from './AddClassForm';
import AddExtracurricularForm from './AddExtracurricularForm';
import AddVolunteerOpportunityForm from './AddVolunteerOpportunityForm';
import NavBar from './NavBar';

const StaffAdditionPage = () => {
  const [selectedType, setSelectedType] = useState(null);

  const handleTypeSelection = (type) => {
    setSelectedType(type);
  };

  return (
    <div style={{ marginTop: '2cm' }}>
      <NavBar />
      <div className="d-flex justify-content-center">
        <button className="btn btn-primary m-2" onClick={() => handleTypeSelection('classes')}>
          Add Class
        </button>
        <button className="btn btn-primary m-2" onClick={() => handleTypeSelection('extracurriculars')}>
          Add Extracurricular
        </button>
        <button className="btn btn-primary m-2" onClick={() => handleTypeSelection('volunteerOpportunities')}>
          Add Volunteer Opportunity
        </button>
      </div>

      {selectedType && (
        <>
          {selectedType === 'classes' && <AddClassForm />}
          {selectedType === 'extracurriculars' && <AddExtracurricularForm />}
          {selectedType === 'volunteerOpportunities' && <AddVolunteerOpportunityForm />}
        </>
      )}
    </div>
  );
};

export default StaffAdditionPage;
