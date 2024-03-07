import React, { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from "./pages/Home.js";
import MyRecipes from "./pages/MyRecipes.js";
import MyInventory from './pages/MyInventory.js';
import MyShoppingList from './pages/MyShoppingList.js';
import Recipe from './pages/Recipe.js';
import Login from './pages/Login.js';
import SignUp from './pages/SignUp.js';




function MyApp() {

    const INVALID_TOKEN = "INVALID_TOKEN";
    const [token, setToken] = useState(INVALID_TOKEN);
    const [message, setMessage] = useState("");
    // Only need code below if we have multiple headers
    /*
    const promise = fetch(`https://whatchagot.azurewebsites.net/users`, {
        method: "POST",
        headers: addAuthHeader({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(person)
      });
      */

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/myrecipes" element={<MyRecipes />} />
                <Route path="/recipe/:id" element={<Recipe />} />
                <Route path="/myinventory" element={<MyInventory />} />
                <Route path="/myshoppinglist" element={<MyShoppingList />} />
                <Route path="/login"
                element={<Login  handleSubmit={loginUser}/>} />
                <Route path="/signup" 
                element={<SignUp handleSubmit={signupUser}/>} />
            </Routes>
        </BrowserRouter>
    );
    /*
    useEffect(() => {
        fetchUsers()
          .then((res) =>
            res.status === 200 ? res.json() : undefined
          )
          .then((json) => {
            if (json) {
              setCharacters(json["users_list"]);
            } else {
              setCharacters(null);
            }
          })
          .catch((error) => { console.log(error); });
        }, [] );
    */

    function loginUser(creds) {
        const promise = fetch(`http://localhost:8000/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(creds)
        })
          .then((response) => {
            if (response.status === 200) {
              response
                .json()
                .then((payload) => setToken(payload.token));
              setMessage(`Login successful; auth token saved`);
              console.log(response.status);
            } else {
              setMessage(
                `Login Error ${response.status}: ${response.data}`
              );
            }

          })
          .catch((error) => {
            setMessage(`Login Error: ${error}`);
          });
      
        return promise;
      }
      /*
      function fetchUsers() {
        const promise = fetch(`https://whatchagot.azurewebsites.net/users`, {
          headers: addAuthHeader()
        });
      
        return promise;
      }
      */

      function addAuthHeader(otherHeaders = {}) {
        if (token === INVALID_TOKEN) {
          return otherHeaders;
        } else {
          return {
            ...otherHeaders,
            Authorization: `Bearer ${token}`
          };
        }
      }


      function signupUser(creds) {
        const promise = fetch(`https://whatchagot.azurewebsites.net/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(creds)
        })
          .then((response) => {
            if (response.status === 201) {
              response
                .json()
                .then((payload) => setToken(payload.token));
              setMessage(
                `Signup successful for user: ${creds.username}; auth token saved`
              );
            } else {
              setMessage(
                `Signup Error ${response.status}: ${response.data}`
              );
            }
          })
          .catch((error) => {
            setMessage(`Signup Error: ${error}`);
          });
      
        return promise;
      }

}

export default MyApp;