import React from "react";
import { NavLink } from "react-router-dom";

export const Button = ({children, ...props}) =>
    <button type={props.type}
        className={`uk-button uk-border-pill ${props.className}`}>
        {children}
    </button>

export const AnchorButton = ({children, ...props}) =>
    <NavLink
        to={props.path}
        className={`uk-button uk-border-pill ${props.className}`}>
        {children}
    </NavLink>
