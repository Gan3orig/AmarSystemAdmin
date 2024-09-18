import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar'; // Import your Navbar component
import Sidebar from './Sidebar'; // Import your Sidebar component

// eslint-disable-next-line react/prop-types
const DefaultLayout = ({ children }) => {
  return (
    <div className="app">
      <Navbar />
      <div className="app-container">
        <Sidebar />
        <main className="app-content">
          {children || <Outlet />} {/* Render children or fallback to an outlet */}
        </main>
      </div>
    </div>
  );
};

export default DefaultLayout;
