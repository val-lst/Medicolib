import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { accountService } from "../users/Authentification/Sessionstorage";
import moment from 'moment';
import 'moment/locale/fr';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { useLocation } from "react-router-dom";

import './assets/doctorCardBooking.css'

const DoctorCardBooking = ({ firstname, lastname }) => {
    let mail = accountService.getEmail();

    const [appointmentList, setAppointmentList] = useState([]);
    const [selectedWeek, setSelectedWeek] = useState(new Date());
    const [showElement, setShowElement] = useState(false);
    const [showButton, setShowButton] = useState(true);

    const navigate = useNavigate();
    const location = useLocation();

    const name = firstname + "-" + lastname;

    useEffect(() => {
        axios.get(`/${name}/booking`).then((res) => {
            const newData = res.data;
            const tmp = newData;
            const filteredData = tmp.filter(appointment => appointment[5] === "false");
            filteredData.sort((a, b) => {
                const dateA = new Date(a[2]);
                const dateB = new Date(b[2]);
                return dateA - dateB;
            });
            filteredData.filter(appointment => appointment[5] === "false").sort((a, b) => {
                const dateA = new Date(a[2]);
                const dateB = new Date(b[2]);
                return dateA - dateB;
            });
            setAppointmentList(newData);
            setSelectedWeek(new Date(filteredData[0][2]))
        })
            .catch((error) => {
                console.log(error)

            });
    }, [name]);

    const onClick = (id) => {
        if (!accountService.isLogged()) {
            navigate("/login", { state: { prevS: location.pathname, prevA: location.search } });
        } else {
            axios
                .post("/makeappointment", { id, mail })
                .then((response) => {
                    navigate("/patient/appointments");
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    const weekStart = new Date(selectedWeek);
    weekStart.setDate(weekStart.getDate());

    const weekEnd = new Date(selectedWeek);
    weekEnd.setDate(selectedWeek.getDate() - selectedWeek.getDay() + 6);

    const weekDays = [];
    for (let i = 0; i < 7; i++) {
        const day = new Date(weekStart);
        day.setDate(weekStart.getDate() + i);
        if (day.getDay() !== 0 && day.getDay() !== 6) {
            weekDays.push(day);
        }
    }

    const groupedAppointments = {};
    appointmentList.forEach((appointment) => {
        const date = new Date(appointment[2]);
        const dateKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
        if (!groupedAppointments[dateKey]) {
            groupedAppointments[dateKey] = [];
        }
        groupedAppointments[dateKey].push(appointment);
    });

    const displayElement = () => {
        setShowElement(true);
        setShowButton(false);
    }

    return (
        <div className="doctor-card-booking">
            <table className="card-booking-table">
                <thead>
                    <tr>
                        <td>
                            <button className="button-week-left" onClick={() => {
                                const date = new Date();
                                if (selectedWeek.getTime() - 7 >= date.getTime()) {
                                    setSelectedWeek(new Date(selectedWeek.getFullYear(), selectedWeek.getMonth(), selectedWeek.getDate() - 7))
                                }
                            }}>
                                <FontAwesomeIcon icon={faAngleLeft} />
                            </button>
                        </td>
                        {weekDays.map((day) => (
                            <th key={day}>
                                <p className="day">{moment(day).format('dddd')}</p>
                                <br />
                                <p className="day-month">{moment(day).format('D MMM')}</p>
                            </th>
                        ))}
                        <td>
                            <button className="button-week-right" onClick={() =>
                                setSelectedWeek(new Date(selectedWeek.getFullYear(), selectedWeek.getMonth(), selectedWeek.getDate() + 7))
                            }>
                                <FontAwesomeIcon icon={faAngleRight} />
                            </button>
                        </td>

                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td></td>
                        {weekDays.map((day, indexD) => (
                            <td key={indexD} className="cell-day">
                                {groupedAppointments[`${day.getFullYear()}-${day.getMonth()}-${day.getDate()}`]?.filter(appointment => appointment[5] === "false").slice(0, 4).map((appointment, index) => (
                                    <div key={index}>
                                        <button className={appointment[5] === "false" ? "not-booked" : "booked"} onClick={() => {
                                            if (appointment[5] === "false") {
                                                onClick(appointment[0]);
                                            }
                                        }}>
                                            <div>
                                                <p>{appointment[3]}</p>
                                            </div>
                                        </button>
                                    </div>
                                ))}
                                {showElement && groupedAppointments[`${day.getFullYear()}-${day.getMonth()}-${day.getDate()}`]?.filter(appointment => appointment[5] === "false").slice(4, groupedAppointments.length).map((appointment, index) => (
                                    <div key={index}>
                                        <button className={appointment[5] === "false" ? "not-booked" : "booked"} onClick={() => {
                                            if (appointment[5] === "false") {
                                                onClick(appointment[0]);
                                            }
                                        }}>
                                            <div>
                                                <p>{appointment[3]}</p>
                                            </div>
                                        </button>
                                    </div>
                                ))}
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>
            {showButton && <button className="rdv-button" onClick={displayElement}>Voir plus d'horaires</button>}
        </div>
    );
};


export default DoctorCardBooking; 