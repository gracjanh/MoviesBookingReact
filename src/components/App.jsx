import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScreeningRoom from "../components/ScreeningRoom";
import MoviesPage from "./MoviesPage";
import { movieTitles } from "../../data";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import HomePage from "./HomePage";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/signup" element={<SignUpForm />} />
                <Route path="/movies" element={<MoviesPage />} />

                {movieTitles.map((title, index) => (
                    <Route
                        key={index}
                        path={`/${title}`}
                        element={<ScreeningRoom title={title} />}
                    />
                ))}
            </Routes>
        </Router>
    );
};

export default App;
