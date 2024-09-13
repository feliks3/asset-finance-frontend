import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import '@testing-library/jest-dom';
import Register from './Register';

const mockStore = configureMockStore([]);
const store = mockStore({ auth: { isLoggedIn: false } });

describe('Register Component', () => {
  test('renders register form', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Register />
        </MemoryRouter>
      </Provider>
    );

    expect(
      screen.getByPlaceholderText(/Enter your email/i)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Enter your password/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/注册/i)).toBeInTheDocument();
  });

  test('calls handleSubmit on form submission', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Register />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText(/Enter your email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter your password/i), {
      target: { value: 'password' },
    });
    fireEvent.click(screen.getByText(/注册/i));
  });
});
