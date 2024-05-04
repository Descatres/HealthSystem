// import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Homepage from "./pages/Homepage/Homepage";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Profile from "./pages/Profile/Profile";

function App() {
    return (
        <>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Homepage />} />
                </Routes>
                <Routes>
                    <Route path="/login" element={<Login />} />
                </Routes>
                <Routes>
                    <Route path="/register" element={<Register />} />
                </Routes>
                <Routes>
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
