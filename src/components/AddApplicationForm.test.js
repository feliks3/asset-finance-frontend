import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddApplicationForm from './AddApplicationForm';
import '@testing-library/jest-dom';

describe('AddApplicationForm Component', () => {
  const mockOnAdd = jest.fn();
  const mockSetNewApp = jest.fn();
  const mockNewApp = {
    name: 'app name',
    description: 'app description',
    personalDetails: 'app details',
    income: 100,
    expenses: 200,
    assets: 300,
    liabilities: 400,
  };

  test('renders form fields correctly', () => {
    render(
      <AddApplicationForm
        newApp={mockNewApp}
        onAdd={mockOnAdd}
        setNewApp={mockSetNewApp}
      />
    );

    expect(
      screen.getByPlaceholderText(/Application Name/i)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Application Description/i)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Personal Details/i)
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Income/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Expenses/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Assets/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Liabilities/i)).toBeInTheDocument();
  });

  test('calls onAdd when form is submitted', () => {
    render(
      <AddApplicationForm
        newApp={mockNewApp}
        onAdd={mockOnAdd}
        setNewApp={mockSetNewApp}
      />
    );

    fireEvent.click(screen.getByText(/Add Application/i));
    expect(mockOnAdd).toHaveBeenCalled();
  });
});
