import React from "react";
import CampaignListItem from "./presentation/CampaignListItem";

const List = props => {
    if (props.isLoading) {
        return (
            <div />
        )
    }

    const user = props.user;
    const campaignsArray = props.campaigns;
    const campaignNodes = campaignsArray
        .sort((a, b) =>
            new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
        )
        .map(item => {
            return (
                <div className="uk-container uk-container-small">
                    <div className="uk-child-width-1-2@s uk-grid-small uk-grid-match" data-uk-grid>
                        <CampaignListItem
                            key={item.slug}
                            campaign={item}
                            user={user}
                        />
                    </div>
                </div>
            )
        });

    return campaignNodes;
}

export default List;
