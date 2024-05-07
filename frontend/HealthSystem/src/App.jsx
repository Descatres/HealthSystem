import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Homepage from "./pages/Homepage/Homepage";
import Login from "./pages/Login/Login";
// import CreateAppointment from "./components/Modals/CreateAppointment/CreateAppointment";

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
                <Navbar
                    isLoggedIn={isLoggedIn}
                    setIsLoggedIn={setIsLoggedIn}
                    handleLogin={handleLogin}
                />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Homepage
                                name={name}
                                isLoggedIn={isLoggedIn}
                                isCreateModalOpen={isCreateModalOpen}
                                handleCreateAppointment={
                                    handleCreateAppointment
                                }
                            />
                        }
                    />

                    <Route
                        path="/login"
                        element={
                            <Login
                                isLoggedIn={isLoggedIn}
                                handleLogin={handleLogin}
                            />
                        }
                    />
                    {/* <Routes>
                    <Route
                        path="/appointment"
                        element={
                            <Appointment />
                        }
                    /> */}
                </Routes>
            </Router>
        </>
    );
}

export default App;
