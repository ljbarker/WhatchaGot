import {
  Button,
  Group,
  TextInputField,
  TextareaField,
  DeleteIcon,
  IconButton,
} from "evergreen-ui";
import React, { useState } from "react";

function RecipeForm(props) {
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [{ name: "", amount: "" }],
    description: "",
  });

  const [numIngredients, setNumIngredients] = useState(1);

  function handleChange(event, index) {
    const { name, value } = event.target;
    let ingredient;
    let ingredientlist;
    switch (name) {
      case "amount":
        ingredient = { name: recipe["ingredients"][index].name, amount: value };
        ingredientlist = recipe["ingredients"];
        ingredientlist[index] = ingredient;

        setRecipe({
          name: recipe["name"],
          ingredients: ingredientlist,
          description: recipe["description"],
        });
        break;
      case "ingredient":
        ingredient = {
          name: value,
          amount: recipe["ingredients"][index].amount,
        };
        ingredientlist = recipe["ingredients"];
        ingredientlist[index] = ingredient;

        setRecipe({
          name: recipe["name"],
          ingredients: ingredientlist,
          description: recipe["description"],
        });
        break;
      case "name":
        setRecipe({
          name: value,
          ingredients: recipe["ingredients"],
          description: recipe["description"],
        });
        break;
      default:
        setRecipe({
          name: recipe["name"],
          ingredients: recipe["ingredients"],
          description: value,
        });
        break;
    }
  }

  function addIngredient(event) {
    event.preventDefault();
    setNumIngredients(numIngredients + 1);
    setRecipe({
      name: recipe["name"],
      ingredients: [...recipe["ingredients"], { name: "", amount: "" }],
      description: recipe["description"],
    });
  }

  function removeIngredient(event, index) {
    event.preventDefault();
    let ingredientlist = recipe["ingredients"];
    ingredientlist.splice(index, 1);
    setNumIngredients(numIngredients - 1);
    setRecipe({
      name: recipe["name"],
      ingredients: ingredientlist,
      description: recipe["description"],
    });
  }

  function submitForm(e) {
    e.preventDefault();
    props.handleSubmit(recipe);
    setRecipe({
      name: "",
      ingredients: [{ name: "", amount: "" }],
      description: "",
    });
    setNumIngredients(1);
  }

  return (
    <form onSubmit={submitForm}>
      <TextInputField
        label="Name"
        name="name"
        id="name"
        value={recipe.name}
        onChange={(e) => handleChange(e, undefined)}
      />
      {Array.from({ length: numIngredients }, (_, i) => i).map((_, index) => (
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
          <IconButton
            alignSelf="center"
            icon={DeleteIcon}
            intent="danger"
            onClick={(e) => removeIngredient(e, index)}
          ></IconButton>
        </Group>
      ))}
      <Button marginBottom={16} intent="success" onClick={addIngredient}>
        Add Another Ingredient
      </Button>
      <TextareaField
        label="Description"
        name="description"
        id="description"
        value={recipe.description}
        onChange={handleChange}
      />

      <Button type="submit" intent="success">
        Add
      </Button>
    </form>
  );
}

export default RecipeForm;
