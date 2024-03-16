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

test("handles form submission with multiple ingredients and removing ingredients", () => {
  let formData = {};
  const mockUpdate = (data) => {
    formData = data;
  };
  render(<RecipeForm handleSubmit={mockUpdate} />);

  const mainFormFields = [
    { label: "Name", value: testRecipe.name },
    { label: "Description", value: testRecipe.description },
  ];
  mainFormFields.forEach(({ label, value }) => {
    const input = screen.getByLabelText(label);
    fireEvent.change(input, { target: { value } });
  });

  const ingredient = { name: "Banana", amount: "5" };

  const nameInput = screen.getByLabelText("Ingredient");
  fireEvent.change(nameInput, { target: { value: ingredient.name } });
  const amountInput = screen.getByLabelText("Amount");
  fireEvent.change(amountInput, { target: { value: ingredient.amount } });
  const addButton = screen.getByText("Add Another Ingredient");
  fireEvent.click(addButton);

  const removeButtons = screen.getAllByTestId("delete");
  removeButtons.forEach((button) => {
    fireEvent.click(button);
  });

  const submitButtons = screen.getAllByRole("button", { type: "submit" });
  fireEvent.click(submitButtons[submitButtons.length - 1]);

  expect(formData).toHaveProperty("name", testRecipe.name);
  expect(formData).toHaveProperty("description", testRecipe.description);
  expect(formData.ingredients[0]).toHaveProperty("name", "");
  expect(formData.ingredients[0]).toHaveProperty("amount", "");
});
