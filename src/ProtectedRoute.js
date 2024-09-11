import React from 'react';
import { Navigate } from 'react-router-dom';
import { validateToken } from 'src/validateToken' // Adjust the import path as needed;

const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'));
const ProtectedRoute = () => {
  const isValid = validateToken(); // Validate the token
  
  if (!isValid) {
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
