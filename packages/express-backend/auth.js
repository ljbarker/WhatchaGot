import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userqueries from "./models/user-services.js";


function addAuthHeader(otherHeaders = {}) {
  if (token === "INVALID_TOKEN") {
    return otherHeaders;
  } else {
    return {
      ...otherHeaders,
      Authorization: `Bearer ${token}`
    };
  }
}


export function registerUser(req, res) {
  const { username, password, uid } = req.body; // from form

  if (!username || !password || !uid) {
    res.status(400).send("Bad request: Invalid input data.");
  } else if (userqueries.findUserByUsername(username)) {
    res.status(409).send("Username already taken");
  } else {
    bcrypt
      .genSalt(10)
      .then((salt) => bcrypt.hash(password, salt))
      .then((hashedPassword) => {
        generateAccessToken(username).then((token) => {
          res.status(201).send({ token: token });
          fetch("https://whatchagot.azurewebsites.net/users", {
            method: "POST",
            headers: addAuthHeader({
              "Content-Type": "application/json",
            }),
            body: JSON.stringify({ username, hashedPassword, uid })
          })
            .then((response) => {
              if (response.status === 201) {
                response
                  .json()
                  .then((json) => console.log(json));
              } else {
                console.log(response);
              }
            })
            .catch((error) => {
              console.log(`Signup Error: ${error}`);
            });
        })
      })
      .catch((error) => {
        res.status(500).send("Internal server error" + error);
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
    res.status(401).send("Unauthorized");
  } else {
    bcrypt
      .compare(password, retrievedUser.hashedPassword)
      .then((matched) => {
        if (matched) {
          generateAccessToken(username).then((token) => {
            res.status(200).send({ token: token });
          });
        } else {
          // invalid password
          res.status(401).send("Unauthorized");
        }
      })
      .catch(() => {
        res.status(401).send("Unauthorized");
      });
  }
}
