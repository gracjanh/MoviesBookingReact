import React, { useContext } from "react";
import { Card, Button } from "react-bootstrap/";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { images } from "../../data";
import { AppContext } from "../context";

const MoviesPage = () => {
    const { userLoggedIn } = useContext(AppContext);
    const navigate = useNavigate();

    const handleLogOutClick = () => {
        navigate("/");
    };

    if (!userLoggedIn) {
        return <Navigate to="/" />;
    }

    return (
        <>
            <div className="top-container">
                <h2 className="hello-text">Hello {userLoggedIn.first_name}!</h2>
                <Button onClick={handleLogOutClick}>Log Out</Button>
            </div>
            <div className="movies-container">
                {images.map((image, i) => (
                    <Card className="movie-card" key={i}>
                        <Link to={`/${image.name}`}>
                            <div className="img-container">
                                <Card.Img className="img-poster" variant="top" src={image.url} />
                            </div>
                        </Link>
                    </Card>
                ))}
            </div>
        </>
    );
};

export default MoviesPage;
