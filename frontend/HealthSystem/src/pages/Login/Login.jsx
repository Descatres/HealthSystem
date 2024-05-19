import { useState } from "react";
import classes from "./Login.module.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        console.log(props.isLoggedIn);
        if (props.isLoggedIn) {
            navigate("/");
        }
    }, [props.isLoggedIn]);

    useEffect(() => {
        const savedEmail = localStorage.getItem("loginEmail");
        const savedRememberMe = localStorage.getItem("rememberMe");

        if (savedEmail && savedRememberMe === "true") {
            setEmail(savedEmail);
            setRememberMe(true);
        }
    }, []);

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            props.handleLogin(email, password);
        }
    };

    const handleLogin = () => {
        props.handleLogin(email, password);

        // Save email and rememberMe status if rememberMe is checked
        if (rememberMe) {
            localStorage.setItem("loginEmail", email);
            localStorage.setItem("rememberMe", true);
        } else {
            // Clear saved email and rememberMe status
            localStorage.removeItem("loginEmail");
            localStorage.removeItem("rememberMe");
        }
    };

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
                            onKeyDown={handleKeyDown}
                            required
                        />
                    </div>
                    <div className={classes.rememberContainer}>
                        <div className={classes.remember}>
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) =>
                                    setRememberMe(e.target.checked)
                                }
                            />
                            <div>Remember me</div>
                        </div>
                    </div>
                    <button
                        className={classes.normal}
                        onClick={handleLogin}
                        required
                    >
                        Login
                    </button>
                </>
            </div>
        </>
    );
}

export default Login;
