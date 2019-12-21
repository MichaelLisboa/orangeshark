import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import history from "../../lib/historyUtils";
import { UserContext } from "../Contexts/UserContext";
import { ProjectUrls } from "../../constants/Urls";

import pending from "../../images/Icons/Hate.png";
import requested from "../../images/Icons/Hate.png";
import active from "../../images/Icons/Working.png";
import closed from "../../images/Icons/Finish.png";
import canceled from "../../images/Icons/Danger.png";

const gigStatus = gig => {
    let icon = "";
    switch (gig) {
        case 'requested':
            icon = requested
            break
        case 'accepted':
            icon = active
            break
        case 'closed':
            icon = closed
            break
        default:
            icon = pending
    }

    const status = () =>
        <img
            className={gig !== "accepted" ? "greyscale-icon" : null}
            src={icon}
            alt="gig"
            width="16"
            />

    return status()
}

async function getProjects(id, token) {
    const endpoint = `${ProjectUrls.DEFAULT}`;;
    const result = await axios.get(endpoint, {
            headers: {
                authorization: `Token ${token}`
            }
        })
    const res = await result.data;
    return res;
}

const Member = props => {
    const [user, setUser, token, setToken] = useContext(UserContext);
    const [isProfileComplete, setIsProfileComplete] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [gigs, setGigs] = useState({});

    useEffect(
        () => {
            getProjects(user.id, token)
            .then(response => {
                setGigs(response);
                setIsLoading(false);
            })
            .catch(err => {
                console.log("GET USER RESPONSE", err)
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

        <div className="uk-margin-xlarge-bottom">
        <div className="uk-panel content-container">
            <h1>Hi {user.first_name}<br />{homeTitle()}</h1>
            <div className="uk-grid-collapse uk-heading-divider" data-uk-grid>
                <div className="uk-width-expand">
                    <p className="uk-h5">Your Gigs</p>
                </div>
                {gigs.length > 3 &&
                    <div className="uk-width-auto uk-flex uk-flex-middle">
                        <p className="small-meta small-meta-caps">
                            <Link className="uk-link-reset" to="/projects">See all gigs</Link>
                        </p>
                    </div>
                }
            </div>
            <div className="">
                <table className="uk-table uk-table-small uk-table-divider uk-table-justify">
                    <tbody>
                    {gigs
                    .sort((a, b) =>
                        new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
                    )
                    .slice(0, 3)
                    .map((gig, id) => {
                        return (
                            <tr key={id} className="uk-table-middle">
                                <td className="uk-table-expand uk-text-truncate">
                                    <Link className="uk-link-reset uk-link-text" to={`/project/${gig.id}`}>
                                        <small className={gig.status === "accepted" ? "uk-text-primary" : "uk-text-muted"}>{gig.name}</small>
                                    </Link>
                                </td>
                                <td className="uk-preserve-width uk-text-right">
                                    <Link to={`/project/${gig.id}`}>
                                        {gigStatus(gig.status)}
                                    </Link>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </div>
        </div>
    );
}

export default Member;
