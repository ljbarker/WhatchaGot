import React, { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./Home";

function MyApp() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </BrowserRouter>
    );

    
}

export default MyApp;