import React, { useState, useEffect, useContext, useRef } from "react";
import classes from "./Login.module.css";

function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <>
            <div className={classes.container}>
                {!props.isLoggedIn && null}
                <>
                    <h1 style={{ marginBottom: "2rem" }}>Welcome</h1>
                    <div className={classes.row}>
                        <p
                            style={{
                                marginLeft: "2rem",
                            }}
                        >
                            E-mail
                        </p>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className={classes.row}>
                        <p>Password</p>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        className={classes.normal}
                        onClick={() => props.login(email, password)}
                    >
                        Login
                    </button>
                </>
            </div>
        </>
    );
}

export default Login;
