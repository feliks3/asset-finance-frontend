import React from 'react';
import { Button } from 'react-bootstrap';

/**
 * Component for displaying a list of applications.
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {Array} props.applications - Array of application objects.
 * @param {Function} props.onEdit - Function to handle editing an application.
 * @param {Function} props.onDelete - Function to handle deleting an application.
 * @returns {JSX.Element} A list of applications.
 */
const ApplicationList = ({ applications, onEdit, onDelete }) => (
  <ul className="list-group mb-4">
    {applications.map((app) => (
      <li
        key={app.id}
        className="list-group-item d-flex justify-content-between align-items-start"
      >
        <div className="ms-2 me-auto">
          <div className="fw-bold">{app.name}</div>
          {app.description}
          <div>Personal Details: {app.personalDetails}</div>
          <div>Income: ${app.income}</div>
          <div>Expenses: ${app.expenses}</div>
          <div>Assets: ${app.assets}</div>
          <div>Liabilities: ${app.liabilities}</div>
        </div>
        <div>
          <Button
            variant="primary"
            onClick={() => onEdit(app)}
            className="me-2"
          >
            Edit
          </Button>
          <Button variant="danger" onClick={() => onDelete(app.id)}>
            Delete
          </Button>
        </div>
      </li>
    ))}
  </ul>
);

export default ApplicationList;
