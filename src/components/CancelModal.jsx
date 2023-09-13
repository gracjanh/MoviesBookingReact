import React, { useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import { AppContext } from "../context";

const CancelModal = ({ handleCancelClick }) => {
    const { isModalOpen, setIsModalOpen } = useContext(AppContext);
    return (
        <Modal show={isModalOpen} centered size="sm">
            <Modal.Header>
                <Modal.Title>Are you sure you want to clear all bookings?</Modal.Title>
            </Modal.Header>
            <Modal.Body>This action will cause data loss.</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCancelClick}>
                    Yes
                </Button>
                <Button variant="primary" onClick={() => setIsModalOpen(false)}>
                    No
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CancelModal;
