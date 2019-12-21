import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../Contexts/UserContext";
import axios from "axios";
import { CampaignUrls } from "../../constants/Urls";
import CampaignDetailItem from "./presentation/CampaignDetailItem";

async function getCampaign(id, token) {
    const endpoint = `${CampaignUrls.DEFAULT}${id}`;
    const result = await axios.get(endpoint, {
            headers: {
                authorization: `Token ${token}`
            }
        })
    const res = await result.data;
    return res;
}

const View = props => {
    const [,, token,] = useContext(UserContext);
    const [campaign, setCampaign] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(
        () => {
            const id = props.match.params.id;
            getCampaign(id, token)
            .then(response => {
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
