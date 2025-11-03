import React, { useReducer } from 'react';

export default ( reducer, initialState ) => {
  const Context = React.createContext();

  const Provider = ({ children }) => {
    const [ state, dispatch ] = useReducer( reducer, initialState );

    return (
      <Context.Provider value={{ ...state, dispatch }}>
        { children }
      </Context.Provider>
    );
  };

  return { Context, Provider };
};
