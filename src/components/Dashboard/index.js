import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";
import axios from "axios";
import { CampaigntUrls } from "../../constants/Urls";

import Data from "./Data";

import requested from "../../images/Icons/Requested.png";
import active from "../../images/Icons/Working.png";
import closed from "../../images/Icons/Finish.png";
import canceled from "../../images/Icons/Danger.png";
import declined from "../../images/Icons/Decline.png";

const gigStatus = gig => {
    let status = "";
    switch (gig.status) {
        case 'accepted':
            status = {
                icon: active,
                color: "#4AB0D7"
            }
            break
        case 'declined':
            status = {
                icon: declined,
                color: "#EC5957"
            }
            break
        case 'closed':
            status = {
                icon: closed,
                color: "#8BC34A"
            }
            break
        case 'canceled':
            status = {
                icon: canceled,
                color: "#EC5957"
            }
            break
        default:
            status = {
                icon: requested,
                color: "#F5A22E"
            }
    }

    const s = () =>
        <>
        <td className="uk-table-expand uk-table-middle uk-text-truncate">
            <Link className="uk-link-reset uk-link-text" to={`/campaign/${gig.id}`}>
                <p className="uk-text-truncate" style={{color: status.color}}>{gig.name}</p>
            </Link>
        </td>
        <td className="uk-preserve-width uk-text-right">
            <Link to={`/campaign/${gig.id}`}>
                <img
                    src={status.icon}
                    alt="gig"
                    width="16"
                    />
            </Link>
        </td>
        </>

    return s()
}

async function getProjects(token) {
    // const endpoint = `${ProjectUrls.DEFAULT}`;
    const result = await Data
    const res = await result;
    return res;
}

const Dashboard = props => {
    const [token,] = useContext(UserContext);
    const [gigs, setGigs] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(
        () => {
            getProjects(token)
            .then(response => {
                setGigs(response);
                setIsLoading(false);
            })
            .catch(err => {
                console.log("GET DASHBOARD ERROR", err)
            })
        }, []
    )

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

    if (isLoading) {
        return (
            <div />
        )
    }

    return (
        <>
        <div className="uk-container uk-container-small" data-uk-height-viewport="offset-top: true; offset-bottom: 8.5">
            <h1 className="uk-margin-large-top">Hi, {homeTitle()}</h1>
            <div className="uk-grid-collapse uk-padding-small uk-padding-remove-bottom uk-margin-small-bottom" data-uk-grid>
                <div className="uk-width-expand">
                    <h6 className="uk-text-uppercase">Your Campaigns</h6>
                </div>
                {gigs.length > 3 &&
                    <div className="uk-width-auto uk-flex uk-flex-middle">
                        <p className="small-meta small-meta-caps">
                            <Link className="uk-link-reset" to="/campaigns">See all campaigns</Link>
                        </p>
                    </div>
                }
            </div>
            <div className="uk-card uk-card-default uk-card-small">
                <div className="uk-card-body">
                    <table className="uk-table uk-table-small uk-table-divider uk-table-justify uk-table-middle">
                        <tbody>
                        {gigs
                        .sort((a, b) =>
                            new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
                        )
                        .slice(0, 5)
                        .map((gig, id) => {
                            return (
                                <tr key={id} className="uk-table-middle">
                                    {gigStatus(gig)}
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </>
    );
}

export default Dashboard;
