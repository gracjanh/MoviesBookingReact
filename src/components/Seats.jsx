import React, { useContext } from "react";
import { AppContext } from "../context";
import SingleSeat from "./SingleSeat";
import { Button } from "react-bootstrap";

const Seats = () => {
    const { seats } = useContext(AppContext);

    return (
        <>
            {seats.map((rowSeats, rowIndex) => {
                return (
                    <div key={rowIndex} className="row-container">
                        {/* LEFT ROWS */}
                        <Button variant="outline-light" className="row-number">
                            {rowIndex + 1}
                        </Button>

                        {/* SEATS */}
                        <div className="row-seats">
                            {rowSeats.map((seat, index) => {
                                return (
                                    <React.Fragment key={index}>
                                        <SingleSeat seat={seat} />
                                        {seat.number % 15 === 0 && <div />}
                                    </React.Fragment>
                                );
                            })}
                        </div>

                        {/* RIGHT ROWS */}
                        <Button variant="outline-light" className="row-number">
                            {rowIndex + 1}
                        </Button>
                    </div>
                );
            })}
        </>
    );
};

export default Seats;
