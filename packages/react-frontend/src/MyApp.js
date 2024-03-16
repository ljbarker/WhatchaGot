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
        // checks the token and returns a header based on the token
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
        // makes a fetch to our backend to fetch information from backend to see if login is possible
        const promise = fetch(`https://whatchagot.azurewebsites.net/login`, {
            method: "POST",
            headers: addAuthHeader({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify(creds)
        })
            .then((response) => {
                if (response.status === 200) {
                    // login was successful!
                    response
                        .json()
                        .then((payload) => setToken(payload.token));
                    setMessage(`Login successful; auth token saved`);
                    toaster.success("Login successful!");
                    setUsername(creds.username);
                }
                else if (response.status === 401) {
                    // If the message returned is a 401, means that login either failed or wrong password/username put in
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
        // makes a fetch to our backend when we get a signup req from signup.js
        const promise = fetch(`https://whatchagot.azurewebsites.net/signup`, {
            method: "POST",
            headers: addAuthHeader({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify({ ...creds, _id: `${Math.floor(Math.random() * 1000)}` })
        })
            .then((response) => {
                // if the response is a 201, that means everything worked correctly!
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
                    // If the response from backend is 409, we display whatever the flavor text is returned into toaster to display to the screen!
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
                <Route path="/recipe/:username/:id" element={<Recipe token={token} addAuthHeader={addAuthHeader} username={username} />} />
                <Route path="/myinventory" element={<MyInventory token={token} addAuthHeader={addAuthHeader} username={username} />} />
                <Route path="/myshoppinglist" element={<MyShoppingList token={token} addAuthHeader={addAuthHeader} username={username} />} />
                <Route path="/login" element={<Login token={token} addAuthHeader={addAuthHeader} handleSubmit={loginUser} username={username} />} />
                <Route path="/signup" element={<SignUp token={token} addAuthHeader={addAuthHeader} handleSubmit={signupUser} username={username} />} />
                <Route path="/forgotPassword" element={<SignUp token={token} addAuthHeader={addAuthHeader} handleSubmit={signupUser} username={username} />} />
            </Routes>
        </BrowserRouter>
    );


}

export default MyApp;