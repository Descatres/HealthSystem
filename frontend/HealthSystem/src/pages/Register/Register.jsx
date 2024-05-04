// import React, { useState, useEffect, useContext, useRef } from "react";
import classes from "./Register.module.css";

function Register(props) {
    return (
        <>
            <div className={classes.container}>
                <h1>Register</h1>
                <p>Username</p>
                <p>E-mail</p>
                <p>Password</p>
                <p>
                    Already have an account?&nbsp;
                    <a href="/login">Log in</a>
                </p>
            </div>
        </>
    );
}

export default Register;
