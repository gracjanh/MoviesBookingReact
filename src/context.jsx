import { createContext, useState } from "react";

export const AppContext = createContext("");

export const AppProvider = ({ children }) => {
    const numRows = 10;
    const seatsPerRow = 15;

    const initialState = Array.from({ length: numRows }, (_, rowIndex) =>
        Array.from({ length: seatsPerRow }, (_, seatIndex) => ({
            row: rowIndex + 1,
            number: seatIndex + 1,
            isTaken: false,
            isSelected: false,
        }))
    );

    const [seats, setSeats] = useState(initialState);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [ticketId, setTicketId] = useState("");
    const [isTicketVisible, setIsTicketVisible] = useState(false);

    return (
        <AppContext.Provider
            value={{
                seats,
                setSeats,
                selectedSeats,
                setSelectedSeats,
                isOrderModalOpen,
                setIsOrderModalOpen,
                isModalOpen,
                setIsModalOpen,
                ticketId,
                setTicketId,
                isTicketVisible,
                setIsTicketVisible,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
