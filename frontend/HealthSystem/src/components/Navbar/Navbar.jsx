import React, { useState, useEffect, useContext, useRef } from "react";
import classes from "./Navbar.module.css";

function Navbar(props) {
    return (
        <>
            <nav className={classes.container}>
                <ul className={classes.navbar}>
                    <li>
                        <a href="/user">Profile</a>
                    </li>
                    <li>
                        <a href="/">HealthSystem</a>
                    </li>
                    <li>
                        <a href="/login">Login</a>
                    </li>
                </ul>
            </nav>
        </>
    );
}

export default Navbar;
