import { CSpinner, useColorModes } from '@coreui/react';
import React, { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { HashRouter, Route, Routes } from 'react-router-dom';
import './scss/style.scss';

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Register = React.lazy(() => import('./views/pages/register/Register'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));
const ResetPassword = React.lazy(() => import('./views/pages/resetPwd/resetPassword'));
const SetNewPassword = React.lazy(() => import('./views/pages/setNewPassword/setNewPassword'));
const Settings = React.lazy(() => import('./views/settings/setting'));

const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme');
  const storedTheme = useSelector((state) => state.theme);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1]);
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0];
    if (theme) {
      setColorMode(theme);
    }

    if (!isColorModeSet()) {
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
<<<<<<< HEAD
          <Route exact path="/login" name="Нэвтрэх" element={<Login />} />
          <Route exact path="/register" name="Бүртгүүлэх" element={<Register />} />
          <Route exact path="/404" name="Хуудас 404" element={<Page404 />} />
          <Route exact path="/500" name="Хуудас 500" element={<Page500 />} />
          <Route exact path="/reset-password" name="Нууц үг сэргээх" element={<ResetPassword />} /> 
          <Route exact path="/set-password" name="Шинэ нууц үг оруулах" element={<SetNewPassword />}/>
  <Route path="*" name="Home" element={<DefaultLayout />} />
=======
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/404" element={<Page404 />} />
          <Route path="/500" element={<Page500 />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/set-password" element={<SetNewPassword />} />
          <Route path="*" element={<DefaultLayout />} />
>>>>>>> b933d780673bf5e8be88298673793365037a2179
        </Routes>
      </Suspense>
    </HashRouter>
  );
};

export default App;
