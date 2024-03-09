import React from "react";
import AppFunctional from "./AppFunctional";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";


test('sanity', () => {


  expect(true).toBe(true)


})


test("Renders AppFunctional without errors", () => {


  render(<AppFunctional />);


});

test("Buttons render on the screen", () => {


  render(<AppFunctional />);


  const buttons = screen.queryAllByRole("button");


  expect(buttons.length).toBe(6);


});


test('loads items eventually', async () => {


  const { container } = render(<AppFunctional/>)


  const submitButton = container.querySelector('#submit');


  expect(submitButton).toBeInTheDocument()


  fireEvent.click(submitButton);


});


test("reset button works", async () => {


  const { container } = render(<AppFunctional />)


  const resetButton = container.querySelector("#reset");


  expect(resetButton).toBeInTheDocument();

  
  fireEvent.click(resetButton);


});