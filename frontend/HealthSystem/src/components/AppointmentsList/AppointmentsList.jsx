import React, { useEffect, useState } from "react";
import classes from "./AppointmentsList.module.css";
import Card from "../Card/Card";
import Button from "../Buttons/Button";

const ORDER_OPTIONS = [
    "Default",
    "Descending Date",
    "Ascending Date",
    "Appointment",
];

function AppointmentsList(props) {
    const [selectedOrder, setSelectedOrder] = useState("Default");
    const [showScrollButton, setShowScrollButton] = useState(false);

    // scroll to top
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition =
                document.documentElement.scrollTop || document.body.scrollTop;
            const windowHeight = window.innerHeight;
            const documentHeight = Math.max(
                document.body.scrollHeight,
                document.body.offsetHeight,
                document.documentElement.clientHeight,
                document.documentElement.scrollHeight,
                document.documentElement.offsetHeight
            );
            const distanceFromBottom =
                documentHeight - (scrollPosition + windowHeight);
            const listHeight = document.querySelector(
                `.${classes.table}`
            ).offsetHeight;
            const isNearTop = scrollPosition <= 50;
            const shouldShowButton =
                distanceFromBottom <= listHeight - 50 &&
                !isNearTop &&
                documentHeight > windowHeight;
            setShowScrollButton(shouldShowButton);
        };

        const handleContentVisibility = () => {
            const listHeight = document.querySelector(
                `.${classes.table}`
            ).offsetHeight;
            const windowHeight = window.innerHeight;
            setShowScrollButton(listHeight >= windowHeight);
        };

        window.addEventListener("scroll", handleScroll);
        handleContentVisibility(); // Check initial content visibility
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    // const handleOrderOptionClick = (option) => {
    //     props.tableData.current = props.tableData.current
    //         .filter((row) => row.organizer.toLowerCase().includes(""))
    //         .sort((a, b) => {
    //             if (option === "Ascending Date") {
    //                 return new Date(a.date) - new Date(b.date);
    //             } else if (option === "Appointment") {
    //                 return a.name.localeCompare(b.name);
    //             } else if (option === "Descending Date") {
    //                 return new Date(b.date) - new Date(a.date);
    //             } else {
    //                 // use the original values - Descending dates without the cancelled ones
    //                 return a.id - b.id;
    //             }
    //         });
    //     setSelectedOrder(option);
    // };

    const handleOrderOptionClick = (option) => {
        const sortedData = [...props.tableData].sort((a, b) => {
            if (option === "Ascending Date") {
                return new Date(a.date) - new Date(b.date);
            } else if (option === "Appointment") {
                return a.name.localeCompare(b.name);
            } else if (option === "Descending Date") {
                return new Date(b.date) - new Date(a.date);
            } else {
                return a.id - b.id;
            }
        });
        props.setTableData(sortedData);
        setSelectedOrder(option);
    };

    return (
        <>
            <div className={classes.header}>
                <div className={classes.titleContainer}>
                    <div className={classes.title}>
                        Appointments Information
                    </div>
                </div>
                <div className={classes.buttonsContainer}>
                    <input
                        className={classes.buttonSearch}
                        placeholder="Pesquisar"
                        value={props.searchInput}
                        onChange={props.handleSearchInput}
                    ></input>
                    <div className={classes.dropdown}>
                        <div className={classes.buttonDropdown}>
                            <div className={classes.text}>
                                Order by: {selectedOrder}
                            </div>
                        </div>
                        <div className={classes.listDropdown}>
                            {ORDER_OPTIONS.map((option) => (
                                <button
                                    key={option}
                                    onClick={() =>
                                        handleOrderOptionClick(option)
                                    }
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className={classes.table}>
                <div className={classes.tableRow + " " + classes.tableHeader}>
                    <div className={classes.tableRowHeader}>
                        <div
                            className={
                                classes.tableCellHeader +
                                " " +
                                classes.organizerColumn
                            }
                        >
                            DOCTOR
                        </div>
                        <div
                            className={
                                classes.tableCellHeader +
                                " " +
                                classes.nameColumn
                            }
                        >
                            APPOINTMENT
                        </div>
                        <div
                            className={
                                classes.tableCellHeader +
                                " " +
                                classes.dateColumn
                            }
                        >
                            DATE
                        </div>
                        <div
                            className={
                                classes.tableCellHeader +
                                " " +
                                classes.stateColumn
                            }
                        >
                            STATUS
                        </div>
                    </div>
                </div>
                {props.tableData.map((row) => (
                    <div key={row.id} className={classes.tableRow}>
                        <div
                            className={
                                classes.tableCell +
                                " " +
                                classes.organizerColumn
                            }
                        >
                            <div className={classes.text}>{row.organizer}</div>
                        </div>
                        <div
                            className={
                                classes.tableCell + " " + classes.nameColumn
                            }
                        >
                            <div className={classes.appointmentContainer}>
                                <div className={classes.appointmentText}>
                                    {row.name}
                                </div>
                            </div>
                        </div>
                        <div
                            className={
                                classes.tableCell + " " + classes.dateColumn
                            }
                        >
                            <div className={classes.text}>{row.date}</div>
                        </div>
                        <div
                            className={
                                classes.tableCell + " " + classes.stateColumn
                            }
                        >
                            {row.state === "Active" ? (
                                <Button text={row.state} disabled={true} />
                            ) : (
                                <Button
                                    text={row.state} // TODO verify date and time and if it is paid or not and change the button text accordingly
                                    type="secondary"
                                    disabled={true}
                                />
                            )}
                        </div>
                    </div>
                ))}
            </div>
            {showScrollButton && (
                <button
                    className={classes.scrollToTopButton}
                    onClick={scrollToTop}
                >
                    ↑
                </button>
            )}
        </>
    );
}

export default AppointmentsList;
