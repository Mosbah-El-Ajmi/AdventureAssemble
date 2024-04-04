import { render, screen } from '@testing-library/react';
import ListeUtilisateurs from './ListeUtilisateurs';

test('renders learn react link', () => {
  render(<ListeUtilisateurs />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
