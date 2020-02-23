import React, { useState, useContext } from "react";
import { UserContext } from "../../Contexts/UserContext";
import { Link } from "react-router-dom";
import axios from "axios";
import { CampaignUrls } from "../../../constants/Urls";

import google from "../../../images/Icons/Google.png";
import facebook from "../../../images/Icons/Facebook.png";
import carouselImage from "../../../images/Icons/Carousel_image.png";
import carouselVideo from "../../../images/Icons/Carousel_video.png";
import image from "../../../images/Icons/Image.png";
import video from "../../../images/Icons/Video.png";
import text from "../../../images/Icons/Text.png";
import download from "../../../images/Icons/Download.png";

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
    console.log("FORMAT", format)
    return format;
}

async function downloadCampaign(token, id) {
    const endpoint = `${CampaignUrls.DEFAULT}download/${id}/`;
    const result = await axios.get(endpoint, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    const res = await result.data;
    return res;
}

const CampaignDetailItem = props => {
    const {...campaign} = props.campaign;
    const [token, setToken] = useContext(UserContext);

    const getDownload = (token, id) => {
        console.log(id)
        downloadCampaign(token, id)
        .then(response => {
            console.log(response);
        })
        .catch(err => {
            console.log("GET DOWNLOAD ERROR", err)
        })
    }

    return (
        <div className="uk-container uk-container-small">
            <div className="uk-panel">
                <div className="uk-margin-small-left uk-margin-small-right">
                    <div className="uk-margin">
                        <p className="small-meta uk-text-bold uk-margin-remove-bottom uk-text-uppercase">Your Campaign</p>
                        <p className="uk-h1 uk-margin-remove-vertical">{campaign.campaign_name}</p>
                    </div>
                    <div className="uk-grid-small uk-flex uk-flex-row uk-flex-top uk-margin-medium" data-uk-grid>
                        <div className="uk-width-auto uk-flex uk-flex-row">
                            <div className="uk-text-center uk-margin-medium-right">
                                {campaign.platform === "fb" ?
                                    <img
                                        src={facebook}
                                        alt="Network"
                                        />
                                    :
                                    <img
                                        src={google}
                                        alt="Network"
                                        />
                                }
                            </div>
                            <div className="uk-text-center">
                                <img
                                    src={getAdFormat(campaign.ad_format).image}
                                    alt="gig"
                                    />
                            </div>
                        </div>

                        <div className="uk-width-expand uk-margin-right uk-text-right">
                            <div style={{cursor: "pointer"}} className="uk-display-inline" onClick={(e) => {
                                getDownload(token, campaign.id)
                            }}>
                                <img
                                    src={download}
                                    alt="Download campaign files"
                                    />
                            </div>
                        </div>

                    </div>
                    <div className="uk-container uk-container-expand">
                        <p className="small-meta uk-text-bold uk-margin-remove-bottom uk-text-uppercase">Your Ad Sets</p>
                        <div className="uk-container uk-container-expand">
                            <div
                                className="uk-grid uk-grid-small uk-child-width-1-2"
                                data-uk-grid="masonry: true">
                            {campaign.adsets.map((ads, index) =>
                                <div key={`adset_${index}`}>
                                    <div className="uk-card uk-card-small uk-card-grey uk-box-shadow-medium uk-box-shadow-hover-large">
                                        <div className="uk-card-media-top">
                                            <img
                                                src={`https://app.orangeshark.xyz/custom_images/${ads.creative.images}`}
                                                alt={campaign.campaign_name}
                                                />
                                        </div>
                                        <div className="uk-card-body">
                                            {ads.creative.link_desc.split(",").map(item => item.trim()).map((description, index) =>
                                                <p key={index} className="uk-h4">
                                                    {description}
                                                </p>
                                            )}
                                            <p className="small-meta uk-text-bold uk-margin-remove-bottom uk-text-uppercase">Display Links</p>
                                            {ads.creative.display_links.split(",").map(item => item.trim()).map((url, index) =>
                                                <span key={index} className="uk-margin-small-right uk-margin-small-top">
                                                    {url}
                                                </span>
                                            )}
                                            <p className="small-meta uk-text-bold uk-margin-remove-bottom uk-text-uppercase">Target URLs</p>
                                            {ads.creative.target_urls.split(",").map(item => item.trim()).map((url, index) =>
                                                <span key={index} className="uk-margin-small-right uk-margin-small-top">
                                                    {url}
                                                </span>
                                            )}
                                            <p className="small-meta uk-text-bold uk-margin-remove-bottom uk-text-uppercase">Keywords</p>
                                            {ads.creative.keywords.split(",").map(item => item.trim()).map((keyword, index) =>
                                                <span key={index} className="uk-label uk-margin-small-right uk-margin-small-top">
                                                    {keyword}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CampaignDetailItem;
