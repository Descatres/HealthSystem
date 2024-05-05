// import React, { useState, useEffect, useContext, useRef } from "react";
import classes from "./Homepage.module.css";
import CreateAppointment from "../../components/Modals/CreateAppointment/CreateAppointment";

function Homepage(props) {
    return (
        <>
            {props.isCreateModalOpen && <CreateAppointment />}
            <div className={classes.container}>
                <div className={classes.topContainer}>
                    <div className={classes.subtitle}>
                        {props.isLoggedIn ? (
                            <p>How are you today, {props.name}?</p>
                        ) : (
                            <p>How are you today?</p>
                        )}
                    </div>
                    <div className={classes.appointment}>
                        {props.isLoggedIn ? (
                            <button
                                className={classes.big}
                                onClick={props.handleCreateAppointment}
                            >
                                Create appointment
                            </button>
                        ) : (
                            <p>
                                Please, <a href="/login">login</a> to create an
                                appointment
                            </p>
                        )}
                    </div>
                </div>

                <div className={classes.line} />
                {/* <div className={classes.content}></div> */}
            </div>
        </>
    );
}

export default Homepage;
