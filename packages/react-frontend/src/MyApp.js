import React, { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./Home";
import MyRecipes from "./MyRecipes";

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