import React, { useState, createRef, useEffect, useContext } from "react";
// import axios from "axios";
import classes from "./Payment.module.css";
import Card from "../../../Card/Card";

function Payment(props) {
    const [paid, setPaid] = useState(false);

    const handleIsPaid = () => {
        setPaid(true);
        props.closePayment();
    };

    const [time, setTime] = useState(58);
    useEffect(() => {
        const timer = setTimeout(() => {
            setTime(time - 1);
        }, 1000);
        if (time === 0) {
            props.closePayment();
        }
        return () => clearTimeout(timer);
    }, [time]);

    return (
        <div>
            <div
                className={
                    props.isPaymentModalOpen
                        ? classes.creatModalOverlay
                        : classes._
                }
                onClick={props.closePayment}
                onDragOver={(e) => e.preventDefault()}
                onDragEnter={(e) => e.preventDefault()}
            >
                <div
                    className={classes.createModal}
                    onClick={(e) => e.stopPropagation()}
                >
                    {paid ? (
                        <h2
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                margin: "4rem",
                            }}
                            className={classes.successText}
                        >
                            Payment successful!{" "}
                        </h2>
                    ) : (
                        <>
                            <div className={classes.headerContainer}>
                                <div className={classes.title}>
                                    New Appointment
                                </div>
                                <div className={classes.timeRemaining}>
                                    Time remaining: {time > 0 ? time + 2 : 0}
                                </div>
                            </div>

                            <div className={classes.bottomCardContainer}>
                                <Card>
                                    <div className={classes.optionsContainer}>
                                        <p>Speciality: {props.speciality}</p>
                                    </div>
                                </Card>
                            </div>
                            <div className={classes.bottomCardContainer}>
                                <Card>
                                    <div className={classes.optionsContainer}>
                                        <p>
                                            Doctor's name:{" "}
                                            {props.doctorName
                                                ? props.doctorName
                                                : "Not specified"}
                                        </p>
                                    </div>
                                </Card>
                            </div>
                            <div className={classes.bottomCardContainer}>
                                <Card>
                                    <div className={classes.optionsContainer}>
                                        <p>
                                            Date: {props.appointmentDay}{" "}
                                            {props.appointmentHour}
                                        </p>
                                    </div>
                                </Card>
                            </div>

                            <div className={classes.buttonsContainer}>
                                <button
                                    className={classes.normal}
                                    onClick={handleIsPaid}
                                >
                                    Pay
                                </button>
                                <button
                                    className={classes.normal}
                                    onClick={props.goBack}
                                >
                                    Go back
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Payment;
