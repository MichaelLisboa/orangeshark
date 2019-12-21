import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import moment from "moment";

import "./Card.css";

const cardStyle = {
    card: {
        borderRadius: "4px"
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
            className={`uk-card uk-card-default uk-card-small uk-card-hover ${props.className}`}>
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
        <div style={cardStyle.body} className={`uk-card-body ${props.className}`}>
            <div className="uk-grid-collapse uk-flex-middle" data-uk-grid>
                {children}
            </div>
        </div>
    )
}

export const ProfileCardBody = props => {
    const current_user = JSON.parse(localStorage.user);
    return (
        <>
            <div className="uk-width-auto">
                <img className="uk-border-circle" width="100" height="100" alt="avatar" src={props.avatar} />
            </div>
            <div className="uk-width-expand">
                <h4 className="uk-margin-remove-bottom">{props.title}</h4>
                {props.subtitle && <p style={{color: "#fff", fontSize: "12px"}} className="uk-text-meta uk-margin-remove-vertical">{props.subtitle}</p>}
                <small style={{fontSize: "0.7em"}} className="uk-display-block uk-text-meta uk-margin-remove-vertical uk-padding-remove-vertical">Joined {moment(props.user.profile.created).fromNow()}</small>
                { props.user.id === current_user.id &&
                <div className="uk-width-1-1">
                    <NavLink
                        className="uk-button uk-button-small uk-button-default uk-margin-small-top"
                        to="/profile"
                    >
                    Edit
                    </NavLink>
                    <NavLink
                        className="uk-button uk-button-small uk-button-default uk-margin-small-top uk-margin-small-left"
                        to="/logout"
                    >
                    Logout
                    </NavLink>
                </div>
                }
            </div>
        </>
    )
}

export const DashboardCard = ({children, ...props}) => {
    return (
        <Card className="dash-card">
        <CardHeader>
            <div className="uk-grid-collapse" data-uk-grid>
                <div className="uk-width-expand uk-text-left">
                    <h5 className="uk-margin-remove">{props.title}</h5>
                </div>
                <div className="uk-width-auto uk-text-right panel-icons">
                    <NavLink
                        className="uk-icon-link"
                        data-uk-icon="icon: settings; ratio: 0.9"
                        to={props.path}
                    />
                </div>
            </div>
        </CardHeader>
        <CardBody>
            <div className="uk-width-1-1 uk-panel">
            {children}
            </div>
        </CardBody>
        </Card>
    )
}

DashboardCard.propTypes = {
    children: PropTypes.any,
    title: PropTypes.string,
    path: PropTypes.string,
};

// Card.propTypes = {
//     children: PropTypes.any,
//     highlight: PropTypes.string
// };
//
// CardHeader.propTypes = {
//     children: PropTypes.any,
//     title: PropTypes.string,
//     url: PropTypes.string
// };
//
// CardBody.propTypes = {
//     children: PropTypes.any
// };
//
// ProfileCardBody.propTypes = {
//     user: PropTypes.array,
//     title: PropTypes.string,
//     subtitle: PropTypes.string,
//     avatar: PropTypes.string,
// }
