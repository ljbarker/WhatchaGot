import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userqueries from "./models/user-services.js";
import dotenv from "dotenv";

dotenv.config();

export function registerUser(req, res) {
  const { username, password, _id } = req.body; // from form

  // If username password or id is null or empty, we send a bad request.
  if (!username || !password || !_id) {
    res.status(400).send("Bad request: Invalid input data.");
  }
  // If password or length does not meet our requirements, it sends the same 409 error.
  else if (username.length < 3) {
    res
      .status(409)
      .send(
        "Username is too short. Please make your username larger than 2 characters.",
      );
  } else if (password.length < 8) {
    res
      .status(409)
      .send(
        "Password is too short. Please make your password larger than 7 characters.",
      );
  } else {
    userqueries
      .findUserByUsername(username)
      .then((retrievedUser) => {
        if (retrievedUser.length > 0) {
          res.status(409).send(`Username already taken ${username}`);
        } else {
          // encryps and salts the password using bcrypt
          bcrypt
            .genSalt(10)
            .then((salt) => bcrypt.hash(password, salt))
            .then((hashedPassword) => {
              generateAccessToken(username)
                .then((token) => {
                  res.status(201).send({ token: token });
                  userqueries
                    .addUser({ username, password: hashedPassword, _id })
                    .then((result) => {
                      // user will add to our backend if we get a 201 status
                      console.log("User added", result);
                    })
                    .catch((error) => {
                      console.log("Error adding user", error);
                    });
                })
                .catch((error) => {
                  // if the token generates incorrectly, we get a 500 error
                  res
                    .status(500)
                    .send("something went wrong generating token" + error);
                });
            })
            .catch((error) => {
              // if we get a post error, we post a 500 error
              res.status(500).send("something went wrong posting user");
            });
        }
      })
      .catch(() => {
        res.status(500).send(`findUserByUsername failed ${username}`);
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
      },
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
    jwt.verify(token, process.env.TOKEN_SECRET, (error, decoded) => {
      if (decoded) {
        next();
      } else {
        console.log("JWT error:", error);
        res.status(401).end();
      }
    });
  }
}

export function loginUser(req, res) {
  const { username, password, _id } = req.body; // from form
  userqueries
    .findUserByUsername(username)
    .then((retrievedUser) => {
      if (retrievedUser.length === 0) {
        // invalid username
        res.status(401).send(`Invalid Username ${username}`);
      } else {
        bcrypt
          .compare(password, retrievedUser[0].password)
          .then((matched) => {
            if (matched) {
              generateAccessToken(username)
                .then((token) => {
                  res.status(200).send({ token: token });
                })
                .catch((error) => {
                  res
                    .status(500)
                    .send("something went wrong generating token" + error);
                });
            } else {
              // invalid password
              res.status(401).send(`Invalid Password ${password}`);
            }
          })
          .catch(() => {
            // happens when the salted/encrypted password fails the comparison check
            res
              .status(401)
              .send(
                `bcrypt compare failed ${username} ${password} ${retrievedUser}`,
              );
          });
      }
    })
    .catch(() => {
      res.status(500).send(`findUserByUsername failed ${username}`);
    });
}
