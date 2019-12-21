import React from "react";
import moment from "moment";
import Avatar from "./AvatarDisplay";

import profileImageD from  "../../../images/profile/michael-d.png";

const ProfileCard = props => {
    const user = props.user;

    return (
        <div className="uk-card uk-card-default uk-card-body">
            <Avatar className="avatar-display" alt={`${user.first_name} ${user.last_name}`} image={profileImageD} />
            <div className="uk-child-width-expand uk-margin-small-bottom" data-uk-grid>
                <p className="small-meta small-meta-caps">{user.profile.group}</p>
                <p className="small-meta small-meta-caps uk-text-right">Joined {moment(user.profile.date_joined).fromNow()}</p>
            </div>
            <h3 className="uk-margin-remove-vertical">{user.first_name} {user.last_name}</h3>
            <p className="uk-text-meta uk-margin-remove-vertical">{user.profile.bio}</p>
        </div>
    )
}

export default ProfileCard;
