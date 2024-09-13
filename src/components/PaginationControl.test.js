import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PaginationControl from './PaginationControl';
import '@testing-library/jest-dom';

describe('PaginationControl Component', () => {
  const mockOnPageChange = jest.fn();

  test('renders pagination items correctly', () => {
    render(
      <PaginationControl
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  test('calls onPageChange when a pagination item is clicked', () => {
    render(
      <PaginationControl
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    fireEvent.click(screen.getByText('3'));
    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });
});
