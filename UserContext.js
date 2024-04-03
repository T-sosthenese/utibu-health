import { createContext, useState } from "react";

const UserType = createContext();

const UserContext = ({ children }) => {
  const [customerId, setCustomerId] = useState("");
  return (
    <UserType.Provider value={{ customerId, setCustomerId }}>
      {children}
    </UserType.Provider>
  );
};

export { UserType, UserContext };
