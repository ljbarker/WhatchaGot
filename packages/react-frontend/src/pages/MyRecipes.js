import React, { useState, useEffect } from "react";
import {
  Card,
  Pane,
  Group,
  Button,
  TrashIcon,
  ManualIcon,
  Dialog,
  Heading,
} from "evergreen-ui";
import { Link } from "react-router-dom";
import RecipeForm from "../components/RecipeForm.js";
import Navbar from "../components/Navbar.js";

function MyRecipes(props) {
  const [recipes, setRecipes] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setShowForm(false);
    fetchRecipes()
      .then((res) => res.json())
      .then((json) => setRecipes(json["recipe_list"]))
      .catch((error) => console.log(error));
  }, []);

  function addAuthHeader(otherHeaders = {}) {
    if (props.token === "INVALID_TOKEN") {
      return otherHeaders;
    } else {
      return {
        ...otherHeaders,
        Authorization: `Bearer ${props.token}`
      };
    }
  }

  function fetchRecipes() {
    const promise = fetch("https://whatchagot.azurewebsites.net/recipe_list", {
      headers: addAuthHeader()
    });
    return promise;
  }

  function postRecipe(recipe) {
    const promise = fetch("https://whatchagot.azurewebsites.net/recipe_list", {
      method: "POST",
      headers: addAuthHeader({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(recipe),
    });

    return promise;
  }

  function removeOneRecipe(index) {
    let id
    recipes.forEach((recipe, i) => {
      if (i === index) {
        id = recipe._id
      };
    });
    const updated = recipes.filter((character, i) => {
      return i !== index;
    });
    deleteRecipe(id)
      .then((res) => {
        if (res.status === 204) {
          setRecipes(updated);
        } else {
          console.log("Error: " + res.status + " No object found.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function deleteRecipe(id) {
    const promise = fetch(`https://whatchagot.azurewebsites.net/recipe_list/${id}`, {
      method: "DELETE",
      headers: addAuthHeader()
    });
    return promise;
  }

  function updateList(recipe) {
    postRecipe(recipe)
      .then((res) => {
        if (res.status === 201) {
          return res.json()

        } else {
          console.log("Error: " + res.status);
          return undefined;
        }
      })
      .then((json) => {
        if (json) setRecipes([...recipes, json])
      })
      .catch((error) => {
        console.log(error);
      })
  }

  return (
    <Pane>
      <Navbar />
      <Pane
        display="flex"
        alignItems="center"
        justifyContent="center"
        paddingY={30}
      >
        <Heading fontSize={32}>My Recipes</Heading>
      </Pane>
      <Group>
        {recipes.map((recipe, index) => (
          <Card
            key={index}
            elevation={1}
            margin={16}
            padding={16}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            alignItems="center"
          >
            <Heading size={900} padding={10}>
              {recipe.name}
            </Heading>
            <Group>
              <Button iconAfter={ManualIcon}>
                <Link to={`/recipe/${recipe._id}`}>View</Link>
              </Button>
              <Button
                intent="danger"
                iconAfter={TrashIcon}
                onClick={() => removeOneRecipe(index)}
              >
                Delete
              </Button>
            </Group>
          </Card>
        ))}
      </Group>
      <Pane
        display="flex"
        alignItems="center"
        justifyContent="center"
        paddingY={10}
      >
        <Dialog
          isShown={showForm}
          title="Add a Recipe"
          onCloseComplete={() => setShowForm(false)}
          confirmLabel="Done"
          hasFooter={false}
        >
          <RecipeForm handleSubmit={updateList} />
        </Dialog>
        <Button
          marginLeft={16}
          onClick={() => setShowForm(true)}
          intent="success"
        >
          Add Recipe
        </Button>
      </Pane>
    </Pane>
  );
}

export default MyRecipes;
