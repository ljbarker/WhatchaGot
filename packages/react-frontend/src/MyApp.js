import React, { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import MyRecipes from "./pages/MyRecipes";

function MyApp() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/myrecipes" element={<MyRecipes />} />
            </Routes>
        </BrowserRouter>
    );

    
}

export default MyApp;