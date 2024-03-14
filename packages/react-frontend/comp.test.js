import React from "react";
import RecipeForm from "./src/components/RecipeForm.js";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

test("renders the empty form correctly", () => {
  render(<RecipeForm />);
  expect(screen.getByLabelText("Name")).toBeInTheDocument();
  expect(screen.getByLabelText("Ingredient")).toBeInTheDocument();
  expect(screen.getByLabelText("Amount")).toBeInTheDocument();
  expect(screen.getByLabelText("Description")).toBeInTheDocument();
  expect(screen.getByText("Add Another Ingredient")).toBeInTheDocument();
  expect(screen.getByText("Add")).toBeInTheDocument();
});

const testRecipe = {
  name: "Pizza",
  ingredient: "Cheese",
  amount: "24 oz",
  description: "A delicious, simple pizza!",
};
test("accepts name input", () => {
  render(<RecipeForm />);
  const input = screen.getByLabelText("Name");
  fireEvent.change(input, { target: { value: testRecipe.name } });
  expect(input).toHaveValue(testRecipe.name);
});

test("accepts ingredient input", () => {
  render(<RecipeForm />);
  const input = screen.getByLabelText("Ingredient");
  fireEvent.change(input, { target: { value: testRecipe.ingredient } });
  expect(input).toHaveValue(testRecipe.ingredient);
});

test("accepts amount input", () => {
  render(<RecipeForm />);
  const input = screen.getByLabelText("Amount");
  fireEvent.change(input, { target: { value: testRecipe.amount } });
  expect(input).toHaveValue(testRecipe.amount);
});

test("accepts description input", () => {
  render(<RecipeForm />);
  const input = screen.getByLabelText("Description");
  fireEvent.change(input, { target: { value: testRecipe.description } });
  expect(input).toHaveValue(testRecipe.description);
});

test("handles form submission", () => {
  let formData = {};
  const mockUpdate = (data) => {
    formData = data;
  };
  render(<RecipeForm handleSubmit={mockUpdate} />);
  let input = screen.getByLabelText("Name");
  fireEvent.change(input, { target: { value: testRecipe.name } });
  input = screen.getByLabelText("Ingredient");
  fireEvent.change(input, { target: { value: testRecipe.ingredient } });
  input = screen.getByLabelText("Amount");
  fireEvent.change(input, { target: { value: testRecipe.amount } });
  input = screen.getByLabelText("Description");
  fireEvent.change(input, { target: { value: testRecipe.description } });
  const buttons = screen.getAllByRole("button", { type: "submit" });
  const button = buttons[buttons.length - 1];

  fireEvent.click(button);
  expect(formData).toHaveProperty("name", testRecipe.name);
  expect(formData.ingredients[0]).toHaveProperty("name", testRecipe.ingredient);
  expect(formData.ingredients[0]).toHaveProperty("amount", testRecipe.amount);
  expect(formData).toHaveProperty("description", testRecipe.description);
});
