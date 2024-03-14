import React, { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home.js";
import MyRecipes from "./pages/MyRecipes.js";
import MyInventory from './pages/MyInventory.js';
import MyShoppingList from './pages/MyShoppingList.js';
import Recipe from './pages/Recipe.js';
import Login from './pages/Login.js';
import SignUp from './pages/SignUp.js';
import { useState } from 'react';
import { toaster } from 'evergreen-ui';


function MyApp() {
    const INVALID_TOKEN = "INVALID_TOKEN";
    const [token, setToken] = useState(INVALID_TOKEN);
    const [message, setMessage] = useState("");
    const [username, setUsername] = useState("");

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

    function loginUser(creds) {
        const promise = fetch(`https://whatchagot.azurewebsites.net/login`, {
            method: "POST",
            headers: addAuthHeader({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify(creds)
        })
            .then((response) => {
                if (response.status === 200) {
                    response
                        .json()
                        .then((payload) => setToken(payload.token));
                    setMessage(`Login successful; auth token saved`);
                    toaster.success("Login successful!");
                    setUsername(creds.username);
                }
                else if (response.status === 401) {
                    response.text()
                        .then((text) => toaster.danger(text));
                }
                else {
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
            headers: addAuthHeader({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify({ ...creds, _id: `${Math.floor(Math.random() * 1000)}` })
        })
            .then((response) => {
                if (response.status === 201) {
                    response
                        .json()
                        .then((payload) => setToken(payload.token));
                    setMessage(
                        `Signup successful for user: ${creds.username}; auth token saved`
                    );
                    toaster.success('User successfully added!');
                    setUsername(creds.username);
                }
                else if (response.status === 409) {
                    response.text()
                        .then((text) => toaster.danger(text));
                }
                else {
                    setMessage(
                        `Signup Error ${response.status}: ${response.data}`
                    );
                }
            })
            .catch((error) => {
                console.log(error);
                setMessage(`Signup Error: ${error}`);
            });

        return promise;
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home token={token} addAuthHeader={addAuthHeader} username={username} />} />
                <Route path="/myrecipes" element={<MyRecipes token={token} addAuthHeader={addAuthHeader} username={username} />} />
                <Route path="/recipe/:id" element={<Recipe token={token} addAuthHeader={addAuthHeader} username={username} />} />
                <Route path="/myinventory" element={<MyInventory token={token} addAuthHeader={addAuthHeader} username={username} />} />
                <Route path="/myshoppinglist" element={<MyShoppingList token={token} addAuthHeader={addAuthHeader} username={username} />} />
                <Route path="/login" element={<Login token={token} addAuthHeader={addAuthHeader} handleSubmit={loginUser} />} />
                <Route path="/signup" element={<SignUp token={token} addAuthHeader={addAuthHeader} handleSubmit={signupUser} />} />
                <Route path="/forgotPassword" element={<SignUp token={token} addAuthHeader={addAuthHeader} handleSubmit={signupUser} />} />
            </Routes>
        </BrowserRouter>
    );


}

export default MyApp;