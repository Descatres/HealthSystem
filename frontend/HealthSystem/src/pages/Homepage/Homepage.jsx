import React, { useState, useEffect, useContext, useRef } from "react";
import classes from "./Homepage.module.css";
import CreateAppointment from "../../components/Modals/CreateAppointment/CreateAppointment";
import AppointmentsList from "../../components/AppointmentsList/AppointmentsList";

const appointmentsData = {
    current: [
        {
            id: 1,
            organizer: "Dr. Smith",
            name: "Annual Physical Examination",
            date: "2024-06-15T08:00:00Z",
            state: "Active",
        },
        {
            id: 2,
            organizer: "Dr. Johnson",
            name: "Dental Cleaning",
            date: "2024-06-20T10:30:00Z",
            state: "Active",
        },
        {
            id: 3,
            organizer: "Dr. Lee",
            name: "Eye Checkup",
            date: "2024-06-25T14:00:00Z",
            state: "Active",
        },
        {
            id: 4,
            organizer: "Dr. Patel",
            name: "Blood Test",
            date: "2024-07-02T09:30:00Z",
            state: "Active",
        },
        {
            id: 5,
            organizer: "Dr. Garcia",
            name: "Vaccination",
            date: "2024-07-10T11:00:00Z",
            state: "Active",
        },
        {
            id: 6,
            organizer: "Dr. Nguyen",
            name: "Cholesterol Screening",
            date: "2024-07-15T08:45:00Z",
            state: "Active",
        },
        {
            id: 7,
            organizer: "Dr. Martinez",
            name: "Bone Density Test",
            date: "2024-07-20T13:15:00Z",
            state: "Active",
        },
        {
            organizer: "Dr. Brown",
            name: "Heart Checkup",
            date: "2024-04-30T09:30:00Z",
            state: "Inactive",
        },
        {
            id: 9,
            organizer: "Dr. White",
            name: "Dermatology Consultation",
            date: "2024-05-05T14:00:00Z",
            state: "Inactive",
        },
        {
            id: 10,
            organizer: "Dr. Green",
            name: "Neurology Appointment",
            date: "2024-05-06T10:00:00Z",
            state: "Cancelled",
        },
        {
            id: 11,
            organizer: "Dr. Khan",
            name: "MRI Scan",
            date: "2024-08-15T11:30:00Z",
            state: "Cancelled",
        },
        {
            id: 12,
            organizer: "Dr. Wong",
            name: "Colonoscopy",
            date: "2024-08-20T13:45:00Z",
            state: "Cancelled",
        },
    ],
};

function Homepage(props) {
    const [originalData, setOriginalData] = useState([]);
    useEffect(() => {
        setOriginalData(appointmentsData.appointments);
    }, []);
    // const fetchData = async () => {
    //     try {
    //         const config = {
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 Authorization: `JWT ${localStorage.getItem("access")}`,
    //             },
    //         };
    //         const response = await axios.get(
    //             "http://127.0.0.1:8000/api/",
    //             config
    //         );
    //         const data = response.data; // Use response.data instead of response.json()

    //         const currentDate = new Date();

    //         const updatedTableData = data.meets.map((meet) => {
    //             const meetDate = new Date(meet.deadline);
    //             const isActive = meetDate >= currentDate;

    //             // console.log("meet", meet);

    //             return {
    //                 id: meet.id,
    //                 organizer: meet.organizer,
    //                 name: meet.name,
    //                 date: meet.deadline,
    //                 state:
    //                     meet.is_active === 0
    //                         ? "Inactive"
    //                         : meet.is_active === 1
    //                         ? "Active"
    //                         : "Canceled",
    //             };
    //         });

    //         tableData.current = updatedTableData.sort((a, b) => {
    //             return new Date(b.date) - new Date(a.date);
    //         });

    //         setOriginalData(updatedTableData);
    //     } catch (error) {
    //         console.error("Error:", error);
    //     }
    // };

    // useEffect(() => {
    //     fetchData();
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);
    return (
        <>
            {props.isCreateModalOpen && (
                <CreateAppointment
                    createAppointmentModal={props.isCreateModalOpen}
                    handleCreateAppointment={props.handleCreateAppointment}
                />
            )}
            <div className={classes.container}>
                <div className={classes.topContainer}>
                    {/* <div style={{ "flex-direction": "row" }}> */}
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
                                className={classes.normal}
                                onClick={props.handleCreateAppointment}
                            >
                                New appointment
                            </button>
                        ) : (
                            <p>
                                Please, <a href="/login">login</a> to create an
                                appointment
                            </p>
                        )}
                    </div>
                    {/* </div> */}
                </div>
                <div className={classes.line} />
                <div className={classes.spliter}>
                    <div style={{ marginTop: "8.5rem" }} />
                    <AppointmentsList
                        tableData={appointmentsData}
                        originalData={originalData}
                        disabled={true}
                    />
                </div>
            </div>
        </>
    );
}

export default Homepage;
