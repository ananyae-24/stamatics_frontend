import React, { createContext, useReducer } from "react";
import authReducer from "./auth";
import authState_ from "../initialState/authState";
import errReducer from "./error";
import errState_ from "../initialState/error";
export const GlobalContext = createContext({});
const GlobalProvider = ({ children }) => {
  const [authState, authDispatch] = useReducer(authReducer, authState_);
  const [errState, errDispatch] = useReducer(errReducer, errState_);
  return (
    <GlobalContext.Provider
      value={{ authState, authDispatch, errState, errDispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};
export default GlobalProvider;
