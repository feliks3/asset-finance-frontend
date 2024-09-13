import React from 'react';
import { Form } from 'react-bootstrap';

/**
 * Component for searching and filtering applications.
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.searchTerm - The search term for filtering.
 * @param {Function} props.onSearchChange - Function to handle search term changes.
 * @param {string} props.filterField - The field to filter by.
 * @param {Function} props.onFilterChange - Function to handle filter field changes.
 * @param {string} props.comparisonOperator - The comparison operator for numeric fields.
 * @param {Function} props.onComparisonChange - Function to handle comparison operator changes.
 * @returns {JSX.Element} Search and filter controls.
 */
const SearchAndFilter = ({
  searchTerm,
  onSearchChange,
  filterField,
  onFilterChange,
  comparisonOperator,
  onComparisonChange,
}) => {
  return (
    <div className="d-flex justify-content-between mb-4">
      {/* Search input */}
      <Form.Control
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={onSearchChange}
        className="me-2"
        style={{ maxWidth: '200px' }}
      />

      {/* Filter field selector */}
      <Form.Select
        value={filterField}
        onChange={onFilterChange}
        style={{ maxWidth: '150px' }}
      >
        <option value="name">Name</option>
        <option value="description">Description</option>
        <option value="personalDetails">Personal Details</option>
        <option value="income">Income</option>
        <option value="expenses">Expenses</option>
        <option value="assets">Assets</option>
        <option value="liabilities">Liabilities</option>
      </Form.Select>

      {/* Comparison operator selector (for numeric fields) */}
      {['income', 'expenses', 'assets', 'liabilities'].includes(
        filterField
      ) && (
        <Form.Select
          value={comparisonOperator}
          onChange={(e) => onComparisonChange(e.target.value)}
          style={{ maxWidth: '150px' }}
        >
          <option value="gte">Greater than or equal to</option>
          <option value="lte">Less than or equal to</option>
          <option value="eq">Equal to</option>
        </Form.Select>
      )}
    </div>
  );
};

export default SearchAndFilter;
