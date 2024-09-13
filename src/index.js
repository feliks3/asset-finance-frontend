import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

/**
 * Renders the React application, wrapping it with the Redux Provider to make the store available throughout the app.
 */
root.render(
  <Provider store={store}>
    {/* Wrap the application in the Redux provider to enable store access throughout */}
    <App />
  </Provider>
);
