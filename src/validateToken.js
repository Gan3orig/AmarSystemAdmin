export function validateToken(){
    const token = localStorage.getItem('token');
    const expiryDate = localStorage.getItem('expiryDate');
    
    if (!token || !expiryDate) return false; // No token or expiry date, return false
    
    try {
        const currentTime = Date.now(); // Current time in milliseconds
        const expireIn = new Date(expiryDate).getTime(); // Ensure expiryDate is in milliseconds
        
        // If the token has expired, return false
        if (expireIn < currentTime) {
            return false;
        }
        
        // Token is still valid
        return true;
    } catch (error) {
        return false;
    }
}
