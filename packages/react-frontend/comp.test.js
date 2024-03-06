import React from "react";
import RecipeForm from "./src/components/RecipeForm.js";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';

test("renders the empty form correctly", () => {
  render(<RecipeForm />);
  expect(screen.getByLabelText("Name")).toBeInTheDocument();
  expect(screen.getByLabelText("Ingredient")).toBeInTheDocument();
  expect(screen.getByLabelText("Amount")).toBeInTheDocument();
  expect(screen.getByLabelText("Description")).toBeInTheDocument();
  expect(screen.getByText("Add Another Ingredient")).toBeInTheDocument();
  expect(screen.getByText("Add")).toBeInTheDocument();
});

// more recipe form component tests that are more involved