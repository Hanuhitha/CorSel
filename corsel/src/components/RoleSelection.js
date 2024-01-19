import React from 'react';
import { Link } from 'react-router-dom';

const RoleSelection = () => {
  return (
    <>
      <h2 className="text-center mb-4">Login As</h2>
      <div className="text-center">
        <Link to="/login/student" className="btn btn-primary m-2">
          Student/Parent
        </Link>
        <Link to="/login/staff" className="btn btn-primary m-2">
          Staff
        </Link>
      </div>
    </>
  );
};

export default RoleSelection;
