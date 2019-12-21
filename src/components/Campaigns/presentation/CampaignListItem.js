import React from "react";
import { Link } from "react-router-dom";

import "../Campaigns.css";

// import liked from "../../../images/LoveFilled.png";
// import viewed from "../../../images/View.png";
// import starFull from "../../../images/Star-full.png";
// import starHalf from "../../../images/Star-half.png";
// import starEmpty from "../../../images/Star-empty.png";
//
// const starRating = n => {
//     if (n <= 55) {
//         return (
//             <>
//             <img src={starEmpty} alt={n} />
//             <img src={starEmpty} alt= {n} />
//             <img src={starEmpty} alt={n} />
//             <img src={starEmpty} alt={n} />
//             </>
//         );
//     } else if (n > 55 && n <= 60) {
//         return (
//             <>
//             <img src={starHalf} alt={n} />
//             <img src={starEmpty} alt= {n} />
//             <img src={starEmpty} alt={n} />
//             <img src={starEmpty} alt={n} />
//             </>
//         );
//     } else if (n > 60 && n <= 70) {
//         return (
//             <>
//             <img src={starFull} alt={n} />
//             <img src={starFull} alt= {n} />
//             <img src={starEmpty} alt={n} />
//             <img src={starEmpty} alt={n} />
//             </>
//         );
//     } else if (n > 70 && n <= 80) {
//         return (
//             <>
//             <img src={starFull} alt={n} />
//             <img src={starFull} alt= {n} />
//             <img src={starFull} alt={n} />
//             <img src={starEmpty} alt={n} />
//             </>
//         );
//     } else {
//         return (
//             <>
//             <img src={starFull} alt={n} />
//             <img src={starFull} alt= {n} />
//             <img src={starFull} alt={n} />
//             <img src={starFull} alt={n} />
//             </>
//         );
//     }
// }

const CampaignListItem = ({ campaign, user}) => {
    return (
        <div>
            <div className="">
                <div className="uk-width-expand">
                    <Link className="uk-link-reset uk-link-text" to={`/campaign/${campaign.id}`}>
                        <p className="campaign-title uk-h4 uk-padding-remove-bottom uk-text-center">{campaign.name}</p>
                    </Link>
                </div>
                <div className="uk-margin">
                    {campaign.expert ?
                        <small className="small-meta uk-text-muted">
                            Accepted by <Link
                                to={`/user/${campaign.expert.profile.user_id}`}>
                                {campaign.expert.profile.first_name} {campaign.expert.profile.last_name}
                            </Link>
                        </small>
                        :
                        <div className="uk-text-center">
                        <Link
                            to={`/profile`}
                            className="uk-button uk-button-default">
                                Find an expert
                        </Link>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
export default CampaignListItem;
