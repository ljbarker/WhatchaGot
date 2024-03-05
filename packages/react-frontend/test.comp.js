import Navbar from "./components/Navbar.js";
import RecipeForm from "./components/RecipeForm.js";

test("renders the empty form correctly", () => {
  render(<RecipeForm />);
  expect(screen.getByLabelText("Name")).toBeInTheDocument();
  expect(screen.getByLabelText("Ingredient")).toBeInTheDocument();
  expect(screen.getByLabelText("Amount")).toBeInTheDocument();
  expect(screen.getByLabelText("Description")).toBeInTheDocument();
  expect(screen.getByText("Add Another Ingredient")).toBeInTheDocument();
  expect(screen.getByText("Add")).toBeInTheDocument();
});

test("renders the navbar correctly", () => {
  render(<Navbar />);
  expect(screen.getByText("WhatchaGot")).toBeInTheDocument();
  expect(screen.getByText("My Recipes")).toBeInTheDocument();
  expect(screen.getByText("My Inventory")).toBeInTheDocument()
  expect(screen.getByText("My List")).toBeInTheDocument();
});

// more tests as components are developed
