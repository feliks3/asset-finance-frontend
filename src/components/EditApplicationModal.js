import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

/**
 * Modal component for editing an application.
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.editApp - The application object being edited.
 * @param {Function} props.onHide - Function to hide the modal.
 * @param {Function} props.onSave - Function to save changes to the application.
 * @returns {JSX.Element} A modal for editing applications.
 */
const EditApplicationModal = ({ editApp, onHide, onSave }) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
    personalDetails: '',
    income: '',
    expenses: '',
    assets: '',
    liabilities: '',
  });

  useEffect(() => {
    if (editApp) {
      setFormData({
        id: editApp.id || '',
        name: editApp.name || '',
        description: editApp.description || '',
        personalDetails: editApp.personalDetails || '',
        income: editApp.income || '',
        expenses: editApp.expenses || '',
        assets: editApp.assets || '',
        liabilities: editApp.liabilities || '',
      });
    }
  }, [editApp]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <Modal show={!!editApp} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Finance Application</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {editApp && (
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formPersonalDetails">
              <Form.Label>Personal Details</Form.Label>
              <Form.Control
                type="text"
                name="personalDetails"
                value={formData.personalDetails}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formIncome">
              <Form.Label>Income</Form.Label>
              <Form.Control
                type="number"
                name="income"
                value={formData.income}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formExpenses">
              <Form.Label>Expenses</Form.Label>
              <Form.Control
                type="number"
                name="expenses"
                value={formData.expenses}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formAssets">
              <Form.Label>Assets</Form.Label>
              <Form.Control
                type="number"
                name="assets"
                value={formData.assets}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formLiabilities">
              <Form.Label>Liabilities</Form.Label>
              <Form.Control
                type="number"
                name="liabilities"
                value={formData.liabilities}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditApplicationModal;
