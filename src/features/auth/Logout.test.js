import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import '@testing-library/jest-dom';
import Logout from './Logout';

const mockStore = configureMockStore([]);
const store = mockStore({ auth: { isLoggedIn: true } });

describe('Logout Component', () => {
  test('renders logout button', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Logout />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/注销/i)).toBeInTheDocument();
  });

  test('calls logout on button click', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Logout />
        </MemoryRouter>
      </Provider>
    );

    const logoutButton = screen.getByText(/注销/i);
    fireEvent.click(logoutButton);

    expect(store.getActions()).toContainEqual({ type: 'auth/logout' });
  });
});
