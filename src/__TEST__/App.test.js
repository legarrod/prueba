import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders home', () => {
  render(<App />);
  const linkElement = screen.getByText(/Prueba/i);
  expect(linkElement).toBeInTheDocument();
});

test("there must be a create page index", () => {
  render(<App />);
  //console.log(render(<App />));
  expect(screen.queryAllByText(/Registro/i)).toBeTruthy();
  expect(screen.queryAllByText(/Inicio sesión/i)).toBeTruthy();
});


