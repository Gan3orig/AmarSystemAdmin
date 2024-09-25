import React from 'react';
import { Navigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ isValid, children }) => {
  return isValid ? children : <Navigate to="/login" />;
};
//isValid aar shalgasnaar nevtersn uguig shalgah blmjtoi 
export default ProtectedRoute;
