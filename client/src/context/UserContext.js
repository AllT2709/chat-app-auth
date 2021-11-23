import React, { createContext, useEffect, useReducer } from "react";

import UserReducer from "./UserReducer";

const INITIAL_STATE = {
  token: localStorage.getItem("token") || null,
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
};

export const UserContext = createContext(INITIAL_STATE);

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("token", state.token);
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.token, state.user]);

  return (
    <UserContext.Provider
      value={{
        token: state.token,
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
