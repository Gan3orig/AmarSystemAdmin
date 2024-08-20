// src/AuthContext.js
import React, { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';  // Import PropTypes
import jwt_decode from 'jsonwebtoken';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (token) => {
    const decodedUser = jwt_decode(token);
    setUser(decodedUser);
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  const value = {
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
// Add PropTypes validation
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

export const useAuth = () => useContext(AuthContext);