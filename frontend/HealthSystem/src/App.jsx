import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Homepage from "./pages/Homepage/Homepage";
import Login from "./pages/Login/Login";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    // TODO

    // async function reserveAppointmentSlot(reservationData) {
    //     const response = await fetch('http://localhost:8000/reserve/', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify(reservationData),
    //     });

    //     const data = await response.json();
    //     if (response.ok) {
    //       console.log('Slot reserved successfully:', data);
    //     } else {
    //       console.error('Error reserving slot:', data);
    //     }
    //   }

    //   async function createAppointment(appointmentData) {
    //     const response = await fetch('http://localhost:8000/appointments/', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify(appointmentData),
    //     });

    //     const data = await response.json();
    //     if (response.ok) {
    //       console.log('Appointment created successfully:', data);
    //     } else {
    //       console.error('Error creating appointment:', data);
    //     }
    //   }

    // async function getAppointments(userId) {
    //     const response = await fetch(
    //         `http://localhost:8000/appointments/${userId}/`,
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

    //   const reservationData = {
    //     user_id: 1,
    //     doctor: 'Dr. Smith',
    //     date: '2024-05-20',
    //     time: '10:00',
    //   }; // todo: get this data from the form
    //   reserveAppointmentSlot(reservationData).then(() => {
    //     const appointmentData = { ...reservationData, speciality: 'Cardiology' };
    //     createAppointment(appointmentData);
    //   });

    useEffect(() => {
        const checkLoginStatus = () => {
            const loginTimestamp = localStorage.getItem("loginTimestamp");
            if (loginTimestamp) {
                const now = new Date().getTime();
                const twentyFourHours = 24 * 60 * 60 * 1000;
                if (now - parseInt(loginTimestamp) < twentyFourHours) {
                    setIsLoggedIn(true);
                }
            }
        };
        checkLoginStatus();
    }, []);

    const setLoginTimestamp = () => {
        const now = new Date();
        localStorage.setItem("loginTimestamp", now.getTime());
    };

    const handleLogin = (email, password) => {
        if (!isLoggedIn) {
            fetch("http://localhost:8000/login/", {
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
                        setLoginTimestamp();
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
            localStorage.removeItem("loginTimestamp");
            console.log("Logged out");
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
