import { Pane, Button, Combobox, Group, Heading, TextInputField, TextareaField } from "evergreen-ui";
import { useState } from "react";

function RecipeForm(props) {
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [{name: "", amount: "", units: ""}],
    description: "",
  });

  const [numIngredients, setNumIngredients] = useState(1);
  
  function handleChange(event, index) {
    console.log(event.target)
    const { name, value } = event.target;
    
    console.log(index, name, value)
    if (name === "amount") {
      const ingredient = {name: recipe["ingredients"][index].name, amount: value, units: recipe["ingredients"][index].units}
      let ingredientlist = recipe["ingredients"]
      ingredientlist[index] = ingredient
        
      setRecipe({ name: recipe["name"], 
                  ingredients: ingredientlist,
                  description: recipe["description"]});
    } else if (name === "ingredient") {
        const ingredient = {name: value, amount: recipe["ingredients"][index].amount, units: recipe["ingredients"][index].units}
        let ingredientlist = recipe["ingredients"]
        ingredientlist[index] = ingredient

        setRecipe({ name: recipe["name"], 
                    ingredients: ingredientlist,
                    description: recipe["description"]});
    } else if (name === "name") {
        setRecipe({ name: value, 
                  ingredients: recipe["ingredients"],
                  description: recipe["description"]});
    } else if (name === "units") {
        handleUnits(value, index);
    } else {
        setRecipe({ name: recipe["name"], 
                    ingredients: recipe["ingredients"],
                    description: value});
    }
  }

  function handleUnits(value, index) {
    const ingredient = {name: recipe["ingredients"][index].name, amount: recipe["ingredients"][index].amount, units: value}
        let ingredientlist = recipe["ingredients"]
        ingredientlist[index] = ingredient
        
        setRecipe({ name: recipe["name"], 
                    ingredients: ingredientlist,
                    description: recipe["description"]});
  }

  function submitForm(e) {
    e.preventDefault();
    console.log(recipe)
    props.handleSubmit(recipe);
    setRecipe({ name: "",
                ingredients: [{name: "", amount: "", units: ""}],
                description: "", })
    setNumIngredients(1);
  }

  return (
    <form>
        <TextInputField
            label="Name"
            name="name"
            id="name"
            value={recipe.name}
            onChange={(e) => handleChange(e, undefined)}
        />
        {Array.from({length: numIngredients}, (_, i) => i).map((_, index) => (
        <Group key={index}>
          <TextInputField
              label="Ingredient"
              name="ingredient"
              id={`ingredient${index}`}
              value={recipe.ingredients[index].name}
              onChange={(e) => handleChange(e, index)}
              marginRight={12}
          />
          <TextInputField
              label="Amount"
              key={index}
              name="amount"
              id={`amount${index}`}
              value={recipe.ingredients[index].amount}
              onChange={(e) => handleChange(e, index)}
              marginX={12}
          />
          <Pane display="flex" flexDirection="column">
            <Heading 
            marginBottom={8} 
            marginX={4} 
            size={400}>Units</Heading>
            <Combobox
            key={index}
            name="units"
            id={`units${index}`}
            marginX={4}
            openOnFocus
            inputProps={{label: "Units", value: recipe.ingredients[index].units, handleChange: (e) => handleChange(e, index)}}
            items={['cups', 'fl oz', 'gal', 'grams', 'lbs', 'ml', 'oz', 'pints', 'quarts', 'tbsp', 'tsp', 'other (specify in amount box)']}
            onChange={(selected) => handleUnits(selected, index)}
            placeholder="Units"
            autocompleteProps={{
                // Used for the title in the autocomplete.
                title: 'Units'
            }}
            />
          </Pane>
        </Group>))}
        <Button marginBottom={16} intent="success" onClick={(e) => {e.preventDefault(); 
                                                                    setNumIngredients(numIngredients + 1); 
                                                                    setRecipe({name: recipe["name"], ingredients: [...recipe["ingredients"], {name: "", amount: "", units: ""}]});}}>Add Another Ingredient</Button>
        <TextareaField
            label="Description"
            name="description"
            id="description"
            value={recipe.description}
            onChange={handleChange}
          /> 

        <Button intent="success" onClick={submitForm}>Add</Button>
    </form>
  );
}


export default RecipeForm;