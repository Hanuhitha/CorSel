import React, { createContext, useContext, useState } from 'react';

const ClassContext = createContext();

export const ClassProvider = ({ children }) => {
  const [selectedClasses, setSelectedClasses] = useState([]);

  const resetSelectedClasses = () => {
    setSelectedClasses([]);
    localStorage.setItem('selectedClasses', JSON.stringify([]));
  };

  return (
    <ClassContext.Provider value={{ selectedClasses, setSelectedClasses, resetSelectedClasses }}>
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
