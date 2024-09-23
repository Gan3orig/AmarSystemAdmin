import React from 'react';
import { Navigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ isValid, children }) => {
  return isValid ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
