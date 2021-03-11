import React from "react";
import Cell from "./Cell";
import { render } from "@testing-library/react";

it("renders without crashing", () => {
  render(<Cell />);
});

it("renders without crashing", () => {
  const { asFragment } = render(<Cell />);
  expect(asFragment()).toMatchSnapshot();
});