import React, { useState, createRef, useEffect, useContext } from "react";
// import axios from "axios";
import classes from "./CreateAppointment.module.css";
import Card from "../../Card/Card";

function CreateAppointment(props) {
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        // Clear the error message if the modal is closed
        setErrorMessage("");
        setSuccessMessage("");
    }, [props.createAppointmentModal]);

    useEffect(() => {
        if (errorMessage) {
            setSuccessMessage("");
        } else if (successMessage) {
            setErrorMessage("");
        }
    }, [errorMessage, successMessage]);

    const handleCloseModal = () => {
        props.handleCreateAppointment();
    };

    return (
        <div>
            {props.createAppointmentModal && (
                <div
                    className={
                        props.createAppointmentModal
                            ? classes.creatModalOverlay
                            : classes._
                    }
                    onClick={handleCloseModal}
                    onDragOver={(e) => e.preventDefault()}
                    onDragEnter={(e) => e.preventDefault()}
                >
                    <div
                        className={classes.createModal}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={classes.headerContainer}>
                            <div className={classes.title}>Appointment</div>
                        </div>
                        <div className={classes.topCardContainer}>
                            <Card>
                                <p>Speciality</p>
                            </Card>
                        </div>
                        <div className={classes.bottomCardContainer}>
                            <Card>
                                <div className={classes.inputFile}>
                                    <p>Doctor's name (optional)</p>
                                </div>
                            </Card>
                        </div>
                        <div className={classes.subtitle}>Dates</div>
                        <div className={classes.buttonsContainer}>
                            <button className={classes.normal}>
                                Go to payment
                            </button>
                            <button
                                className={classes.normal}
                                onClick={props.handleCreateAppointment}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CreateAppointment;