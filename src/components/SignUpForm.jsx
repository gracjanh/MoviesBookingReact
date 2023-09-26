import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [isChecked, setIsChecked] = useState(false);

    const navigate = useNavigate();
    console.log(isChecked);

    const handleRegisterClick = (e) => {
        e.preventDefault();
        if (
            !firstName ||
            !lastName ||
            !password ||
            !confirmedPassword ||
            !isChecked ||
            password != confirmedPassword
        )
            return;

        // post on server
        fetch(`http://localhost:8081/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                password,
            }),
        })
            .then((res) => res.json())
            .then((data) => console.log(data))
            .catch((err) => console.log(err));
        navigate("/login");
    };

    return (
        <Form className="signup-form">
            <Form.Group className="mb-4">
                <Form.Control
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicEmail">
                <Form.Control
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-4">
                <Form.Control
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-4">
                <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-4">
                <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmedPassword}
                    onChange={(e) => setConfirmedPassword(e.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-4">
                <Form.Text className="text-light">
                    <Form.Check
                        type="checkbox"
                        id="default-checkbox"
                        label="I agree to the Terms and Conditions"
                        onClick={() => setIsChecked(!isChecked)}
                    />
                </Form.Text>
            </Form.Group>

            <div className="signup-form-btns">
                <Button
                    variant="outline-primary"
                    type="button"
                    onClick={() => navigate("/")}
                    className="signup-cancel-btn"
                >
                    Cancel
                </Button>
                <Button
                    variant="primary"
                    type="submit"
                    onClick={(e) => handleRegisterClick(e)}
                    className="signup-btn"
                >
                    Sign Up
                </Button>
            </div>
        </Form>
    );
};

export default SignUpForm;
