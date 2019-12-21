import React from "react";
import AppRoutes from "./AppRoutes";
import Navigation from "../Nav";
import Footer from "../Footer";

import "react-dates/lib/css/_datepicker.css"
import "../DatePicker/react_dates_overrides.css"

import "../../css/uikit.min.css";
import "./App.css";
import "../UiKit/Uikit.css";

export default function App() {
    return (
        <>
        <Navigation />
        <AppRoutes />
        <Footer />
        </>
    )
}
