import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";
import axios from "axios";
import { CampaignUrls } from "../../constants/Urls";
import List from "./List";

import Data from "../Dashboard/Data";

async function getCampaigns(id, token) {
    // const endpoint = `${CampaignUrls.DEFAULT}`;
    // const result = await axios.get(endpoint, {
    //         headers: {
    //             authorization: `Token ${token}`
    //         }
    //     })
    // const res = await result.data;
    const res = await Data
    return res;
}

const Campaigns = props => {
    const [user,, token,] = useContext(UserContext);
    const [campaigns, setPosts] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(
        () => {
            getCampaigns(user.id, token)
            .then(response => {
                setPosts(response)
                setIsLoading(false)
            })
            .catch(err => {
                console.log("GET USER RESPONSE", err)
            })
        }, []
    )

    if (isLoading) {
        return (
            <>
            <div />
            </>
        )
    }
    console.log("POSTS", campaigns)
    return (
        <>
        {campaigns.length ?
            <>
                <section className="uk-section">
                    <List isLoading={isLoading} campaigns={campaigns} user={user} />
                    <div className="uk-margin-large">
                        <Link
                            to="/campaign/create"
                            className="uk-button uk-button-default">
                            New Campaign
                        </Link>
                    </div>

                </section>
            </>
            :
            <section className="uk-section">
                MONKEY JUNKY
            </section>
        }
        </>
    );
}

export default Campaigns;
