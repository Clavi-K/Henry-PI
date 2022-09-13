import { render, screen } from '@testing-library/react';
import { Route, BrowserRouter } from "react-router-dom"
import App from './App';

import Card from "./components/Card/Card"

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders a correct card component", () => {

  render(<BrowserRouter><Card id="test" background_image={"test"} name="Test" Genres={["Test1", "Test2"]} /></BrowserRouter>)
  const nameElement = screen.getByText(/Test/i)
  expect(nameElement).toBeInTheDocument()

})