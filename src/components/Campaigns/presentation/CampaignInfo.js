import React from "react";
import moment from "moment";

import business from "../../../images/Business.png";
import calendar from "../../../images/Calendar.png";
import location from "../../../images/Location.png";

export const CampaignInfo = ({props}) => {
    return (
        <div className="project-info uk-container uk-container-small">
            <div className="small-meta uk-grid-collapse uk-text-nowrap uk-child-width-1-3 uk-margin-small-top uk-padding-remove" data-uk-grid>
                <div className="uk-text-center">
                    <img alt="location" src={location} />
                    <small className="uk-display-block">{props.region}</small>
                </div>
                <div className="uk-text-center">
                    <img alt="calendar" src={calendar} />
                    <small className="uk-display-block">{moment(props.start_date).format("MMM Do YYYY")}</small>
                </div>
                <div className="uk-text-center">
                    <img alt="business" src={business} />
                    <small className="uk-display-block">{props.category}</small>
                </div>
            </div>
        </div>
    )
}
