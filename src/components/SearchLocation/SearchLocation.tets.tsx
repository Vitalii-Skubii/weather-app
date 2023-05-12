import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchLocation } from './SearchLocation';

const mockProps = {
  handleGetLocation: jest.fn(),
  value: 'Paris',
  onChange: jest.fn(),
  warning: false,
  handleClose: jest.fn(),
};

describe('SearchLocation', () => {
  test('should render search input and button', () => {
    render(<SearchLocation {...mockProps} />);

    const searchInput = screen.getByRole('textbox');
    const searchButton = screen.getByRole('button', { name: 'SearchIcon' });

    expect(searchInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  test('should call handleGetLocation with the correct value on button click', () => {
    render(<SearchLocation {...mockProps} />);

    const searchButton = screen.getByRole('button', { name: 'SearchIcon' });
    fireEvent.click(searchButton);

    expect(mockProps.handleGetLocation).toHaveBeenCalledWith(mockProps.value);
  });

  test('should render AlertCustom when warning is true', () => {
    render(<SearchLocation {...mockProps} warning={true} />);

    const alert = screen.getByRole('alert');

    expect(alert).toBeInTheDocument();
  });

  test('should not render AlertCustom when warning is false', () => {
    render(<SearchLocation {...mockProps} warning={false} />);

    const alert = screen.queryByRole('alert');

    expect(alert).toBeNull();
  });
});
