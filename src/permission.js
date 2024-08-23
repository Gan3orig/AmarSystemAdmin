// permission.js

// Mock user data or get it from your authentication system (e.g., Redux, Context API)
const user = {
    roles: ['admin', 'editor'], // Example roles
    permissions: ['read', 'write', 'delete'] // Example permissions
  };
  
  // Function to check if the user has a specific role
  export const hasRole = (requiredRole) => {
    return user.roles.includes(requiredRole);
  };
  
  // Function to check if the user has one of the required roles
  export const hasAnyRole = (requiredRoles) => {
    return requiredRoles.some(role => user.roles.includes(role));
  };
  
  // Function to check if the user has a specific permission
  export const hasPermission = (requiredPermission) => {
    return user.permissions.includes(requiredPermission);
  };
  
  // Function to check if the user has one of the required permissions
  export const hasAnyPermission = (requiredPermissions) => {
    return requiredPermissions.some(permission => user.permissions.includes(permission));
  };
  
  // Higher-Order Component (HOC) to protect routes based on roles or permissions
  export const withAuthorization = (WrappedComponent, requiredRoles = [], requiredPermissions = []) => {
    return (props) => {
      const isAuthorized =
        (requiredRoles.length === 0 || hasAnyRole(requiredRoles)) &&
        (requiredPermissions.length === 0 || hasAnyPermission(requiredPermissions));
  
      if (!isAuthorized) {
        return <div>You do not have permission to view this content.</div>;
      }
  
      return <WrappedComponent {...props} />;
    };
  };
  