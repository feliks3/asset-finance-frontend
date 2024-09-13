import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Login from '../features/auth/Login';
import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * LoginPage component that displays the login form and a link to the registration page.
 *
 * @component
 * @returns {JSX.Element} The rendered LoginPage component.
 */
const LoginPage = () => {
  useEffect(() => {
    localStorage.removeItem('token');
  }, []);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h1 className="card-title text-center mb-4">Login Page</h1>
              <Login />
              <p className="text-center mt-3">
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
