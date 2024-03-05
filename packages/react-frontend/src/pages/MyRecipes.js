import React, { useState, useEffect } from "react";
import { Card, Pane, Group, Button, TrashIcon, ManualIcon, Dialog, Heading } from "evergreen-ui";
import { Link } from "react-router-dom";
import RecipeForm from "../components/RecipeForm";
import Navbar from "../components/Navbar";

function MyRecipes() {
    const [recipes, setRecipes] = useState([]);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        setShowForm(false);
        fetchRecipes()
        .then((res) => res.json())
        .then((json) => setRecipes(json["recipe_list"]))
        .catch((error) => console.log(error));
    }, []);

    function fetchRecipes() {
        const promise = fetch("https://whatchagot.azurewebsites.net/recipes");
        return promise;
    }

    function postRecipe(recipe) {

        const promise = fetch("https://whatchagot.azurewebsites.net/recipes", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
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
            }})
        .catch((error) => {
            console.log(error);
        });
    }

    function deleteRecipe(id) {
        const promise = fetch(`https://whatchagot.azurewebsites.net/recipes/${id}`, {
            method: "DELETE",
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
            if(json) setRecipes([...recipes, json])
        })
        .catch((error) => {
          console.log(error);
        })
    }



    return (
        <Pane>
            <Navbar />
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
                        <Heading  size={900}>{recipe.name}</Heading>
                        <Group >
                        <Button iconAfter={ManualIcon}>
                            <Link to={`/recipe/${recipe._id}`}>View</Link>
                            </Button>
                            <Button intent="danger" iconAfter={TrashIcon} onClick={() => removeOneRecipe(index)}>Delete</Button>
                        </Group>
                    </Card>
                ))}
            </Group>
            <Pane>
                <Dialog
                isShown={showForm}
                title="Add a Recipe"
                onCloseComplete={() => setShowForm(false)}
                confirmLabel="Done"
                hasFooter={false}
                >
                    <RecipeForm handleSubmit={updateList}/>
                </Dialog>
                <Button marginLeft={16} onClick={() => setShowForm(true)} intent="success">Add Recipe</Button>
            </Pane>
            
        </Pane>
    );
}

export default MyRecipes;
