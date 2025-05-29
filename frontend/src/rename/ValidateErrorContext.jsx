import { createContext, useContext, useState } from "react";

const ValidateErrorContext = createContext();

export const ValidateErrorProvider = ({children}) => {
  const [validateErrors, setValidateErrors] = useState([]);
  
  return (
    <ValidateErrorContext.Provider value={{validateErrors, setValidateErrors}}>
      {children}
    </ValidateErrorContext.Provider>
  )
};

export const useValidateError = () => useContext(ValidateErrorContext);
