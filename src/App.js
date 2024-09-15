import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * App component that sets up the main routing for the application.
 *
 * @component
 * @returns {JSX.Element} The rendered App component.
 */
const App = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <Router>
      <Routes>
        {/* Route for the login page */}
        <Route path="/login" element={<LoginPage />} />

        {/* Route for the registration page */}
        <Route path="/register" element={<RegisterPage />} />

        {/* Route for the homepage, redirects to login if not logged in */}
        <Route
          path="/"
          element={isLoggedIn ? <HomePage /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
