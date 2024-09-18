//import jwt_decode from 'jsonwebtoken';
//import { useNavigate } from 'react-router-dom';

export function validateToken(){
    const token = localStorage.getItem('token');
    const expiryDate = localStorage.getItem('expiryDate');
    if (!token) return false;
    try {
        //const decodedToken = token;
        const expireIn = expiryDate / 1000;
        const currentTime = Date.now() / 1000; // Convert to seconds
        if(expireIn < currentTime){
            return true
        }
       return false
    } catch (error) {
        return false;
    }
}