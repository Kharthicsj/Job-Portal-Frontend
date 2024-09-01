// src/Redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    authToken: Cookies.get('authToken') || null,
    isAuthenticated: !!Cookies.get('authToken'), // Boolean indicating authentication status
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.authToken = action.payload.token;
      state.isAuthenticated = true;
      Cookies.set('authToken', action.payload.token, { expires: 3 / 24 }); // 3 hours
    },
    clearUser: (state) => {
      state.user = null;
      state.authToken = null;
      state.isAuthenticated = false;
      Cookies.remove('authToken');
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
