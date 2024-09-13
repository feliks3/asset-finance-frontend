import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NotFoundPage from './NotFoundPage';

describe('NotFoundPage Component', () => {
  test('renders not found message', () => {
    render(<NotFoundPage />);
    expect(screen.getByText(/NotFoundPage/i)).toBeInTheDocument();
  });
});
