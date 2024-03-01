import express from "express";
import cors from "cors";
import recipeQueries from "./models/recipe-services.js";
import inventoryQueries from "./models/inventory-services.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("WatchaGot Data Home");
});
  
app.get("/recipes", (req, res) => {
    const name = req.query.name;
    let result;
    if (name != undefined) {
      recipeQueries.findRecipeByName(name)
      .then((qres) => { 
        result = qres;
        result = { recipe_list : result };
        res.send(result);})
      .catch((error) => { 
        result = undefined;
        console.log(error);
      });
    } else {
      recipeQueries.getRecipes()
      .then((qres) => { 
        console.log(qres)
        result = qres;
        result = { recipe_list : result };
        res.send(result);})
      .catch((error) => {
        result = undefined;
        console.log(error);
      });     
    };
});

app.get("/recipe/:id", (req, res) => {
    const id = req.params["id"]; //or req.params.id
    let result;
    recipeQueries.findRecipeById(id)
    .then((qres) => {
      result = qres;
      if (result === undefined) {
        res.status(404).send("Resource not found.");
      } else {
        res.send(result);
      }})
    .catch((error) => {
      result = undefined;
      console.log(error);
    });
    
});

app.post("/recipes", (req, res) => {
  const body = {name: req.body.name, ingredientList: [[req.body.ingredientName, req.body.ingredientAmount, req.body.ingredientUnits]]};
  const recipeToAdd = {_id: Math.floor(Math.random()*1000).toString(), ...body};
  let result;
  console.log(recipeToAdd)
  recipeQueries.addRecipe(recipeToAdd).then((qres) => {
    result = qres;
    if(result != null) {
      res.status(201).send(result);
    } else { 
      res.status(400).send("Bad user.");
    }
  }).catch((error) => {
    result = undefined;
    console.log(error);
  });
  ;
});

app.delete("/recipes/:id", (req, res) => {
    const id = req.params["id"];
    recipeQueries.deleteRecipe(id)
    .then((qres) => {
      if (qres === null) {
        res.status(404).send("Resource not found.");
      } else {
        res.status(204).send("Resource deleted.");
      }
    })
    .catch((error) => {
      console.log(error);
    })
});

app.get("/inventory", (req, res) => {
  const name = req.query.name;
  let result;
  if (name != undefined) {
    inventoryQueries.findItemByName(name)
    .then((qres) => { 
      result = qres;
      result = { inventory_list : result };
      res.send(result);})
    .catch((error) => { 
      result = undefined;
      console.log(error);
    });
  } else {
    inventoryQueries.getInventory()
    .then((qres) => { 
      console.log(qres)
      result = qres;
      result = { inventory_list : result };
      res.send(result);})
    .catch((error) => {
      result = undefined;
      console.log(error);
    });     
  };
});

app.get("/inventory/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result;
  inventoryQueries.findItemById(id)
  .then((qres) => {
    result = qres;
    if (result === undefined) {
      res.status(404).send("Resource not found.");
    } else {
      res.send(result);
    }})
  .catch((error) => {
    result = undefined;
    console.log(error);
  });
  
});

app.post("/inventory", (req, res) => {
const body = {name: req.body.name, quantity: req.body.quantity, expiration: req.body.expiration};
const itemToAdd = {_id: Math.floor(Math.random()*1000).toString(), ...body};
let result;
console.log(itemToAdd)
inventoryQueries.addItem(itemToAdd).then((qres) => {
  result = qres;
  if(result != null) {
    res.status(201).send(result);
  } else { 
    res.status(400).send("Bad user.");
  }
}).catch((error) => {
  result = undefined;
  console.log(error);
});
;
});

app.delete("/inventory/:id", (req, res) => {
  const id = req.params["id"];
  inventoryQueries.deleteItem(id)
  .then((qres) => {
    if (qres === null) {
      res.status(404).send("Resource not found.");
    } else {
      res.status(204).send("Resource deleted.");
    }
  })
  .catch((error) => {
    console.log(error);
  })
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});