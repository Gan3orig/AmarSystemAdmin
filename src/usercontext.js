// UserContext.js

import React, { createContext, useContext, useState } from 'react';
import roles from './permissions';

const UserContext = createContext();

// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
  const [userRole, setUserRole] = useState('guest'); // Default to 'guest'

  const userPermissions = roles[userRole].permissions;

  return (
    <UserContext.Provider value={{ userRole, setUserRole, userPermissions }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
