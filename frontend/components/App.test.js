import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import AppFunctional from './AppFunctional'; // Adjust import path as necessary

test('F1 FUNCTIONAL Actions: up, type email, submit Success message is correct', async () => {
  render(<AppFunctional />);
  fireEvent.click(screen.getByText('UP')); // Simulate moving up
  fireEvent.change(screen.getByPlaceholderText('type email'), { target: { value: 'lady@gaga.com' } }); // Simulate typing the email
  fireEvent.click(screen.getByText('Submit')); // Simulate submitting the form

  // Check for the specific success message
  const successMessage = await screen.findByText(/lady win #\d+/);
  expect(successMessage).toBeInTheDocument();
});