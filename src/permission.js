// permissions.js

const roles = {
    admin: {
      accessLevel: 3,
      permissions: ['viewDashboard', 'editUser', 'deleteUser', 'viewReports'],
    },
    user: {
      accessLevel: 2,
      permissions: ['viewDashboard', 'viewReports'],
    },
    guest: {
      accessLevel: 1,
      permissions: ['viewDashboard'],
    },
  };
  
  export default roles;
  