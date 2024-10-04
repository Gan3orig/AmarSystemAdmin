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

// Function to get role based on authentication status
export function getUserRole(isAuthenticated) {
  return isAuthenticated ? 'user' : 'guest';
}

// Function to get permissions for the current user
export function getPermissions(isAuthenticated) {
  const role = getUserRole(isAuthenticated);
  return roles[role].permissions;
}

export default roles;