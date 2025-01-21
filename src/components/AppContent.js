import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'
import routes from '../routes'
// import { useEffect } from 'react';
// import { validateToken } from 'src/validateToken'; // Validation
// import { useNavigate } from 'react-router-dom';

const AppContent = () => {
//   const navigate = useNavigate(); // Use navigate for redirection
// // Helper function to check if token is expired
// const isTokenExpired = () => {
//   const expiresIn = localStorage.getItem('expiresIn');
//   if (!expiresIn) return true; // If there's no expiry date, consider it expired
//   const currentTime = new Date().getTime(); // Current time in milliseconds
//   return currentTime > expiresIn; // Token is expired if current time is greater than expiry time
// };
// useEffect(() => {
//   // const isValid = validateToken(); // Validate the token on mount
//   if (!isTokenExpired()) {
//     navigate('/dashboard');
//   } else {
//     // If token is invalid or expired, clear localStorage and navigate to login
//     localStorage.clear();
//     navigate('/login');
//   }
// }, [navigate]);

  return (
    <CContainer className="px-4" lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={ <route.element />}
                />
              )
            )
          })}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
