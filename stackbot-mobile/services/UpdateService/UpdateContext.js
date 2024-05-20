// UpdateContext.js
import React, { createContext, useState, useContext } from 'react';

const UpdateContext = createContext();

export const useUpdate = () => {
  return useContext(UpdateContext);
};

export const UpdateProvider = ({ children }) => {
  const [updates, setUpdates] = useState([]);

  const addUpdate = (update) => {
    setUpdates((prevUpdates) => [...prevUpdates, update]);
  };

  const cleanUpdates = () => {
    setUpdates([])
  };

  return (
    <UpdateContext.Provider value={{ updates, addUpdate, cleanUpdates }}>
      {children}
    </UpdateContext.Provider>
  );
};
