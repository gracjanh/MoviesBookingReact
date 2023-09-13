import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScreeningRoom from "../components/ScreeningRoom";
import HomePage from "./HomePage";
import { movieTitles } from "../../data";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />

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
