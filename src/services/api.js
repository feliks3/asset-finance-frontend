import axios from 'axios';

/**
 * Axios instance for API requests.
 *
 * @constant
 * @type {AxiosInstance}
 */
const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Register a user by sending registrationData to the backend API.
 *
 * @async
 * @function
 * @param {Object} registrationData - The user's register registrationData.
 * @returns {Promise<Object>} The user data returned by the API.
 */
export const registerUser = async (registrationData) => {
  const response = await api.post('/auth/register', registrationData);
  const token = response.data.token;

  localStorage.setItem('token', token);
  return response.data;
};

/**
 * Logs in a user by sending credentials to the backend API.
 *
 * @async
 * @function
 * @param {Object} credentials - The user's login credentials.
 * @returns {Promise<Object>} The user data returned by the API.
 */
export const loginUser = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  const token = response.data.token;

  localStorage.setItem('token', token);
  return response.data;
};

/**
 * Fetches a list of applications from the backend API.
 *
 * @async
 * @function
 * @param {number} [page=1] - The page number to fetch.
 * @param {number} [limit=5] - The number of applications per page.
 * @param {string} [search=''] - The search term.
 * @param {string} [filter='name'] - The field to filter by.
 * @param {string} [comparison=''] - The comparison operator for filtering.
 * @returns {Promise<Object>} The applications data returned by the API.
 */
export const fetchApplications = async (
  page = 1,
  limit = 5,
  search = '',
  filter = 'name',
  comparison = ''
) => {
  const response = await api.get('/applications', {
    params: {
      page,
      limit,
      search,
      filter,
      comparison,
    },
  });
  return response.data;
};

/**
 * Adds a new application by sending data to the backend API.
 *
 * @async
 * @function
 * @param {Object} application - The application data to add.
 * @returns {Promise<Object>} The added application data returned by the API.
 */
export const addNewApplication = async (application) => {
  const response = await api.post('/applications', application);
  return response.data;
};

/**
 * Deletes an existing application by ID.
 *
 * @async
 * @function
 * @param {string} id - The ID of the application to delete.
 * @returns {Promise<string>} The ID of the deleted application.
 */
export const deleteExistingApplication = async (id) => {
  await api.delete(`/applications/${id}`);
  return id;
};

/**
 * Updates an existing application by sending updated data to the backend API.
 *
 * @async
 * @function
 * @param {Object} application - The updated application data.
 * @returns {Promise<Object>} The updated application data returned by the API.
 */
export const updateExistingApplication = async (application) => {
  const response = await api.put(
    `/applications/${application.id}`,
    application
  );
  return response.data;
};

export default api;
