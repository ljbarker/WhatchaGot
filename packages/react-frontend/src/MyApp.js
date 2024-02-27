import React, { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import MyRecipes from "./pages/MyRecipes";
import MyInventory from './pages/MyInventory';
import MyList from './pages/MyList';

function MyApp() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/myrecipes" element={<MyRecipes />} />
                <Route path="/myinventory" element={<MyInventory />} />
                <Route path="/mylist" element={<MyList />} />
            </Routes>
        </BrowserRouter>
    );

    
}

export default MyApp;