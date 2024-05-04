// import React, { useState, useEffect, useContext, useRef } from "react";
import classes from "./Navbar.module.css";

function Navbar(props) {
    return (
        <>
            <nav className={classes.container}>
                <ul className={classes.navbar}>
                    <a href="/profile">Profile</a>
                    <a href="/">HealthSystem</a>
                    {props.isLoggedIn ? (
                        <a href="/logout">Logout</a>
                    ) : (
                        <a href="/login">Login</a>
                    )}
                </ul>
            </nav>
        </>
    );
}

export default Navbar;
