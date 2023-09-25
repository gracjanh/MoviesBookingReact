import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <>
            <Button type="button" onClick={() => navigate("/login")}>
                Log In
            </Button>

            <Button
                type="button"
                onClick={() => navigate("/signup")}
                style={{ marginLeft: "0.5rem" }}
            >
                Sign Up
            </Button>
        </>
    );
};

export default HomePage;
