import reducer, { fetchApplicationsThunk } from './applicationsSlice';

describe('applicationsSlice', () => {
  const initialState = { list: [], loading: false, error: null, totalPages: 1 };

  test('should handle initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  test('should handle fetchApplicationsThunk.pending', () => {
    const action = { type: fetchApplicationsThunk.pending.type };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(true);
  });
});
