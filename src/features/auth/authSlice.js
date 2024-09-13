import { createSlice } from '@reduxjs/toolkit';

/**
 * Slice for managing authentication state in the Redux store.
 *
 * @type {Slice}
 */
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    user: null,
  },
  reducers: {
    /**
     * Action to log in a user.
     *
     * @function
     * @param {Object} state - The current state of the auth slice.
     * @param {Object} action - The action object.
     * @param {Object} action.payload - The payload containing user data.
     * @param {Object} action.payload.user - The user data.
     */
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    /**
     * Action to log out a user.
     *
     * @function
     * @param {Object} state - The current state of the auth slice.
     */
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
