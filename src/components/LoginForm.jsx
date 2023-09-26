import React, { useState, useContext, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context";

const LoginForm = () => {
    const { users, setUsers, setUserLoggedIn } = useContext(AppContext);

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLoginClick = (e) => {
        e.preventDefault();

        users.forEach((user) => {
            if (email != user.user_email || password != user.user_password) return;
            setUserLoggedIn(user);
            navigate("/movies");
        });
    };

    useEffect(() => {
        fetch("http://localhost:8081/users", {
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
                setUsers(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);
    return (
        <Form className="login-form">
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
                <Form.Text className="text-light">
                    Don't have an account?{"\u00A0"}
                    <span className="signup-text-span" onClick={() => navigate("/signup")}>
                        Sign up
                    </span>
                </Form.Text>
            </Form.Group>

            <div className="signup-form-btns">
                <Button
                    variant="outline-primary"
                    type="button"
                    onClick={() => navigate("/")}
                    className="login-cancel-btn"
                >
                    Cancel
                </Button>
                <Button
                    variant="primary"
                    type="submit"
                    className="login-btn"
                    onClick={(e) => handleLoginClick(e)}
                >
                    Log In
                </Button>
            </div>
        </Form>
    );
};

export default LoginForm;
