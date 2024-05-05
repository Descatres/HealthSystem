import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Homepage from "./pages/Homepage/Homepage";
import Login from "./pages/Login/Login";

function App() {
    const [name, setName] = useState("foo");
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const handleLogin = () => {
        setIsLoggedIn(!isLoggedIn);
    };

    const handleCreateAppointment = () => {
        setIsCreateModalOpen(!isCreateModalOpen);
    };

    return (
        <>
            <Router>
                <Navbar isLoggedIn={isLoggedIn} handleLogin={handleLogin} />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Homepage
                                name={name}
                                isLoggedIn={isLoggedIn}
                                isCreateModalOpen={isCreateModalOpen}
                                handleCreateModal={handleCreateAppointment}
                            />
                        }
                    />
                </Routes>
                <Routes>
                    <Route
                        path="/login"
                        element={
                            <Login
                                isLoggedIn={isLoggedIn}
                                handleLogin={handleLogin}
                            />
                        }
                    />
                </Routes>
                {/* <Routes>
                    <Route
                        path="/appointment"
                        element={
                            <Appointment />
                        }
                    />
                </Routes> */}
            </Router>
        </>
    );
}

export default App;
