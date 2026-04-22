import { render, screen } from '@testing-library/react';
import App from './App';

test('renders ExpenseTracker landing page', () => {
  render(<App />);
  const headingElement = screen.getByText(/ExpenseTracker/i);
  expect(headingElement).toBeInTheDocument();
});
