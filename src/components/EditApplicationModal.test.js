import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EditApplicationModal from './EditApplicationModal';
import '@testing-library/jest-dom';

describe('EditApplicationModal Component', () => {
  const mockOnHide = jest.fn();
  const mockOnSave = jest.fn();
  const mockEditApp = {
    id: 1,
    name: 'Test App',
  };

  test('renders modal correctly', () => {
    render(
      <EditApplicationModal
        editApp={mockEditApp}
        onHide={mockOnHide}
        onSave={mockOnSave}
      />
    );

    expect(screen.getByText(/Edit Finance Application/i)).toBeInTheDocument();
  });

  test('calls onSave when Save button is clicked', () => {
    render(
      <EditApplicationModal
        editApp={mockEditApp}
        onHide={mockOnHide}
        onSave={mockOnSave}
      />
    );

    fireEvent.click(screen.getByText(/Save/i));
    expect(mockOnSave).toHaveBeenCalled();
  });

  test('calls onHide when Cancel button is clicked', () => {
    render(
      <EditApplicationModal
        editApp={mockEditApp}
        onHide={mockOnHide}
        onSave={mockOnSave}
      />
    );

    fireEvent.click(screen.getByText(/Cancel/i));
    expect(mockOnHide).toHaveBeenCalled();
  });
});
