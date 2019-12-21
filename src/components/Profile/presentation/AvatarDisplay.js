import React, {useState, useEffect, useContext} from "react";
import { UserContext } from "../../Contexts/UserContext";

const ProfileAvatar = ({props}) => {
    return (
        <div className={`uk-text-center ${props.className}`}>
            <img
                className="avatar-img profile-image-circle profile-image-offset"
                src={props.image}
                alt={props.alt}
            />
        </div>
    )
}

const HeroAvatar = ({props}) => {
    return (
        <div className={`hero-display uk-cover-container ${props.className}`}>
            <canvas width="1200" height="600"></canvas>
            <img
                className="hero-img"
                src={props.image}
                alt={props.alt}
                data-uk-cover
            />
        </div>
    )
}

const Avatar = props => {

    return (
        props.className === "avatar-display" ?
            <ProfileAvatar props={props} />
            :
            <HeroAvatar props={props} />
    )
}

export default Avatar;
