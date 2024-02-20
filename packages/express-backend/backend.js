import express from "express";
import cors from "cors";
import queries from "./models/recipe-services.js";

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
      queries.findRecipeByName(name)
      .then((qres) => { 
        result = qres;
        result = { recipe_list : result };
        res.send(result);})
      .catch((error) => { 
        result = undefined;
        console.log(error);
      });
    } else {
      queries.getRecipes()
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
    queries.findRecipeById(id)
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
  queries.addRecipe(recipeToAdd).then((qres) => {
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
    queries.deleteRecipe(id)
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