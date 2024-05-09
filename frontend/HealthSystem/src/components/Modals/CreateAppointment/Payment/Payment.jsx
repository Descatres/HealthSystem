import React, { useState, createRef, useEffect, useContext } from "react";
// import axios from "axios";
import classes from "./Payment.module.css";
import Card from "../../../Card/Card";

function Payment(props) {
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
                    <div className={classes.headerContainer}>
                        <div className={classes.title}>New Appointment</div>
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
                            onClick={props.closePayment}
                        >
                            Finish
                        </button>
                        <button
                            className={classes.normal}
                            onClick={props.goBack}
                        >
                            Go back
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Payment;
