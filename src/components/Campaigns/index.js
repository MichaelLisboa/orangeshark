import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";
import axios from "axios";
import { CampaignUrls } from "../../constants/Urls";
import List from "./List";
import Create from "./Create";

async function getCampaigns(token) {
    const endpoint = `${CampaignUrls.DEFAULT}`;
    const result = await axios.get(endpoint, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    const res = await result.data;
    return res;
}

const Campaigns = props => {
    const [token, setToken] = useContext(UserContext);
    const [campaigns, setCampaigns] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    useEffect(
        () => {
            getCampaigns(token)
            .then(response => {
                console.log("CAMPAIGN RESPOONSE", response)
                setCampaigns(response.results);
                setIsLoading(false);
                console.log("CHECK TOKEN", token.length)
            })
            .catch(err => {
                localStorage.removeItem("token");
                setToken();
                // setIsLoading(true);
                console.log("GET CAMPAIGNS ERROR", token);
            })
        }, [setToken, token]
    )

    if (isLoading) {
        return (
            <>
            <div>Loading</div>
            </>
        )
    }

    return (
        <>
        {campaigns.length ?
            <>
                <section className="uk-section">
                    <div className="uk-container uk-container-small">
                        <div className="uk-grid-collapse uk-child-width-1-2" data-uk-grid>
                        <div>
                        <h2>Campaigns</h2>
                        </div>
                        <div className="uk-text-right">
                        <Link
                            to="/campaign/create"
                            className="uk-button uk-button-primary">
                            New Campaign
                        </Link>
                        </div>
                        </div>
                        <table className="campaign-table uk-table uk-table-large uk-table-hover uk-table-striped uk-table-expand">
                            <caption></caption>
                            <thead>
                                <tr className="uk-table-middle">
                                    <th>Campaign Name</th>
                                    <th className="uk-text-center">Platform</th>
                                    <th className="uk-text-center uk-text-nowrap">Format</th>
                                    <th className="uk-text-center">Status</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <List isLoading={isLoading} campaigns={campaigns} />
                            </tbody>
                        </table>
                    </div>
                </section>
            </>
            :
            <section className="uk-section uk-padding-remove">
                <Create />
            </section>
        }
        </>
    );
}

export default Campaigns;
