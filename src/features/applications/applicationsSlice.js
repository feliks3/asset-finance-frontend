import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchApplications,
  addNewApplication,
  deleteExistingApplication,
  updateExistingApplication,
} from '../../services/api';

/**
 * Asynchronous thunk to fetch applications from the server.
 *
 * @async
 * @function
 * @param {Object} params - Parameters for fetching applications.
 * @param {number} params.page - The page number to fetch.
 * @param {number} params.limit - The number of applications per page.
 * @param {string} [params.search=''] - The search query string.
 * @param {string} [params.filter='name'] - The field to filter by.
 * @param {string} [params.comparison=''] - The comparison operator for filtering.
 * @returns {Promise<Object>} The fetched applications data.
 */
export const fetchApplicationsThunk = createAsyncThunk(
  'applications/fetchApplications',
  async ({ page, limit, search = '', filter = 'name', comparison = '' }) => {
    const response = await fetchApplications(
      page,
      limit,
      search,
      filter,
      comparison
    );
    return {
      applications: response.applications.map((app) => ({
        id: app._id,
        name: app.name,
        description: app.description,
        personalDetails: app.personalDetails,
        income: app.income,
        expenses: app.expenses,
        assets: app.assets,
        liabilities: app.liabilities,
        userId: app.userId,
      })),
      totalPages: response.totalPages,
    };
  }
);

/**
 * Asynchronous thunk to add a new application.
 *
 * @async
 * @function
 * @param {Object} newApplication - The new application data to be added.
 * @returns {Promise<Object>} The added application data.
 */
export const addApplicationThunk = createAsyncThunk(
  'applications/addApplication',
  async (newApplication) => {
    const response = await addNewApplication(newApplication);
    return {
      id: response._id,
      name: response.name,
      description: response.description,
      personalDetails: response.personalDetails,
      income: response.income,
      expenses: response.expenses,
      assets: response.assets,
      liabilities: response.liabilities,
      userId: response.userId,
    };
  }
);

/**
 * Asynchronous thunk to delete an existing application.
 *
 * @async
 * @function
 * @param {string} applicationId - The ID of the application to delete.
 * @returns {Promise<string>} The ID of the deleted application.
 */
export const deleteApplicationThunk = createAsyncThunk(
  'applications/deleteApplication',
  async (applicationId) => {
    const response = await deleteExistingApplication(applicationId);
    return response;
  }
);

/**
 * Asynchronous thunk to update an existing application.
 *
 * @async
 * @function
 * @param {Object} application - The application data to be updated.
 * @returns {Promise<Object>} The updated application data.
 */
export const updateApplicationThunk = createAsyncThunk(
  'applications/updateApplication',
  async (application) => {
    const response = await updateExistingApplication(application);
    return {
      id: response._id,
      name: response.name,
      description: response.description,
      personalDetails: response.personalDetails,
      income: response.income,
      expenses: response.expenses,
      assets: response.assets,
      liabilities: response.liabilities,
      userId: response.userId,
    };
  }
);

/**
 * Slice for managing application state in the Redux store.
 *
 * @type {Slice}
 */
const applicationsSlice = createSlice({
  name: 'applications',
  initialState: {
    list: [],
    loading: false,
    error: null,
    totalPages: 1,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApplicationsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchApplicationsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.applications;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchApplicationsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addApplicationThunk.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(deleteApplicationThunk.fulfilled, (state, action) => {
        state.list = state.list.filter((app) => app.id !== action.payload);
      })
      .addCase(updateApplicationThunk.fulfilled, (state, action) => {
        const index = state.list.findIndex(
          (app) => app.id === action.payload.id
        );
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      });
  },
});

export default applicationsSlice.reducer;
