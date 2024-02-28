import { Button, Combobox, TextInputField } from "evergreen-ui";
import { useState } from "react";

function RecipeForm(props) {
  const [recipe, setRecipe] = useState({
    name: "",
    ingredientName: "",
    ingredientAmount: "",
    ingredientUnits: "",
  });
  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "amount") {
        setRecipe({ name: recipe["name"], 
                    ingredientName: recipe["ingredientName"], 
                    ingredientAmount: value, 
                    ingredientUnits: recipe["ingredientUnits"] });
    } else if (name === "ingredient") {
        setRecipe({ name: recipe["name"], 
                    ingredientName: value, 
                    ingredientAmount: recipe["ingredientAmount"], 
                    ingredientUnits: recipe["ingredientUnits"] });
    } else {
        setRecipe({ name: value, 
                    ingredientName: recipe["ingredientName"], 
                    ingredientAmount: recipe["ingredientAmount"], 
                    ingredientUnits: recipe["ingredientUnits"] });
    }
  }

  function submitForm() {
    props.handleSubmit(recipe);
    setRecipe({ name: "", 
                ingredientName: "",
                ingredientAmount: "",
                ingredientUnits: "", });
  }

  return (
    <form>
        <TextInputField
            label="Name"
            name="name"
            id="name"
            value={recipe.name}
            onChange={handleChange}
        />
        <TextInputField
            label="Ingredient"
            name="ingredient"
            id="ingredient"
            value={recipe.ingredientName}
            onChange={handleChange}
        />
        <TextInputField
            label="Amount"
            name="amount"
            id="amount"
            value={recipe.ingredientAmount}
            onChange={handleChange}
        />
        <Combobox
        name="units"
        id="units"
        value={recipe.ingredientUnits}
        items={['cups', 'fl oz', 'gal', 'grams', 'lbs', 'ml', 'oz', 'pints', 'quarts', 'tbsp', 'tsp', 'other (specify in amount box)']}
        onChange={(selected) => setRecipe({ name: recipe["name"], ingredientName: recipe["ingredientName"], ingredientAmount: recipe["ingredientAmount"], ingredientUnits: selected})}
        placeholder="Units"
        autocompleteProps={{
            // Used for the title in the autocomplete.
            title: 'Units'
        }}
        />

        <Button intent="success" onClick={submitForm}>Add</Button>
    </form>
  );
}


export default RecipeForm;