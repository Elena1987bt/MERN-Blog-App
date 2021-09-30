import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { initialState } from './initialState';
import { reducer } from './reducer';

// Prepares the dataLayer
export const AppContext = createContext();

// Wrap our app and provide the Data layer
export const AppProvider = ({ children }) => {
  return (
    <AppContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </AppContext.Provider>
  );
};

// Pull information from the data layer
export const useAppContext = () => useContext(AppContext);
