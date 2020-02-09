import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";
import CampaignsDash from "./presentation/CampaignsDash";
import MediaDash from "./presentation/MediaDash";
import axios from "axios";

const Dashboard = props => {
    const [token, setToken] = useContext(UserContext);

    const homeTitle = () => {
        const title = [
            `what's good?`,
            `how's it going?`,
            `here's what's new`,
            `welcome back`,
            `feeling creative?`
        ]
        const msg = Math.floor(Math.random()*title.length);
        return title[msg];
    }

    return (
        <>
        <div className="uk-container uk-container-small" data-uk-height-viewport="offset-top: true; offset-bottom: 8.5">
            <h1 className="uk-margin-large-top">Hi, {homeTitle()}</h1>
            <CampaignsDash />
            <MediaDash />
        </div>
        </>
    );
}

export default Dashboard;
