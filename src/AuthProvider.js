import React, { createContext, useContext, useReducer, useEffect } from 'react';
import jwt_decode from 'jsonwebtoken';
import { element } from 'prop-types'

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

const initialState = {
    user: null,
    token: null,
};

function authReducer(state, action) {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
            };
        case 'LOGOUT':
            return {
                ...state,
                user: null,
                token: null,
            };
        default:
            return state;
    }
}

export function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const user = jwt_decode(token);
            dispatch({ type: 'LOGIN', payload: { token, user } });
        }
    }, []);

    const login = (token) => {
        const user = jwt_decode(token);
        localStorage.setItem('token', token);
        dispatch({ type: 'LOGIN', payload: { token, user } });
    };

    const logout = () => {
        localStorage.removeItem('token');
        dispatch({ type: 'LOGOUT' });
    };

    const value = {
        user: state.user,
        token: state.token,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
