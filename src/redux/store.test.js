import store from './store';

describe('Redux Store', () => {
  test('should have auth and applications reducers', () => {
    const state = store.getState();
    expect(state.auth).toBeDefined();
    expect(state.applications).toBeDefined();
  });

  test('should apply middleware correctly', () => {
    const action = { type: 'test/action' };
    console.log = jest.fn();

    store.dispatch(action);

    expect(console.log).toHaveBeenCalled();
  });
});
