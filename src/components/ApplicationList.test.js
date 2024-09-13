import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ApplicationList from './ApplicationList';
import '@testing-library/jest-dom';

describe('ApplicationList Component', () => {
  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();
  const mockApplications = [
    {
      id: 1,
      name: 'Test App',
      description: 'This is a test application',
      personalDetails: 'Test details',
      income: 1000,
      expenses: 500,
      assets: 1500,
      liabilities: 200,
    },
  ];

  test('renders application details correctly', () => {
    render(
      <ApplicationList
        applications={mockApplications}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    const elements = screen.getAllByText(/Test App/i);
    expect(elements.length).toBeGreaterThan(0);
    expect(screen.getByText(/This is a test application/i)).toBeInTheDocument();
  });

  test('calls onEdit when Edit button is clicked', () => {
    render(
      <ApplicationList
        applications={mockApplications}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    fireEvent.click(screen.getByText(/Edit/i));
    expect(mockOnEdit).toHaveBeenCalledWith(mockApplications[0]);
  });

  test('calls onDelete when Delete button is clicked', () => {
    render(
      <ApplicationList
        applications={mockApplications}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    fireEvent.click(screen.getByText(/Delete/i));
    expect(mockOnDelete).toHaveBeenCalledWith(mockApplications[0].id);
  });
});
