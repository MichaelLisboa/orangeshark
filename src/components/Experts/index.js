import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";
import axios from "axios";
import { ProjectUrls } from "../../constants/Urls";

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
        <td className="uk-table-expand uk-text-truncate">
            <Link className="uk-link-reset uk-link-text" to={`/project/${gig.id}`}>
                <small style={{color: status.color}}>{gig.name}</small>
            </Link>
        </td>
        <td className="uk-preserve-width uk-text-right">
            <Link to={`/project/${gig.id}`}>
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

const Expert = props => {
    const [user,, token,] = useContext(UserContext);
    const [gigs, setGigs] = useState({});
    const [isLoading, setIsLoading] = useState(true);

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

    if (isLoading) {
        return (
            <div />
        )
    }

    return (
        <>
        <div className="uk-margin-xlarge-bottom">
        <div className="uk-panel content-container">
            <div className="uk-grid-collapse uk-heading-divider" data-uk-grid>
                <div className="uk-width-expand">
                    <p className="uk-h5">Your Gigs</p>
                </div>
                {gigs.length > 2 &&
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

export default Expert;
