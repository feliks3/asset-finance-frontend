import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from './authSlice';
import { useNavigate } from 'react-router-dom';

/**
 * Logout component for user logout functionality.
 *
 * @component
 * @returns {JSX.Element} The rendered logout button component.
 */
const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /**
   * Handles the logout process for the user.
   *
   * @function
   */
  const handleLogout = () => {
    console.log('handle logout');
    localStorage.removeItem('token');
    dispatch(logout());
    navigate('/login');
  };

  return (
    <button onClick={handleLogout} className="btn btn-danger">
      Logout
    </button>
  );
};

export default Logout;
