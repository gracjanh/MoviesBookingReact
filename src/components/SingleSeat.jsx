import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { AppContext } from "../context";

const SingleSeat = ({ seat }) => {
    const { seats, selectedSeats, setSelectedSeats, setSeats } = useContext(AppContext);

    const handleClick = () => {
        if (!seat.isTaken || seat.isSelected) {
            seatClick(seat.row, seat.number);
        }
    };

    // Choosing a seat
    const seatClick = (row, number) => {
        const seatsCopy = [...seats];
        const seat = seatsCopy[row - 1][number - 1];

        seat.isSelected = !seat.isSelected;

        if (seat.isSelected) {
            setSelectedSeats([...selectedSeats, { row: row, number: number }]);
        } else {
            setSelectedSeats(
                selectedSeats.filter(
                    (selectedSeat) => !(selectedSeat.row === row && selectedSeat.number === number)
                )
            );
        }
        setSeats(seatsCopy);
    };

    return (
        <Button
            variant={seat.isTaken ? "danger" : seat.isSelected ? "success" : "outline-success"}
            className="seat"
            onClick={handleClick}
            disabled={seat.isTaken && !seat.isSelected}
        >
            {seat.number}
        </Button>
    );
};

export default SingleSeat;
