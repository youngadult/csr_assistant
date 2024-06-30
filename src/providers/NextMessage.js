// Create a context to hold the nextMessage variable
import React, { createContext, useContext, useState } from "react";

const NextMessageContext = createContext();

export const NextMessageProvider = ({ children }) => {
  const [nextMessage, setNextMessage] = useState("");

  return (
    <NextMessageContext.Provider value={{ nextMessage, setNextMessage }}>
      {children}
    </NextMessageContext.Provider>
  );
};

export const useNextMessage = () => useContext(NextMessageContext);
