import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./components/App.jsx";
import { AppProvider } from "./context";

ReactDOM.createRoot(document.getElementById("root")).render(
    <AppProvider>
        <App />
    </AppProvider>
);
