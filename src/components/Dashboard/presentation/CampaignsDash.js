import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../Contexts/UserContext";
import axios from "axios";
import { CampaignUrls } from "../../../constants/Urls";

import google from "../../../images/Icons/Google.png";
import facebook from "../../../images/Icons/Facebook.png";
import carouselImage from "../../../images/Icons/Carousel_image.png";
import carouselVideo from "../../../images/Icons/Carousel_video.png";
import image from "../../../images/Icons/Image.png";
import video from "../../../images/Icons/Video.png";
import text from "../../../images/Icons/Text.png";
import declined from "../../../images/Icons/Hate.png";
import requested from "../../../images/Icons/Accepted.png";
import active from "../../../images/Icons/Working.png";
import closed from "../../../images/Icons/Finish.png";
import danger from "../../../images/Icons/Danger.png";
import canceled from "../../../images/Icons/Hate.png";

const getAdFormat = val => {
    let format = {}
    switch(val) {
        case 1:
            format = {type: 'image', label: 'Single Image', image: image, color: "#8CB954"}
            break
        case 2:
            format = {type: 'video', label: 'Single Video', image: video, color: "#56A5DA"}
            break
        case 3:
            format = {type: 'carousel_image', label: 'Carousel Image', image: carouselImage, color: "#DA6136"}
            break
        case 4:
            format = {type: 'carousel_video', label: 'Carousel Video', image: carouselVideo, color: "#7666A8"}
            break
        case 5:
            format = {type: 'text', label: 'Text', image: text, color: "#F1B844"}
            break
        default:
            format = {}
    }
    return format;
}

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
                color: "#4AB0D7"
            }
    }

    const s = () =>
        <>
        <td className="uk-table-expand uk-table-middle uk-text-truncate">
            <p className="uk-text-truncate">
            <Link className="uk-link-reset uk-link-text" to={`/campaign/${gig.id}`}>
                <span>{gig.campaign_name}</span>
            </Link>
            </p>
        </td>
        <td className="uk-preserve-width uk-text-right">
            <div className="uk-grid-collapse uk-child-width-1-3" data-uk-grid>
            <Link to={`/campaign/${gig.id}`}>
                <img
                    src={gig.platform === 1 ? facebook : google}
                    alt="gig"
                    width="24"
                    />
            </Link>
            <Link to={`/campaign/${gig.id}`}>
                <img
                    src={getAdFormat(gig.ad_format).image}
                    alt="gig"
                    width="24"
                    />
            </Link>
            <Link to={`/campaign/${gig.id}`}>
                <img
                    src={status.icon}
                    alt="gig"
                    width="24"
                    />
            </Link>
            </div>
        </td>
        </>

    return s()
}

async function getCampaigns(token, page) {
    const endpoint = `${CampaignUrls.DEFAULT}`;
    const result = await axios.get(endpoint, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    const res = await result.data;
    return res;
}

const CampaignsDash = props => {
    const [token, setToken] = useContext(UserContext);
    const [campaigns, setCampaigns] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(
        () => {
            getCampaigns(token)
            .then(response => {
                setCampaigns(response.results);
                setIsLoading(false);
            })
            .catch(err => {
                console.log("GET DASHBOARD ERROR", err)
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
            <div className="uk-grid-collapse uk-padding-small uk-padding-remove-bottom uk-margin-small-bottom" data-uk-grid>
                <div className="uk-width-expand">
                    <h6 className="uk-text-uppercase">Your Campaigns</h6>
                </div>
                <div className="uk-width-auto uk-flex uk-flex-middle">
                    <p className="small-meta small-meta-caps">
                        <Link
                            to="/campaign/create"
                            className="uk-button uk-button-primary">
                            New Campaign
                        </Link>
                    </p>
                </div>
            </div>
            <div className="uk-card uk-card-default uk-card-small">
                <div className="uk-card-body">
                    <table className="uk-table uk-table-divider uk-table-justify uk-table-middle">
                        <tbody>
                        {campaigns
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
                <div className="uk-card-footer">
                    <Link className="uk-button uk-button-large uk-button-primary" to="/campaigns">See all campaigns</Link>
                </div>
            </div>
        </>
    );
}

export default CampaignsDash;
