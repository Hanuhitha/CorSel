// AuthContext.js

import React, { useContext, createContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const signup = async (email, password) => {
    // Your signup logic here
    // Set the current user after successful signup
    setCurrentUser({ email, role: 'student' }); // Assuming the default role is 'student'
  };

  const login = async (email, password) => {
    // Your login logic here
    // Set the current user after successful login
    setCurrentUser({ email, role: 'student' }); // Assuming the default role is 'student'
  };

  const logout = async () => {
    // Your logout logic here
    // Set the current user to null after logout
    setCurrentUser(null);
  };

  const getUserRole = () => {
    return currentUser ? currentUser.role : null;
  };

  const value = {
    currentUser,
    signup,
    login,
    logout,
    getUserRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
