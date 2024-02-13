import express from "express";
import cors from "cors";
import queries from "./models/user-services.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
  
app.get("/users", (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    let result;
    if (name != undefined) {
      if (job != undefined) {
        queries.findUserByNameAndJob(name, job)
        .then((qres) => { 
          result = qres;
          result = { users_list : result };
          res.send(result);})
        .catch((error) => { 
          result = undefined;
          console.log(error);
        });
      } else { 
        queries.findUserByName(name)
        .then((qres) => { 
          result = qres;
          result = { users_list : result };
          res.send(result);})
        .catch((error) => { 
          result = undefined;
          console.log(error);
        });
      }
      
    } else {
      queries.getUsers()
      .then((qres) => { 
        console.log(qres)
        result = qres;
        result = { users_list : result };
        res.send(result);})
      .catch((error) => {
        result = undefined;
        console.log(error);
      });     
    };
});

app.get("/users/:id", (req, res) => {
    const id = req.params["id"]; //or req.params.id
    let result;
    queries.findUserById(id)
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

app.post("/users", (req, res) => {
    const userToAdd = {_id: Math.floor(Math.random()*1000).toString(), ...req.body};
    let result;
    queries.addUser(userToAdd).then((qres) => {
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

app.delete("/users/:id", (req, res) => {
    const id = req.params["id"];
    queries.deleteUser(id)
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