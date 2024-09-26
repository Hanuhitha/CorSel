import React from "react";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className="flex flex-col items-center h-screen justify-center bg-slate-100">
      <h1 className="text-3xl mb-4">Welcome to Student Records App</h1>
      <Link to="/register" className="text-blue-500 hover:underline">
        Register
      </Link>
      <Link to="/view-credentials" className="text-blue-500 hover:underline">
        View Credentials
      </Link>
    </div>
  );
};
