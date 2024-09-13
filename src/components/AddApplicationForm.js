import React from 'react';

/**
 * Component for adding a new application.
 *
 * @param {Object} props - Component properties.
 * @param {Object} props.newApp - The new application object.
 * @param {function} props.onAdd - Function to handle adding the new application.
 * @param {function} props.setNewApp - Function to update the new application state.
 * @returns {JSX.Element} The rendered component.
 */
const AddApplicationForm = ({ newApp, onAdd, setNewApp }) => {
  /**
   * Handles form submission.
   *
   * @param {Object} e - The event object.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(e);
  };

  return (
    <div className="card p-3">
      <h3>Add New Application</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            value={newApp.name}
            onChange={(e) => setNewApp({ ...newApp, name: e.target.value })}
            placeholder="Application Name"
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            value={newApp.description}
            onChange={(e) =>
              setNewApp({ ...newApp, description: e.target.value })
            }
            placeholder="Application Description"
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            value={newApp.personalDetails}
            onChange={(e) =>
              setNewApp({ ...newApp, personalDetails: e.target.value })
            }
            placeholder="Personal Details"
          />
        </div>
        <div className="mb-3">
          <input
            type="number"
            className="form-control"
            value={newApp.income}
            onChange={(e) => setNewApp({ ...newApp, income: e.target.value })}
            placeholder="Income"
          />
        </div>
        <div className="mb-3">
          <input
            type="number"
            className="form-control"
            value={newApp.expenses}
            onChange={(e) => setNewApp({ ...newApp, expenses: e.target.value })}
            placeholder="Expenses"
          />
        </div>
        <div className="mb-3">
          <input
            type="number"
            className="form-control"
            value={newApp.assets}
            onChange={(e) => setNewApp({ ...newApp, assets: e.target.value })}
            placeholder="Assets"
          />
        </div>
        <div className="mb-3">
          <input
            type="number"
            className="form-control"
            value={newApp.liabilities}
            onChange={(e) =>
              setNewApp({ ...newApp, liabilities: e.target.value })
            }
            placeholder="Liabilities"
          />
        </div>
        <button type="submit" className="btn btn-success w-100">
          Add Application
        </button>
      </form>
    </div>
  );
};

export default AddApplicationForm;
