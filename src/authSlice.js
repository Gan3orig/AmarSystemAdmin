// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,  // True when logged in
  userRole: 'guest',       // 'guest' or 'user'
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.isAuthenticated = true;
      state.userRole = action.payload.role;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.userRole = 'guest';
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
