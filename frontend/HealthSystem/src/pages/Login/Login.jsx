import React, { useState, useEffect, useContext, useRef } from "react";
import classes from "./Login.module.css";

function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(false);

    const handleIsLogin = () => {
        setIsLogin(!isLogin);
    };

    return (
        <>
            <div className={classes.container}>
                {!props.isLoggedIn && null}
                {isLogin ? (
                    <>
                        <h1>Login</h1>
                        <p>E-mail</p>
                        <p>Password</p>
                        <p>
                            Don&apos;t have an account?&nbsp;
                            <a onClick={handleIsLogin}>Create one</a>
                        </p>
                    </>
                ) : (
                    <>
                        <h1>Register</h1>
                        <p>Username</p>
                        <p>E-mail</p>
                        <p>Password</p>
                        <p>
                            Already have an account?&nbsp;
                            <a onClick={handleIsLogin}>Log in</a>
                        </p>
                    </>
                )}
            </div>
        </>
    );
}

export default Login;
