import React, { useState } from 'react';
import AddClassForm from './AddClassForm';
import AddExtracurricularForm from './AddExtracurricularForm';
import AddVolunteerOpportunityForm from './AddVolunteerOpportunityForm';

const StaffAdditionPage = () => {
  const [selectedType, setSelectedType] = useState(null);

  const handleTypeSelection = (type) => {
    setSelectedType(type);
  };

  return (
    <div>
      <h2>Staff Addition Page</h2>

      <form>
        <p>Select the type of addition:</p>
        <label>
          <input
            type="radio"
            name="additionType"
            value="classes"
            onChange={() => handleTypeSelection('classes')}
          />
          Add Class
        </label>

        <label>
          <input
            type="radio"
            name="additionType"
            value="extracurriculars"
            onChange={() => handleTypeSelection('extracurriculars')}
          />
          Add Extracurricular
        </label>

        <label>
          <input
            type="radio"
            name="additionType"
            value="volunteerOpportunities"
            onChange={() => handleTypeSelection('volunteerOpportunities')}
          />
          Add Volunteer Opportunity
        </label>
      </form>

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
