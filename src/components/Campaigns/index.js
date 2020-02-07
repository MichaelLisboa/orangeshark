import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";
import axios from "axios";
import { CampaignUrls } from "../../constants/Urls";
import List from "./List";
import Create from "./Create";

import "./Campaigns.css";

async function getCampaigns(token, page) {
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
    const [next, setNext] = useState("");

    useEffect(
        () => {
            getCampaigns(token, next)
            .then(response => {
                setNext(response.next)
                setCampaigns(response.results);
                setIsLoading(false);
            })
            .catch(err => {
                localStorage.removeItem("token");
                setToken();
            })
        }, []
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
            <section className="uk-section uk-padding-remove uk-section-muted">
                <div className="uk-container uk-container-small uk-margin-xlarge-top uk-margin-large-bottom">
                    <div className="uk-grid-collapse uk-child-width-1-2" data-uk-grid>
                        <h2>Campaigns</h2>
                        <div className="uk-text-right">
                            <Link
                                to="/campaign/create"
                                className="uk-button uk-button-primary">
                                New Campaign
                            </Link>
                        </div>
                    </div>
                    <table className="campaign-table uk-table uk-table-large uk-table-hover uk-table-striped uk-table-expand">
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
                            <List next={next} setNext={setNext} isLoading={isLoading} campaigns={campaigns} />
                        </tbody>
                    </table>
                </div>
            </section>
            :
            <section className="uk-section uk-padding-remove">
                <Create />
            </section>
        }
        </>
    );
}

export default Campaigns;
