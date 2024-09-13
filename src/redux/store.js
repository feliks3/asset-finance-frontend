import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authReducer from '../features/auth/authSlice';
import applicationsReducer from '../features/applications/applicationsSlice';

/**
 * Configures and creates the Redux store.
 *
 * @constant
 * @type {Store}
 * @property {Object} reducer - The combined reducers for the store.
 * @property {Function} middleware - The middleware applied to the store.
 */
const store = configureStore({
  reducer: {
    auth: authReducer,
    applications: applicationsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
