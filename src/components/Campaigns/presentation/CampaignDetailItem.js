import React, { useState, useContext } from "react";
import { UserContext } from "../../Contexts/UserContext";
import { Link } from "react-router-dom";
// import DeleteCampaign from "../DeleteCampaign";

import google from "../../../images/Icons/Google.png";
import facebook from "../../../images/Icons/Facebook.png";
import carouselImage from "../../../images/Icons/Carousel_image.png";
import carouselVideo from "../../../images/Icons/Carousel_video.png";
import image from "../../../images/Icons/Image.png";
import video from "../../../images/Icons/Video.png";
import text from "../../../images/Icons/Text.png";

const CampaignDetailItem = props => {
    const {...campaign} = props.campaign;
    const [token, setToken] = useContext(UserContext);
    console.log("DETAIL VIEW", campaign)
    // const [campaignStatus, setCampaignStatus] = useState(campaign.status);

    return (
        <div className="uk-container uk-container-small">
            <div className="uk-panel">
                <div className="uk-margin-small-left uk-margin-small-right">
                    <div className="uk-margin">
                        <p className="small-meta uk-text-bold uk-margin-remove-bottom uk-text-uppercase">Your Campaign</p>
                        <p className="uk-h1 uk-margin-remove-vertical">{campaign.campaign_name}</p>
                    </div>
                    <div className="uk-margin">
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
                        <h4
                            style={{color: campaign.platform === "fb" ? "#56A5DA" : "#DA6136"}}
                            className="uk-margin-small">{campaign.platform === "fb" ? "Facebook": "Google"}
                        </h4>
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
