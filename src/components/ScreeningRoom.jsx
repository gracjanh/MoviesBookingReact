import React, { useEffect, useContext } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, Navigate } from "react-router-dom";
import OrderModal from "./OrderModal";
import { AppContext } from "../context";
import Seats from "./Seats";

const ScreeningRoom = ({ title }) => {
    const {
        seats,
        setSeats,
        selectedSeats,
        setSelectedSeats,
        setIsOrderModalOpen,
        setIsModalOpen,
        userLoggedIn,
    } = useContext(AppContext);

    const navigate = useNavigate();

    // Getting data from the server
    useEffect(() => {
        fetch(`http://localhost:8081/${title}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Error");
                }
                return res.json();
            })
            .then((data) => {
                const updatedSeats = seats.map((rowSeats) =>
                    rowSeats.map((seat) => {
                        const matchingSeat = data.find(
                            (dbSeat) => dbSeat.row_no === seat.row && dbSeat.seat_no === seat.number
                        );
                        return {
                            ...seat,
                            isTaken: matchingSeat ? matchingSeat.is_booked === "true" : false,
                        };
                    })
                );
                setSeats(updatedSeats);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [title]);

    // Clearing all bookings - sending data to the server
    const handleCancelClick = () => {
        fetch(`http://localhost:8081/${title}/cancel`, {
            method: "PUT",
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                const updatedSeats = seats.map((rowSeats) =>
                    rowSeats.map((seat) => ({
                        ...seat,
                        isTaken: false,
                    }))
                );
                setSeats(updatedSeats);
            })
            .catch((err) => console.log(err));

        setSelectedSeats([]);
        setIsModalOpen(false);
    };

    // Showing order summary
    const handleBuyClick = () => {
        if (selectedSeats.length === 0) return;
        setIsOrderModalOpen(true);
    };

    const handleBackClick = () => {
        setSelectedSeats([]);

        const seatsCopy = seats.map((rowSeats) =>
            rowSeats.map((seat) => ({
                ...seat,
                isSelected: false,
            }))
        );

        setSeats(seatsCopy);
        navigate("/movies");
    };

    if (!userLoggedIn) {
        return <Navigate to="/" />;
    }

    return (
        <div className="main-container">
            {/* SCREEN */}
            <Button variant="secondary" className="screen">
                SCREEN
            </Button>

            {/* ROWS AND SEATS */}
            <div className="seats-container">
                <Seats />
            </div>

            {/* BUTTONS */}
            <div className="btns-container">
                <Button
                    type="button"
                    variant="outline-primary"
                    className="btn-back"
                    onClick={handleBackClick}
                >
                    Back
                </Button>
                <Button
                    type="button"
                    variant="primary"
                    className="btn-buy"
                    onClick={handleBuyClick}
                >
                    Buy
                </Button>
                {/* <Button
                    type="button"
                    variant="outline-primary"
                    className="btn-cancel"
                    onClick={() => setIsModalOpen(true)}
                >
                    Cancel All Bookings
                </Button> */}
            </div>

            {/* MODALS */}
            {/* <CancelModal handleCancelClick={handleCancelClick} /> */}
            <OrderModal title={title} />
        </div>
    );
};

export default ScreeningRoom;
