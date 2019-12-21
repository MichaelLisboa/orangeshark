import React, { Component } from "react";
import CampaignForm from "./presentation/Form";
import { Preloader } from "../Preloader";
import PageHeader from "../Header/Mobile";
import { Section } from "../Content";
import Footer from "../Nav/Footer";
import axios from "axios";
import history from "../../utils/historyUtils";
import { CampaignUrls } from "../../constants/Urls";

class Edit extends Component {

    constructor (props) {
        super(props);
        this.state = {
            campaign: [],
            regions: [],
            categories: [],
            goals: [],
            isLoading: true
        };
        this.getParams = this.getParams.bind(this);
    }

    getCampaign () {
        const token = localStorage.token,
            campaignId = this.props.match.params.id;
        const endpoint = `${CampaignUrls.DEFAULT}${campaignId}/`;
        if (token) {
            axios.get(endpoint, {
                headers: {
                    authorization: `Token ${token}`
                }
            }).then(response => {
                this.setState({
                    campaign: response.data,
                    isLoading: false
                })
            }).catch((error) => {
                console.log("THERE WAS AN ERROR", error);
                // history.push("/profile");
            });
        }
    }

    getParams () {
        const token = localStorage.token
        const endpoint = CampaignUrls.CREATE;
        if (token) {
            axios.options(endpoint, {
                headers: {
                    authorization: `Token ${token}`
                }
            })
            .then(response => {
                const actions = response.data.actions.POST;
                this.getCampaign();
                this.setState({
                    regions: actions.region.choices,
                    categories: actions.category.choices,
                    goals: actions.goal.choices,
                });
            })
            .catch(error => {
                console.error(error)
            });
        }
    }

    componentDidMount () {
        this.getParams();
    }

    render() {
        if (this.state.isLoading) {
            return (
                <>
                <PageHeader id="mobile-header" title="Edit Campaign" />
                <Preloader />
                </>
            )
        }
        return (
            <>
            <PageHeader id="mobile-header" back={true} title="Edit Campaign" />
            <Section className="with-header">
            <CampaignForm
                campaign={this.state.campaign}
                categories={this.state.categories}
                regions={this.state.regions}
                goals={this.state.goals}
                />
            </Section>
            <Footer />
            </>
        )
    }
}

export default Edit;
