import React, { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home.js";
import MyRecipes from "./pages/MyRecipes.js";
import MyInventory from './pages/MyInventory.js';
import MyShoppingList from './pages/MyShoppingList.js';
import Recipe from './pages/Recipe.js';
import Login from './pages/Login.js';
import SignUp from './pages/SignUp.js';
import { useState } from 'react';


function MyApp() {
    const INVALID_TOKEN = "INVALID_TOKEN";
    const [token, setToken] = useState(INVALID_TOKEN);
    const [message, setMessage] = useState("");

    function loginUser(creds) {
        const promise = fetch(`https://whatchagot.azurewebsites.net/login`, {
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

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home token={token} />} />
                <Route path="/myrecipes" element={<MyRecipes token={token} />} />
                <Route path="/recipe/:id" element={<Recipe token={token} />} />
                <Route path="/myinventory" element={<MyInventory token={token} />} />
                <Route path="/myshoppinglist" element={<MyShoppingList token={token} />} />
                <Route path="/login" element={<Login handleSubmit={loginUser} />} />
                <Route path="/signup" element={<SignUp handleSubmit={signupUser} />} />
                <Route path="/forgotPassword" element={<SignUp handleSubmit={signupUser} />} />
            </Routes>
        </BrowserRouter>
    );


}

export default MyApp;