// UpdateContext.js
import React, { createContext, useState, useContext } from 'react';
import UpdateTypes from './UpdateTypes';

const UpdateContext = createContext();

export const useUpdate = () => {
  return useContext(UpdateContext);
};

export const UpdateProvider = ({ children }) => {
  const [updates, setUpdates] = useState([]);

  const addUpdate = (update) => {
    setUpdates((prevUpdates) => [...prevUpdates, update]);
  };

  return (
    <UpdateContext.Provider value={{ updates, addUpdate }}>
      {children}
    </UpdateContext.Provider>
  );
};
