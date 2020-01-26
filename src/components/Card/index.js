import React from "react";
import { NavLink } from "react-router-dom";

import "./Card.css";

const cardStyle = {
    card: {
        borderRadius: "4px",
        minHeight: "550px",
        opacity: "0.95"
    },
    highlight: {
        borderRadius: "4px",
        borderTop: "#bfabf5 4px solid"
    },
    header: {
        paddingTop: "10px",
        paddingBottom:"10px",
        margin: "0",
        borderStyle: "none"
    },
    body: {
        paddingTop: "2px"
    },
    footer: {
        padding: "0 10px",
        borderStyle: "none",
        fontSize: "11px"
    },
    smallMeta: {
        fontSize: "10px"
    }
}

export const Card = ({children, ...props}) => {
    return (
        <div
            style={cardStyle.card}
            className={`uk-card uk-card-small uk-card-default uk-margin ${props.className}`}>
            {children}
        </div>
    )
}

export const CardHeader = ({children, ...props}) =>
    <div className={`uk-card-header ${props.className}`}>
        <div className="uk-grid uk-grid-collapse">
            <div className="uk-width-expand uk-text-left">
            {children}
            {props.title && <div><p className="uk-h5">{props.title}</p></div>}
            </div>
            {props.url &&
            <div className="uk-width-auto uk-text-right panel-icons">
                <NavLink
                    className="uk-icon-link"
                    data-uk-icon="icon: cog; ratio: 0.75"
                    to={props.url}
                />
            </div>
            }
        </div>
    </div>

export const CardBody = ({children, ...props}) => {
    return (
        <div className={`uk-card-body ${props.className}`}>
            {children}
        </div>
    )
}

export const CardFooter = ({children, ...props}) => {
    return (
        <div className={`uk-card-footer uk-position-bottom ${props.className}`}>
            {children}
        </div>
    )
}
