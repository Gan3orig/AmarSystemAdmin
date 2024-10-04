import React, { useEffect } from 'react';
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index';
import { CAlert, CContainer } from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import { validateToken } from 'src/validateToken';

const DefaultLayout = () => {
  const navigate = useNavigate(); 
  const isValid = validateToken();

  useEffect(() => {
    if (!isValid) {
      navigate('/login');
    }
  }, [isValid, navigate]);

  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  );
};

export default DefaultLayout;
