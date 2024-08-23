import React from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const DefaultLayout = () => {
  
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
  )
}
//DefaultLayout.propTypes = { isAuthenticated: PropTypes.bool.isRequired };

export default DefaultLayout
