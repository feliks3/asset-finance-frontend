import React from 'react';
import Register from '../features/auth/Register';
import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * RegisterPage component that displays the registration form.
 *
 * @component
 * @returns {JSX.Element} The rendered RegisterPage component.
 */
const RegisterPage = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h1 className="card-title text-center mb-4">Register Page</h1>
              <Register /> {/* Render the Register component */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
