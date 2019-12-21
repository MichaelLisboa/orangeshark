import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../Contexts/UserContext";
import history from "../../lib/historyUtils";

const Profile = props => {
    const [user,, token,] = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(
        () => {
            if(token && user) {
                if (user && user.profile && !user.profile.bio) {
                    history.push(`/profile/edit/${user.id}`)
                } else {
                    setIsLoading(false);
                }
            }
        }, [token, user]
    );

    if(isLoading) {
        return (
            <div />
        )
    }

    return (
        <section className="uk-section uk-margin-large-top"
            data-uk-height-viewport="offset-top: true; offset-bottom: true">
            <div className="uk-container">
                <div data-uk-grid>
                    <div className="uk-width-large@m">
                        <div className="uk-container">
                            STAGE
                        </div>
                    </div>
                    <div className="uk-width-expand">
                        <div className="uk-container">
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Profile;
