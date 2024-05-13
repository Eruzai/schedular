import React from "react";

import { 
  render,
  cleanup,
  fireEvent,
  findByText,
  prettyDOM,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  getByText,
  queryByText
} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { findByText, queryByText, getByText } = render(<Application />);
  
    await findByText("Monday");
    fireEvent.click(getByText("Tuesday"));
    expect(queryByText("Leopold Silvers").toBeInTheDocument);
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container } = render(<Application />);
    
    await findByText(container, "Archie Cohen");
    
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, "Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await findByText(appointment, "Lydia Miller-Jones");
    
    const day = getAllByTestId(container, "day")
      .find((day) => queryByText(day, "Monday"));

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  })
});
