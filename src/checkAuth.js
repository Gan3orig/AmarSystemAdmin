const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    const expiryDate = localStorage.getItem('expiryDate');
  
    if (!token || !expiryDate) {
      return false;
    }
  
    if (new Date() >= new Date(expiryDate)) {
      // Token has expired, remove from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('expiryDate');
      localStorage.setItem.isAuthenticated = false;
      return false;
    }
  
    return true;
  };

const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate');
    localStorage.setItem.isAuthenticated = false;
    // Redirect to login page or home page
    window.location.href = '/login';
  };