import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { login } from './authSlice';
import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * Login component for user authentication.
 *
 * @component
 * @returns {JSX.Element} The rendered login form component.
 */
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  /**
   * Handles the form submission for user login.
   *
   * @async
   * @function
   * @param {Object} event - The form submission event.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_API_URL}/auth/login`,
        {
          email,
          password,
        }
      );
      const token = response.data.token;

      localStorage.setItem('token', token);

      dispatch(
        login({ user: { email }, roles: ['user'], permissions: ['read'] })
      );

      navigate('/');
    } catch (error) {
      console.error('Login failed:', error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        />
      </div>
      <button type="submit" className="btn btn-primary w-100">
        Login
      </button>
    </form>
  );
};

export default Login;
