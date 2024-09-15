import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchApplicationsThunk,
  addApplicationThunk,
  deleteApplicationThunk,
  updateApplicationThunk,
} from '../features/applications/applicationsSlice';
import 'bootstrap/dist/css/bootstrap.min.css';
import debounce from 'lodash.debounce';
import Logout from '../features/auth/Logout';
import ApplicationList from '../components/ApplicationList';
import PaginationControl from '../components/PaginationControl';
import AddApplicationForm from '../components/AddApplicationForm';
import EditApplicationModal from '../components/EditApplicationModal';
import SearchAndFilter from '../components/SearchAndFilter';

/**
 * HomePage component that displays a list of applications with
 * options to add, edit, delete, and filter applications.
 *
 * @component
 * @returns {JSX.Element} The rendered HomePage component.
 */
const HomePage = () => {
  const dispatch = useDispatch();
  const applications = useSelector((state) => state.applications.list);
  const totalPages = useSelector((state) => state.applications.totalPages);
  const loading = useSelector((state) => state.applications.loading);
  const userEmail = useSelector((state) => state.auth.user?.email);

  const [newApp, setNewApp] = useState({
    name: '',
    description: '',
    personalDetails: '',
    income: '',
    expenses: '',
    assets: '',
    liabilities: '',
  });
  const [editApp, setEditApp] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterField, setFilterField] = useState('name');
  const [comparisonOperator, setComparisonOperator] = useState('gte');

  /**
   * Debounced function to fetch applications with a delay.
   */
  const debouncedFetchApplications = useCallback(
    debounce((search, filter, comparison) => {
      dispatch(
        fetchApplicationsThunk({
          page: currentPage,
          limit: 5,
          search,
          filter,
          comparison,
        })
      );
    }, 500),
    [dispatch, currentPage]
  );

  useEffect(() => {
    debouncedFetchApplications(searchTerm, filterField, comparisonOperator);
  }, [debouncedFetchApplications, searchTerm, filterField, comparisonOperator]);

  /**
   * Handles adding a new application.
   *
   * @async
   * @function
   * @param {Object} e - The form submission event.
   */
  const handleAddApplication = async (e) => {
    e.preventDefault();
    await dispatch(addApplicationThunk(newApp));
    setNewApp({
      name: '',
      description: '',
      personalDetails: '',
      income: '',
      expenses: '',
      assets: '',
      liabilities: '',
    });
    debouncedFetchApplications(searchTerm, filterField, comparisonOperator);
  };

  /**
   * Handles deleting an application.
   *
   * @async
   * @function
   * @param {string} id - The ID of the application to delete.
   */
  const handleDeleteApplication = async (id) => {
    await dispatch(deleteApplicationThunk(id));
    debouncedFetchApplications(searchTerm, filterField, comparisonOperator);
  };

  /**
   * Handles selecting an application for editing.
   *
   * @function
   * @param {Object} app - The application object to edit.
   */
  const handleEditApplication = (app) => {
    setEditApp(app);
  };

  /**
   * Handles updating an existing application.
   *
   * @async
   * @function
   */
  const handleUpdateApplication = async (updatedApp) => {
    await dispatch(updateApplicationThunk(updatedApp));
    setEditApp(null);
    debouncedFetchApplications(searchTerm, filterField, comparisonOperator);
  };

  /**
   * Handles changing the current page for pagination.
   *
   * @function
   * @param {number} pageNumber - The new page number.
   */
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  /**
   * Handles changing the search term for filtering applications.
   *
   * @function
   * @param {Object} e - The input change event.
   */
  const handleSearchChange = (e) => {
    const newValue = e.target.value;
    setSearchTerm(newValue);
    debouncedFetchApplications(newValue, filterField, comparisonOperator);
  };

  /**
   * Handles changing the filter field for filtering applications.
   *
   * @function
   * @param {Object} e - The select change event.
   */
  const handleFilterChange = (e) => {
    const selectedFilter = e.target.value;
    setFilterField(selectedFilter);
    setCurrentPage(1);
    setSearchTerm('');

    if (
      ['income', 'expenses', 'assets', 'liabilities'].includes(selectedFilter)
    ) {
      setComparisonOperator('gte');
    } else {
      setComparisonOperator('');
    }

    debouncedFetchApplications('', selectedFilter, comparisonOperator);
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between mb-3">
        <h1 className="text-center">Finance Application List</h1>
        <Logout />
      </div>

      {userEmail && (
        <div className="alert alert-info text-center mb-4">
          Logged in as: {userEmail}
        </div>
      )}

      <SearchAndFilter
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        filterField={filterField}
        onFilterChange={handleFilterChange}
        comparisonOperator={comparisonOperator}
        onComparisonChange={setComparisonOperator}
      />

      {loading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <ApplicationList
            applications={applications}
            onEdit={handleEditApplication}
            onDelete={handleDeleteApplication}
          />
          <PaginationControl
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}

      <AddApplicationForm
        newApp={newApp}
        onAdd={handleAddApplication}
        setNewApp={setNewApp}
      />

      <EditApplicationModal
        editApp={editApp}
        onHide={() => setEditApp(null)}
        onSave={handleUpdateApplication}
      />
    </div>
  );
};

export default HomePage;
