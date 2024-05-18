import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Homepage from "./pages/Homepage/Homepage";
import Login from "./pages/Login/Login";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    // TODO
    // async function createAppointment(appointmentData) {
    //     const response = await fetch("http://backend-domain/appointments/", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(appointmentData),
    //     });

    //     const data = await response.json();
    //     if (response.ok) {
    //         console.log("Appointment created successfully:", data);
    //     } else {
    //         console.error("Error creating appointment:", data);
    //     }
    // }

    // async function getAppointments(userId) {
    //     const response = await fetch(
    //         `http://backend-domain/appointments/${userId}/`,
    //         {
    //             method: "GET",
    //         }
    //     );

    //     const data = await response.json();
    //     if (response.ok) {
    //         console.log("Retrieved appointments:", data);
    //     } else {
    //         console.error("Error retrieving appointments:", data);
    //     }
    // }

    const handleLogin = (email, password) => {
        if (!isLoggedIn) {
            fetch("http://localhost:8000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.token) {
                        setIsLoggedIn(true);
                        console.log("Logged in", data.token);
                    } else {
                        setIsLoggedIn(false);
                        console.log("Failed to log in", data.error);
                    }
                })
                .catch((error) => {
                    console.log("Error during login", error);
                    setIsLoggedIn(false);
                });
        } else {
            setIsLoggedIn(false);
        }
    };

    const handleCreateAppointment = () => {
        setIsCreateModalOpen(!isCreateModalOpen);
    };

    const closeCreateAppointment = () => {
        setIsCreateModalOpen(false);
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
                                isLoggedIn={isLoggedIn}
                                isCreateModalOpen={isCreateModalOpen}
                                handleCreateAppointment={
                                    handleCreateAppointment
                                }
                                closeCreateAppointment={closeCreateAppointment}
                                setCreateAppointmentModalOpen={
                                    setIsCreateModalOpen
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
                </Routes>
            </Router>
        </>
    );
}

export default App;
