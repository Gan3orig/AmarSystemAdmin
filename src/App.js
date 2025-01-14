import React, { Suspense, useEffect, useState } from 'react';
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';
import { CSpinner, useColorModes } from '@coreui/react';
import { useSelector } from 'react-redux';
import './scss/style.scss';
import { validateToken } from 'src/validateToken';
import ProtectedRoute from './ProtectedRoute';
import './i18n';

const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'));
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Register = React.lazy(() => import('./views/pages/register/Register'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));
const ResetPassword = React.lazy(() => import('./views/pages/resetPwd/resetPassword'));
const SetNewPassword = React.lazy(() => import('./views/pages/setNewPassword/setNewPassword'));

const App = () => {
  const [isValid, setIsValid] = useState(false); // Local state for token validation
  const { isColorModeSet, setColorMode } = useColorModes('amarsystems');
  const storedTheme = useSelector((state) => state.theme);

  useEffect(() => {
    const tokenValid = validateToken();
    setIsValid(tokenValid);
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const theme = urlParams.get('theme')?.match(/^[A-Za-z0-9\s]+/)?.[0];

    if (theme) {
      setColorMode(theme);
    } else if (!isColorModeSet()) {
      setColorMode(storedTheme);
    }
  }, [isColorModeSet, setColorMode, storedTheme]);

  return (
    <HashRouter>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/404" element={<Page404 />} />
          <Route path="/500" element={<Page500 />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/set-password" element={<SetNewPassword />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/"
            element={<Navigate to= {isValid ? "/dashboard" : "/login"} />}
          />

         <Route path="*" element={<DefaultLayout />} />
        </Routes>
      </Suspense>
    </HashRouter>
  );
};

export default App;
