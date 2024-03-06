import React, { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home.js";
import MyRecipes from "./pages/MyRecipes.js";
import MyInventory from './pages/MyInventory.js';
import MyShoppingList from './pages/MyShoppingList.js';
import Recipe from './pages/Recipe.js';
import Login from './pages/Login.js';
import SignUp from './pages/SignUp.js';


function MyApp() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/myrecipes" element={<MyRecipes />} />
                <Route path="/recipe/:id" element={<Recipe />} />
                <Route path="/myinventory" element={<MyInventory />} />
                <Route path="/myshoppinglist" element={<MyShoppingList />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp/>} />
            </Routes>
        </BrowserRouter>
    );


}

export default MyApp;