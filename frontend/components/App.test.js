import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AppFunctional from './AppFunctional'; 
describe('AppFunctional Component', () => {
  beforeEach(() => {
    render(<AppFunctional />);
  });

  test('handles movement and updates position and steps', () => {
    fireEvent.click(screen.getByText(/UP/i));
    expect(screen.getByText('Coordinates (2, 1)')).toBeInTheDocument();
    expect(screen.getByText(/You moved 1 time/)).toBeInTheDocument();
  });

  test('typing in the email input changes its value and submitting clears it', async () => {
    const emailInput = screen.getByPlaceholderText(/type email/i);
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput.value).toBe('test@example.com');
    fireEvent.click(screen.getByTestId('submit-button')); 
    expect(emailInput.value).toBe('');
    expect(screen.getByText(/test@example.com win #\d+/)).toBeInTheDocument();
  });

 
});