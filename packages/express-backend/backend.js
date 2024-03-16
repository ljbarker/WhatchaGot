import express from "express";
import cors from "cors";
import recipeQueries from "./models/recipe-services.js";
import inventoryQueries from "./models/inventory-services.js";
import shoppingListQueries from "./models/shoppinglist-services.js";
import recipeAPIQueries from "./models/recipeAPI-services.js";
import { registerUser, loginUser, authenticateUser } from "./auth.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("WhatchaGot Data Home");
});

app.get("/recipe_list/:username", authenticateUser, (req, res) => {
  const name = req.query.name;
  let result;
  if (name != undefined) {
    recipeQueries
      .findRecipeByName(name)
      .then((qres) => {
        result = qres;
        result = { recipe_list: result };
        res.send(result);
      })
      .catch((error) => {
        result = undefined;
        console.log(error);
      });
  } else {
    recipeQueries
      .getRecipes(req.params.username)
      .then((qres) => {
        console.log(qres);
        result = qres;
        result = { recipe_list: result };
        res.send(result);
      })
      .catch((error) => {
        result = undefined;
        console.log(error);
      });
  }
});

app.get("/recipe_list/:username/:id", authenticateUser, (req, res) => {
  const id = req.params.id; //or req.params.id
  let result;
  recipeQueries
    .findRecipeById(id)
    .then((qres) => {
      result = qres;
      if (result === undefined) {
        res.status(404).send("Resource not found.");
      } else {
        res.send(result);
      }
    })
    .catch((error) => {
      result = undefined;
      console.log(error);
    });
});

app.post("/recipe_list", authenticateUser, (req, res) => {
  const body = {
    username: req.body.username,
    name: req.body.name,
    ingredientList: req.body.ingredients,
    description: req.body.description,
  };
  const recipeToAdd = {
    _id: Math.floor(Math.random() * 1000).toString(),
    ...body,
  };
  let result;
  console.log(recipeToAdd);
  recipeQueries
    .addRecipe(recipeToAdd)
    .then((qres) => {
      result = qres;
      if (result != null) {
        res.status(201).send(result);
      } else {
        res.status(400).send("Bad user.");
      }
    })
    .catch((error) => {
      result = undefined;
      console.log(error);
    });
});

app.delete("/recipe_list/:username/:id", authenticateUser, (req, res) => {
  const id = req.params.id;
  recipeQueries
    .deleteRecipe(id)
    .then((qres) => {
      if (qres === null) {
        res.status(404).send("Resource not found.");
      } else {
        res.status(204).send("Resource deleted.");
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/inventory_list/:username", authenticateUser, (req, res) => {
  const name = req.query.name;
  let result;
  if (name != undefined) {
    inventoryQueries
      .findItemByName(name)
      .then((qres) => {
        result = qres;
        result = { inventory_list: result };
        res.send(result);
      })
      .catch((error) => {
        result = undefined;
        console.log(error);
      });
  } else {
    inventoryQueries
      .getInventory(req.params.username)
      .then((qres) => {
        console.log(qres);
        result = qres;
        result = { inventory_list: result };
        res.send(result);
      })
      .catch((error) => {
        result = undefined;
        console.log(error);
      });
  }
});

app.get("/inventory_list/:username/:id", authenticateUser, (req, res) => {
  const id = req.params.id;
  let result;
  inventoryQueries
    .findItemById(id)
    .then((qres) => {
      result = qres;
      if (result === undefined) {
        res.status(404).send("Resource not found.");
      } else {
        res.send(result);
      }
    })
    .catch((error) => {
      result = undefined;
      console.log(error);
    });
});

app.post("/inventory_list", authenticateUser, (req, res) => {
  let result;
  inventoryQueries
    .addItem(req.body)
    .then((qres) => {
      result = qres;
      if (result != null) {
        res.status(201).send(result);
      } else {
        res.status(400).send("Bad user.");
      }
    })
    .catch((error) => {
      result = undefined;
      console.log(error);
    });
});

app.delete("/inventory_list/:username/:id", authenticateUser, (req, res) => {
  const id = req.params.id;
  inventoryQueries
    .deleteItemById(id)
    .then((qres) => {
      if (qres === null) {
        res.status(404).send("Resource not found.");
      } else {
        res.status(204).send("Resource deleted.");
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/recipe_API", (req, res) => {
  recipeAPIQueries
    .get50()
    .then((qres) => {
      res.send(qres);
    })
    .catch((error) => {
      console.log(error);
    });
  // filtering returned recipes
  /*inventoryQueries
    .getIngredients()
    .then((userIngredients) => {
      // Now, use those ingredients to find matching recipes
      recipeAPIQueries
        .searchRecByUserIngreds(userIngredients)
        .then((matchingRecipes) => {
          // Respond with the matching recipes
          res.json(matchingRecipes);
        })
        .catch((error) => {
          console.error(error);
          res.status(500).send("Error searching for recipes");
        });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error fetching user ingredients");
    });*/
});

app.get("/shopping_list/:username", authenticateUser, (req, res) => {
  const name = req.query.name;
  let result;
  if (name != undefined) {
    shoppingListQueries
      .findItemByName(name)
      .then((qres) => {
        result = qres;
        result = { shopping_list: result };
        res.send(result);
      })
      .catch((error) => {
        result = undefined;
        console.log(error);
      });
  } else {
    shoppingListQueries
      .getShoppingList(req.params.username)
      .then((qres) => {
        console.log(qres);
        result = qres;
        result = { shopping_list: result };
        res.send(result);
      })
      .catch((error) => {
        result = undefined;
        console.log(error);
      });
  }
});

app.get("/shopping_list/:username/:id", authenticateUser, (req, res) => {
  const id = req.params.id;
  let result;
  shoppingListQueries
    .findItemById(id)
    .then((qres) => {
      result = qres;
      if (result === undefined) {
        res.status(404).send("Resource not found.");
      } else {
        res.send(result);
      }
    })
    .catch((error) => {
      result = undefined;
      console.log(error);
    });
});

app.post("/shopping_list", authenticateUser, (req, res) => {
  let result;
  shoppingListQueries
    .addItem(req.body)
    .then((qres) => {
      result = qres;
      if (result != null) {
        res.status(201).send(result);
      } else {
        res.status(400).send("Bad user.");
      }
    })
    .catch((error) => {
      result = undefined;
      console.log(error);
    });
});

app.delete("/shopping_list/:username/:id", authenticateUser, (req, res) => {
  const id = req.params["id"];
  shoppingListQueries
    .deleteItemById(id)
    .then((qres) => {
      if (qres === null) {
        res.status(404).send("Resource not found.");
      } else {
        res.status(204).send("Resource deleted.");
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

app.post("/signup", registerUser);

app.post("/login", loginUser);

app.listen(process.env.PORT || port, () => {
  console.log(`REST API is listening`);
});
