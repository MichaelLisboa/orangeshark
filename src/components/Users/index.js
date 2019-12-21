import React, { useState, useEffect, useRef, useContext } from "react";
import { UserContext } from "../Contexts/UserContext";
import axios from "axios";
import history from "../../lib/historyUtils";
import { AuthUrls } from "../../constants/Urls";
import Avatar from "../Profile/presentation/AvatarDisplay";

import "../Profile/Profile.css";

const ProfileContent = ({profile}) => {
    // const current_user = JSON.parse(localStorage.user);

    return (
        <section className="profile-section uk-position-relative uk-position-large">
            <div className="uk-container uk-container-small">
                <div className="uk-flex uk-flex-column">
                    <Avatar className="profile-image-circle profile-image-offset"
                        user={profile}
                        image={profile.profile.profile_pic} />
                    <div className="profile-card-header uk-grid-small" data-uk-grid>
                        <div className="uk-width-expand uk-text-center">
                            <h4>{profile.first_name} {profile.last_name}</h4>
                        </div>
                        <div className="uk-width-auto">
                         </div>
                    </div>
                    <div className="">
                        <div className="profile-about-user">
                        <p className="uk-h5 uk-text-bold uk-margin-remove">About {profile.first_name}</p>
                        {profile.profile.bio}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

const ViewUser = props => {
    const [user,, token,] = useContext(UserContext);
    const [profile, setProfile] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const id = useRef(props.match.params.id)

    console.log("THE USER", user, profile)

    const getUserProfile = () => {
        if (token) {
            axios.get(`${AuthUrls.DEFAULT}${id.current}/`, {
                headers: {
                    authorization: `Token ${token}`
                }
            }).then(response => {
                setProfile(response.data);
                setIsLoading(false);
            }).catch((error) => {
                console.log(error);
                history.push("/profile");
            });
        } else {
            history.push("/logout");
        }
    }

    useEffect(
        () => {
            getUserProfile();
        }, []
    )

    if (isLoading) {
        return (
            <>
            <div />
            </>
        )
    }

    return (
        <ProfileContent profile={profile} />
    );
}

export default ViewUser;
