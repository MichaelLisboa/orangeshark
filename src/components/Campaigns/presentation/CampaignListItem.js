import React from "react";
import { Link } from "react-router-dom";

import trash from "../../../images/Icons/Trash.png";
import viewed from "../../../images/Icons/View.png";

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

const getStatus = val => {
    let icon = "";
    switch (val) {
        case 1:
            icon = requested
            break
        case 2:
            icon = active
            break
        case 3:
            icon = closed
            break
        default:
            icon = requested
    }

    const status = () =>
        <img
            style={{maxHeight: "24px"}}
            className={val !== 1 ? "greyscale-icon" : null}
            src={icon}
            alt="val"
            />

    return status()
}

const CampaignListItem = ({ campaign}) => {
    return (
        <tr className="uk-table-middle">
            <td className="uk-table-expand uk-text-truncate">
                <Link className="uk-link-reset uk-link-text" to={`/campaign/${campaign.id}`}>
                    {campaign.campaign_name}
                </Link>
            </td>
            <td className="uk-text-center uk-width-auto">
                <img
                    style={{maxHeight: "24px"}}
                    src={campaign.platform === 1 ? facebook : google}
                    alt="Network"
                    />
                <small className="uk-display-block">{campaign.platform === 1 ? "Facebook" : "Google"}</small>
            </td>
            <td className="uk-text-center uk-width-auto">
                <img
                    style={{maxHeight: "24px"}}
                    src={getAdFormat(campaign.ad_format).image}
                    alt="Network"
                    />
                <small className="uk-display-block uk-text-nowrap">{getAdFormat(campaign.ad_format).label}</small>
            </td>
            <td className="uk-text-center uk-width-auto">
                {getStatus(campaign.creative_type)}
            </td>
            <td>
                <div className="uk-grid-small uk-child-width-1-2" data-uk-grid>
                <div>
                    <Link className="uk-link-reset uk-link-text" to={`/campaign/${campaign.id}`}>
                        <img
                            style={{maxHeight: "12px"}}
                            src={viewed}
                            alt="View"
                            data-uk-img
                            />
                    </Link>
                </div>
                <div>
                    <img
                        style={{maxHeight: "16px"}}
                        src={trash}
                        alt="View"
                        data-uk-img
                        />
                    </div>
                </div>
            </td>
        </tr>
    )
}
export default CampaignListItem;
