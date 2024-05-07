import React, { useEffect, useState } from "react";
import classes from "./AppointmentsList.module.css";
import Card from "../Card/Card";
import Button from "../Buttons/Button";
// import { appointmentDetailsContext } from "../../../contexts/appointment-details";
// import { ReloadHomepageContext } from "../../../contexts/reload-pages";

const ORDER_OPTIONS = ["Descending Date", "Ascending Date", "Appointment"];

function AppointmentsList(props) {
    const [searchInput, setSearchInput] = useState("");
    const [selectedOrder, setSelectedOrder] = useState("Descending Date");
    const [identifier, setIdentifier] = useState(0);
    const [appointmentInfo, setappointmentInfo] = useState({});
    const [showScrollButton, setShowScrollButton] = useState(false);

    // const {
    //     setappointmentInfo,
    //     appointmentDetailsVisible: visible,
    //     setappointmentDetailsModalVisible: setModalVisible,
    // } = useContext(appointmentDetailsContext);
    // const { setReload } = useContext(ReloadHomepageContext);

    useEffect(() => {
        console.log("props.tableData.current1", props.tableData.current);
        if (props.tableData.current) {
            console.log("props.tableData.current1", props.tableData.current);
            setappointmentInfo(
                props.tableData.current.find((row) => row.id === identifier)
            );
        }
    }, [identifier, props.tableData.current]);

    const handleScroll = () => {
        const scrollTop =
            document.documentElement.scrollTop || document.body.scrollTop;
        const shouldShowButton = scrollTop > 100; // Adjust this value as needed
        setShowScrollButton(shouldShowButton);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleOrderOptionClick = (option) => {
        props.tableData.current = props.tableData.current
            .filter(
                (row) =>
                    row.organizer
                        .toLowerCase()
                        .includes(searchInput.toLowerCase()) ||
                    row.name.toLowerCase().includes(searchInput.toLowerCase())
            )
            .sort((a, b) => {
                if (option === "Ascending Date") {
                    return new Date(a.date) - new Date(b.date);
                } else if (option === "Appointment") {
                    return a.name.localeCompare(b.name);
                } else {
                    return new Date(b.date) - new Date(a.date);
                }
            });
        setSelectedOrder(option);
    };

    const handleSearchInput = (word) => {
        const wordsInput = word.target.value.toLowerCase();

        setSearchInput(wordsInput);

        if (wordsInput === "") {
            // props.setTableData(props.originalData);
            props.tableData.current = props.originalData;
        } else {
            const tableFilter = props.originalData.filter(
                (appointmentFilter) => {
                    const compName = appointmentFilter.name.toLowerCase();
                    const compOrganizer =
                        appointmentFilter.organizer.toLowerCase();
                    const compDate = appointmentFilter.date.toLowerCase();
                    return (
                        compName.includes(wordsInput) ||
                        compOrganizer.includes(wordsInput) ||
                        compDate.includes(wordsInput)
                    );
                }
            );

            // props.setTableData(tableFilter);
            props.tableData.current = tableFilter;
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <>
            <div className={classes.header}>
                <div className={classes.titleContainer}>
                    <div className={classes.title}>
                        Informações da Competição
                    </div>
                </div>
                <div className={classes.buttonsContainer}>
                    <input
                        className={classes.buttonSearch}
                        placeholder="Pesquisar"
                        value={searchInput}
                        onChange={handleSearchInput}
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
                {props.tableData.current?.map((row) => (
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
                                    text={row.state}
                                    type="secondary"
                                    disabled={true}
                                />
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <button
                className={showScrollButton ? classes.scrollToTopButton : null}
                onClick={scrollToTop}
            >
                ↑
            </button>
        </>
    );
}

export default AppointmentsList;
