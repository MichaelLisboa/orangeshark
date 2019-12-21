import React, { useState, useContext } from "react";
import { UserContext } from "../../Contexts/UserContext";
import { Link } from "react-router-dom";
import CampaignStatus from "./CampaignStatus";
// import DeleteCampaign from "../DeleteCampaign";

const CampaignDetailItem = props => {
    const {...campaign} = props.campaign;
    const [user,,,] = useContext(UserContext);
    const [campaignStatus, setCampaignStatus] = useState(campaign.status);

    return (
        <div className="uk-container uk-container-small">
            <div className="uk-panel">
                <div className="uk-margin-small-left uk-margin-small-right">
                    Campaign header
                    <div className="uk-margin">
                        <p className="small-meta uk-text-bold uk-margin-remove-bottom uk-text-uppercase">The Pitch</p>
                        <p className="uk-h3 uk-margin-remove-vertical">{campaign.name}</p>
                    </div>
                    <div className="uk-margin">
                        <p className="small-meta uk-text-bold uk-margin-remove-bottom uk-text-uppercase">The Details</p>
                        <p className="uk-h3 uk-margin-remove-vertical">{campaign.brief}</p>
                    </div>
                    <div className="uk-margin">
                        <p className="small-meta uk-text-bold uk-margin-remove-bottom uk-text-uppercase">More Info</p>
                        <p className="uk-h3 uk-margin-remove-vertical">{campaign.info}</p>
                    </div>
                </div>
                <CampaignStatus
                    user={user}
                    campaign={campaign}
                    campaignStatus={campaignStatus}
                    setCampaignStatus={setCampaignStatus} />
            </div>
        </div>
    );
}

export default CampaignDetailItem;
