import React from 'react';
import { Pagination } from 'react-bootstrap';

/**
 * Component for pagination control.
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {number} props.currentPage - The current active page.
 * @param {number} props.totalPages - The total number of pages.
 * @param {Function} props.onPageChange - Function to handle page changes.
 * @returns {JSX.Element} Pagination controls.
 */
const PaginationControl = ({ currentPage, totalPages, onPageChange }) => {
  const paginationItems = [];
  for (let i = 1; i <= totalPages; i++) {
    paginationItems.push(
      <Pagination.Item
        key={i}
        active={i === currentPage}
        onClick={() => onPageChange(i)}
      >
        {i}
      </Pagination.Item>
    );
  }

  return (
    <Pagination className="justify-content-center mb-3">
      {paginationItems}
    </Pagination>
  );
};

export default PaginationControl;
