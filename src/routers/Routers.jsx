import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/home/Home';
import User from '../pages/user/User';

export function Routers() {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/user" element={<User />} />
                <Route path="/user/:id" element={<User />} />
                <Route path='*' element={() => <h1>Page not found</h1>} />
            </Routes>
        </Router>
    );
}

export default Routers;