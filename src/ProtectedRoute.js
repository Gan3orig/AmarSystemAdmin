import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
const ProtectedRoute = ({ isValid, children }) => {
  return isValid ? children : <Navigate to="/login" />;
};

ProtectedRoute.propTypes = {
  isValid: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
