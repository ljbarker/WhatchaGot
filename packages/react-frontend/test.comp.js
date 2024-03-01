import Navbar from "./components/Navbar.js";
import RecipeForm from "./components/RecipeForm.js";

test("renders the empty form correctly", () => {
  render(<RecipeForm />);
  expect(screen.getByLabelText("")).toBeInTheDocument();
});

test("renders the navbar correctly", () => {
  render(<Navbar />);
  expect(screen.getByLabelText("")).toBeInTheDocument();
});

// more tests as components are developed
