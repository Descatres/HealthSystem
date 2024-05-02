import React, { useState, useEffect, useContext, useRef } from "react";
import classes from "./Homepage.module.css";

function Homepage(props) {
    return (
        <>
            <div className={classes.container}>
                <h1>Homepage</h1>
                <p>Welcome to the homepage!</p>
            </div>
        </>
    );
}

export default Homepage;
