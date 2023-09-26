import React, { useContext } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import TicketModal from "./TicketModal";
import { AppContext } from "../context";
import { PayPalButton } from "react-paypal-button-v2";

const OrderModal = ({ title }) => {
    const {
        seats,
        setSeats,
        selectedSeats,
        setSelectedSeats,
        isOrderModalOpen,
        setIsOrderModalOpen,
        setTicketId,
        setIsTicketVisible,
    } = useContext(AppContext);

    const ticketPrice = 7.99;
    const totalPrice = ticketPrice * selectedSeats.length;

    // Generating ticket ID
    const generateTicketId = () => {
        const idLength = 20;
        const characters = "0123456789";
        let randomId = "";

        for (let i = 0; i < idLength; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            randomId += characters[randomIndex];
        }
        return randomId;
    };

    // Generating date YYYY-MM-DD
    const generateDate = () => {
        const day = new Date().getDate();
        const month = new Date().getMonth() + 1;
        const year = new Date().getFullYear();

        const date = `${year}-${month.toString().padStart(2, "0")}-${day
            .toString()
            .padStart(2, "0")}`;

        return date;
    };

    // Generating time HH:MM:SS
    const generateTime = () => {
        const seconds = new Date().getSeconds();
        const minutes = new Date().getMinutes();
        const hour = new Date().getHours();

        const time = `${hour.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

        return time;
    };

    // Making a purchase
    const handleSuccess = () => {
        setIsOrderModalOpen(false);
        setIsTicketVisible(true);

        // id - variable sent to the server
        // ticketId - variable displayed on UI
        const id = generateTicketId();
        setTicketId(id);

        const purchaseTime = generateTime();
        const purchaseDate = generateDate();

        const orderDescription = `Row/Seat: ${selectedSeats
            .map((item) => `${item.row}/${item.number}`)
            .join(", ")}`;

        const formattedTitle = title
            .split("_")
            .map((word) => {
                return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            })
            .join(" ");

        // Booking seats - sending data to the server
        fetch(`http://localhost:8081/${title}/update`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ selectedSeats }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                return;
            })
            .catch((err) => console.log(err));

        const updatedSeats = seats.map((rowSeats) =>
            rowSeats.map((seat) => ({
                ...seat,
                isTaken: seat.isSelected || seat.isTaken,
                isSelected: false,
            }))
        );

        // Making an order - sending data to the server
        fetch(`http://localhost:8081/orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                formattedTitle,
                id,
                purchaseTime,
                purchaseDate,
                orderDescription,
                totalPrice,
            }),
        })
            .then((res) => res.json())
            .then((data) => console.log(data))
            .catch((err) => console.log(err));

        setSeats(updatedSeats);
        setSelectedSeats([]);
    };

    return (
        <>
            <Modal show={isOrderModalOpen} centered size="xs" scrollable={true} animation={false}>
                <Modal.Header>
                    <Modal.Title>Order Summary</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table striped borderless={true} size="sm">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Row</th>
                                <th>Seat</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedSeats.map((item, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{item.row}</td>
                                        <td>{item.number}</td>
                                        <td>${ticketPrice}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                    <div className="total-text">Total: ${totalPrice}</div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        className="order-cancel-btn"
                        onClick={() => setIsOrderModalOpen(false)}
                    >
                        Cancel
                    </Button>
                    <PayPalButton
                        amount={totalPrice}
                        onSuccess={handleSuccess}
                        style={{
                            layout: "horizontal",
                            shape: "pill",
                            color: "silver",
                            label: "paypal",
                            height: 40,
                        }}
                    />
                </Modal.Footer>
            </Modal>
            <TicketModal />
        </>
    );
};

export default OrderModal;
