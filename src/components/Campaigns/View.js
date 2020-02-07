import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../Contexts/UserContext";
import axios from "axios";
import { CampaignUrls } from "../../constants/Urls";
import CampaignDetailItem from "./presentation/CampaignDetailItem";

async function getCampaign(id, token) {
    const endpoint = `${CampaignUrls.DETAIL}${id}`;
    const result = await axios.get(endpoint, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    const res = await result.data;
    console.log("GET CAMPAIGN RESPONSE", res)
    return res;
}

const View = props => {
    const [token, setToken] = useContext(UserContext);
    const [campaign, setCampaign] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(
        () => {
            const id = props.match.params.id;
            console.log("THE CAMPAIGN ID", id)
            getCampaign(id, token)
            .then(response => {
                console.log("GET CAMPAIGN", response)
                setCampaign(response);
                setIsLoading(false);
            })
            .catch(err => {
                console.log("GET ERROR RESPONSE", err)
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

    return (
        <>
            <section className="uk-section">
            {campaign &&
                <CampaignDetailItem
                    key={campaign.slug}
                    campaign={campaign}
                />
            }
            </section>
        </>
    );
}

export default View;
