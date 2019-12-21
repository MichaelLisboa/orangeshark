import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import CampaignStatusForm from "./CampaignStatusForm";

const CampaignStatus = ({user, campaign, campaignStatus, setCampaignStatus}) => {
    return (
        <>
            <div className="uk-margin">
            {user.profile.group === "member" ?
                campaign.expert && user.id !== campaign.expert.profile.user_id && campaignStatus === "accepted" ?
                    <p className="uk-text-muted">
                        Accepted by <Link
                            to={`/user/${campaign.expert.profile.user_id}`}>
                            {campaign.expert.profile.first_name} {campaign.expert.profile.last_name}
                        </Link>
                    </p>
                    :
                    <div className="uk-text-center">
                        <Link
                            to={`/profile`}
                            className="uk-button uk-button-default">
                                Find an expert
                        </Link>
                    </div>
                :
                    campaign.expert && user.id === campaign.expert.profile.user_id && campaignStatus !== "created" &&
                    <CampaignStatusForm campaignStatus={campaignStatus} setCampaignStatus={setCampaignStatus} campaign={campaign} />
            }
            </div>
        </>
    );
}

export default CampaignStatus;
