import React, { createContext, useContext, useState } from 'react';

const ClassContext = createContext();

export const ClassProvider = ({ children }) => {
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [classesInCart, setClassesInCart] = useState([]);

  const resetSelectedClasses = () => {
    setSelectedClasses([]);
    localStorage.setItem('selectedClasses', JSON.stringify([]));
  };

  // Function to set currentUser when user logs in
  const handleUserLogin = (user) => {
    setCurrentUser(user);
  };

  return (
    <ClassContext.Provider value={{ selectedClasses, setSelectedClasses, resetSelectedClasses, currentUser, classesInCart, setClassesInCart, handleUserLogin }}>
      {children}
    </ClassContext.Provider>
  );
};

export const useClassContext = () => {
  const context = useContext(ClassContext);
  if (!context) {
    throw new Error('useClassContext must be used within a ClassProvider');
  }
  return context;
};
