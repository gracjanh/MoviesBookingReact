import React, { useContext } from "react";
import Barcode from "react-barcode";
import { Modal, Button } from "react-bootstrap";
import { AppContext } from "../context";

const TicketModal = () => {
    const { ticketId, isTicketVisible, setIsTicketVisible } = useContext(AppContext);

    const handleCloseClick = () => {
        setIsTicketVisible(false);
    };
    return (
        <>
            <Modal show={isTicketVisible} centered size="xs" animation={false}>
                <Modal.Header>
                    <Modal.Title>Ticket</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Barcode value={ticketId} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleCloseClick}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default TicketModal;
