// import React, { useState, useEffect, useContext, useRef } from "react";
import classes from "./Navbar.module.css";
import lgo2 from "../../assets/lgo2.png";

function Navbar(props) {
    return (
        <>
            <nav className={classes.container}>
                <ul className={classes.navbar}>
                    {/* {!props.isLoggedIn ? (
                        <a href="/"> */}
                    <img src={lgo2} alt="HealthSystem" />
                    {/* </a>
                    ) : (
                        <a href="/login">
                            <img src={lgo2} alt="HealthSystem" />
                        </a>
                    )} */}
                    {props.isLoggedIn ? (
                        <a href="/login" onClick={props.handleLogin}>
                            Logout
                        </a>
                    ) : (
                        <a href="/login" onClick={props.handleLogin}>
                            Login
                        </a>
                    )}
                </ul>
            </nav>
        </>
    );
}

export default Navbar;
