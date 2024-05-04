// import React, { useState, useEffect, useContext, useRef } from "react";
import classes from "./Navbar.module.css";

function Navbar() {
    return (
        <>
            <nav className={classes.container}>
                <ul className={classes.navbar}>
                    <a href="/profile">Profile</a>
                    <a href="/">HealthSystem</a>
                    <a href="/login">Login</a>
                </ul>
            </nav>
        </>
    );
}

export default Navbar;
