import { useState, useEffect } from "react";
// import axios from "axios";
import classes from "./CreateAppointment.module.css";
import Card from "../../Card/Card";
import Payment from "../Payment/Payment";

function CreateAppointment(props) {
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [showDates, setShowDates] = useState(false);
    const [speciality, setSpeciality] = useState("");
    const [doctorName, setDoctorName] = useState("");
    const [appointmentDate, setAppointmentDate] = useState("");
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

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

    const handleSpecialityChange = (event) => {
        setSpeciality(event.target.value);
        // props.setSpeciality(speciality);
        if (event.target.value !== "") setShowDates(true);
        else setShowDates(false);
    };

    const handleDoctorNameChange = (event) => {
        setDoctorName(event.target.value);
        // props.setDoctorName(doctorName);
        // if (event.target.value !== "") setShowDates(true);
        // else setShowDates(false);
    };

    const handleAppointmentDateChange = (event) => {
        setAppointmentDate(event.target.value);
        // props.setAppointmentDate(appointmentDate);
    };

    const handlePaymentShow = () => {
        if (speciality && appointmentDate) {
            console.log("payment");
            props.handleCreateAppointment();
            setIsPaymentModalOpen(true);
        } else {
            setErrorMessage("Please select a speciality and date.");
        }
    };

    const goBack = () => {
        props.handleCreateAppointment();
        setIsPaymentModalOpen(false);
    };

    return (
        <div>
            {props.createAppointmentModal ? (
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
                            <div className={classes.title}>New Appointment</div>
                        </div>
                        <div className={classes.topCardContainer}>
                            <Card>
                                <div className={classes.optionsContainer}>
                                    <p>Speciality</p>
                                    <select
                                        value={speciality}
                                        onChange={handleSpecialityChange}
                                    >
                                        <option value="">
                                            Select speciality
                                        </option>
                                        <option value="Cardiology">
                                            Cardiology
                                        </option>
                                        <option value="Dermatology">
                                            Dermatology
                                        </option>
                                        <option value="Orthopedics">
                                            Orthopedics
                                        </option>
                                    </select>
                                </div>
                            </Card>
                        </div>
                        <div className={classes.bottomCardContainer}>
                            <Card>
                                <div className={classes.optionsContainer}>
                                    <p>Doctor's name</p>
                                    <select
                                        value={doctorName}
                                        onChange={handleDoctorNameChange}
                                    >
                                        <option value="">
                                            Select doctor (optional)
                                        </option>
                                        <option value="Dr. Smith">
                                            Dr. Smith
                                        </option>
                                        <option value="Dr. Johnson">
                                            Dr. Johnson
                                        </option>
                                        <option value="Dr. Patel">
                                            Dr. Patel
                                        </option>
                                    </select>
                                </div>
                            </Card>
                        </div>
                        {showDates && (
                            <>
                                <div className={classes.subtitle}>Dates</div>
                                <Card>
                                    <div className={classes.optionsContainer}>
                                        <p>Available dates</p>
                                        <select
                                            value={appointmentDate}
                                            onChange={
                                                handleAppointmentDateChange
                                            }
                                        >
                                            <option value="">
                                                Select date
                                            </option>
                                            <option value="11/06/2024 09:00AM">
                                                11/06/2024 09:00AM
                                            </option>
                                            <option value="12/06/2024 10:00AM">
                                                12/06/2024 10:00AM
                                            </option>
                                            <option value="13/06/2024 11:00AM">
                                                13/06/2024 11:00AM
                                            </option>
                                        </select>
                                    </div>
                                </Card>
                            </>
                        )}
                        {errorMessage && (
                            <div className={classes.errorText}>
                                {errorMessage}
                            </div>
                        )}
                        <div className={classes.buttonsContainer}>
                            <button
                                className={classes.normal}
                                onClick={handlePaymentShow}
                            >
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
            ) : (
                <Payment
                    isPaymentModalOpen={isPaymentModalOpen}
                    goBack={goBack}
                    handlePaymentShow={handlePaymentShow}
                    speciality={speciality}
                    doctorName={doctorName}
                    appointmentDate={appointmentDate}
                />
            )}
        </div>
    );
}

export default CreateAppointment;
