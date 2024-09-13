import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import { thunk } from 'redux-thunk';
import '@testing-library/jest-dom';
import HomePage from './HomePage';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('HomePage Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      applications: {
        list: [],
        loading: false,
        error: null,
        totalPages: 1,
      },
      auth: {
        user: {
          email: 'testuser@example.com',
        },
      },
    });

    store.dispatch = jest.fn();
  });

  test('renders application list', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/Application List/i)).toBeInTheDocument();
  });
});
