import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchAndFilter from './SearchAndFilter';
import '@testing-library/jest-dom';

describe('SearchAndFilter Component', () => {
  const mockOnSearchChange = jest.fn();
  const mockOnFilterChange = jest.fn();
  const mockOnComparisonChange = jest.fn();

  test('renders search input and filter dropdown correctly', () => {
    render(
      <SearchAndFilter
        searchTerm=""
        onSearchChange={mockOnSearchChange}
        filterField="name"
        onFilterChange={mockOnFilterChange}
        comparisonOperator="gte"
        onComparisonChange={mockOnComparisonChange}
      />
    );

    expect(screen.getByPlaceholderText(/Search/i)).toBeInTheDocument();
    expect(screen.getByText(/Name/i)).toBeInTheDocument();
  });

  test('calls onSearchChange when search input changes', () => {
    render(
      <SearchAndFilter
        searchTerm=""
        onSearchChange={mockOnSearchChange}
        filterField="name"
        onFilterChange={mockOnFilterChange}
        comparisonOperator="gte"
        onComparisonChange={mockOnComparisonChange}
      />
    );

    fireEvent.change(screen.getByPlaceholderText(/Search/i), {
      target: { value: 'Test' },
    });
    expect(mockOnSearchChange).toHaveBeenCalled();
  });
});
