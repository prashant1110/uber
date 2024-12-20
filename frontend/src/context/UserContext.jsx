import React, { createContext, useState } from "react";

export const DataContext = createContext();

const UserContext = ({ children }) => {
  const [user, setUser] = useState({
    email: "",
    fullname: {
      firstname: "",
      lastname: "",
    },
  });

  return (
    <DataContext.Provider value={{user, setUser}}>
      {children}
    </DataContext.Provider>
  );
};

export default UserContext;
