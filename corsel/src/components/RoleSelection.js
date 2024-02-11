import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RoleSelection = () => {
  const [setSelectedRole] = useState('');

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
  };

  return (
    <>
      <div className="text-center">
        <Link to="/signup/student" className="btn btn-primary m-2" onClick={() => handleRoleSelection('student')}>
          Student/Parent
        </Link>
        <Link to="/signup/staff" className="btn btn-primary m-2" onClick={() => handleRoleSelection('staff')}>
          Staff
        </Link>
      </div>
    </>
  );
};

export default RoleSelection;
