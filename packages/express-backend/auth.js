import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userqueries from "./models/user-services.js";
import dotenv from "dotenv";

dotenv.config()

export function registerUser(req, res) {
  const { username, password, uid } = req.body; // from form

  if (!username || !password || !uid) {
    res.status(400).send("Bad request: Invalid input data.");
  } else if (userqueries.findUserByUsername(username).length > 0) {
    res.status(409).send("Username already taken");
  } else {
    console.log(username, password, uid);
    bcrypt
      .genSalt(10)
      .then((salt) => bcrypt.hash(password, salt))
      .then((hashedPassword) => {
        generateAccessToken(username).then((token) => {
          res.status(201).send({ token: token });
          userqueries.addUser({ username, password: hashedPassword, uid })
        })
          .catch((error) => {
            res.status(500).send("something went wrong generating token" + error);
          });
      })
      .catch((error) => {
        res.status(500).send("something went wrong posting user");
      });
  }
}

function generateAccessToken(username) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { username: username },
      process.env.TOKEN_SECRET,
      { expiresIn: "1d" },
      (error, token) => {
        if (error) {
          reject(error);
        } else {
          resolve(token);
        }
      }
    );
  });
}

export function authenticateUser(req, res, next) {
  const authHeader = req.headers["authorization"];
  //Getting the 2nd part of the auth header (the token)
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    console.log("No token received");
    res.status(401).end();
  } else {
    jwt.verify(
      token,
      process.env.TOKEN_SECRET,
      (error, decoded) => {
        if (decoded) {
          next();
        } else {
          console.log("JWT error:", error);
          res.status(401).end();
        }
      }
    );
  }
}

export function loginUser(req, res) {
  const { username, password, uid } = req.body; // from form
  const retrievedUser = userqueries.findUserByUsername(username);

  if (!retrievedUser) {
    // invalid username
    res.status(401).send("Invalid Username", retrievedUser);
  } else {
    bcrypt
      .compare(password, retrievedUser.password)
      .then((matched) => {
        if (matched) {
          generateAccessToken(username).then((token) => {
            res.status(200).send({ token: token });
          });
        } else {
          // invalid password
          res.status(401).send("Invalid Password", retrievedUser);
        }
      })
      .catch(() => {
        res.status(401).send("Unauthorized", retrievedUser);
      });
  }
}
