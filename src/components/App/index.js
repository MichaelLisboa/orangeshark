import React, { useState, useEffect } from "react";
import AppRoutes from "./AppRoutes";
import Navigation from "../Nav";

import "react-dates/lib/css/_datepicker.css"
import "../DatePicker/react_dates_overrides.css"

import "./App.css";
import "../UiKit/Uikit.css";

export default function App() {
    const [state, setState] = useState({});

    useEffect(
        () => {
            fetch('/');
        }, [state]
    )


    return (
        <>
        <Navigation />
        <AppRoutes />
        </>
    )
}
