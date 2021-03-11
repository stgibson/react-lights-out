import React from "react";
import Board from "./Board";
import { render, fireEvent } from "@testing-library/react";

it("renders without crashing", () => {
  render(<Board />);
});

it("renders without crashing", () => {
  const { asFragment } = render(<Board chanceLightStartsOn={ 1 } />);
  expect(asFragment()).toMatchSnapshot();
});

it("toggles all appropriate cells when a cell is clicked", () => {
  const { queryByTestId } = render(<Board chanceLightStartsOn={ 1 } />);

  const cell = queryByTestId("1-1");
  fireEvent.click(cell);
  expect(cell).not.toHaveClass("Cell-lit");
  expect(queryByTestId("0-1")).not.toHaveClass("Cell-lit");
  expect(queryByTestId("2-1")).not.toHaveClass("Cell-lit");
  expect(queryByTestId("1-0")).not.toHaveClass("Cell-lit");
  expect(queryByTestId("1-2")).not.toHaveClass("Cell-lit");
});

it('shows "You Won" when all cells are not lit', () => {
  // only have 1 light to turn off
  const { queryByTestId, queryByText } = render(
    <Board nrows={ 1 } ncols={ 1 } chanceLightStartsOn={ 1 } />
  );

  // shouldn't show You Won message until after click cell
  expect(queryByText("You Won")).not.toBeInTheDocument();

  const cell = queryByTestId("0-0");
  fireEvent.click(cell);
  // expect table to disappear and You Win to appear
  expect(cell).not.toBeInTheDocument();
  expect(queryByText("You Won")).toBeInTheDocument();
});