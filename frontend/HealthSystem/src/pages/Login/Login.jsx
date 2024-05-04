import React, { useState, useEffect, useContext, useRef } from "react";
import classes from "./Login.module.css";

function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(false);
    return (
        <>
            <div className={classes.container}>
                {(!isLogin && (
                    <>
                        <h1>Login</h1>
                        <p>E-mail</p>
                        <p>Password</p>
                        <p>
                            Don&apos;t have an account?&nbsp;
                            <a href="/register">Create one</a>
                        </p>
                    </>
                )) || <a href="/logout">Log out</a>}
            </div>
        </>
    );
}

export default Login;
