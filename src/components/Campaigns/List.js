import React from "react";
import CampaignListItem from "./presentation/CampaignListItem";

const List = props => {
    if (props.isLoading) {
        return (
            <div />
        )
    }

    const campaignsArray = props.campaigns;
    const campaignNodes = campaignsArray
        .map((item, index) => {
            return (

                            <CampaignListItem
                                key={index}
                                campaign={item}
                            />
            )
        });

    return campaignNodes;
}

export default List;
