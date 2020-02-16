import React, { useState, useRef, useContext } from "react";
import axios from "axios";
import history from "../../../lib/historyUtils";
import { UserContext } from "../../Contexts/UserContext";
import { Wizard, WizardStep } from "../../Wizard";
import Autocomplete from "../../Autocomplete";

import Network from "./Network";
import MediaType from "./MediaType";
import Headlines from "./Headlines";
import AdText from "./AdText";
import Keywords from "./Keywords";
import DisplayLinks from "./DisplayLinks";
import TargetUrls from "./TargetUrls";
import LinkDescr from "./LinkDescr";
import MediaUpload from "./MediaUpload";
import AgeGroups from "./AgeGroups";
import Gender from "./Gender";

const CampaignForm = ({media, setMedia, setAdNetwork, adNetwork, setMediaType, mediaType, serverError, ...props}) => {
    const [token, setToken] = useContext(UserContext);

    const handleInputChange = (e) => {
        e.persist();
        const {name, value} = e.target
        setFormValues({...formValues, [name]: value})
    }

    const [formValues, setFormValues] = useState({
        campaign_name: "",
        age_groups: "",
    })

    const [headlines, setHeadlines] = useState([]);
    const [adText, setAdText] = useState([]);
    const [keywords, setKeywords] = useState([]);
    const [gender, setGender] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [displayLinks, setDisplayLinks] = useState([]);
    const [targetUrls, setTargetUrls] = useState([]);
    const [linkDescr, setLinkDescr] = useState([]);

    const inputRef = useRef();

    const getEndpoint = () => {
        let url = "";
        switch(mediaType) {
            case 'image':
                url = "single/image/";
                break
            case 'video':
                url = "single/video/";
                break
            case 'carousel_image':
                url = "carousel/image/";
                break
            case 'carousel_video':
                url = "carousel/video/";
                break
            case 'text':
                url = "single/text/";
                break
            default:
                url = "single/image/";
        }
        return url;
    }

    const handleSubmit = (e) => {
        if (e) e.preventDefault();
        const root_url = "https://app.orangeshark.xyz/campaigns/create/";
        const network = adNetwork === 'google' ? "google/ads/" : "fb/rhs/";
        const endpoint = root_url + network + getEndpoint();

        const body = {
            campaign_name: formValues.campaign_name,
            images: media,
            headlines: headlines,
            ad_text: adText,
            keywords: keywords,
            age_groups: formValues.age_groups.split(",").map(item => item.trim()),
            gender: gender,
            languages: languages,
            display_links: displayLinks,
            target_urls: targetUrls,
            link_desc: linkDescr
        };

        console.log("FORM BODY", body)

        if (token) {
            return axios({
                method: "POST",
                url: endpoint,
                data: body,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((response) => {
                console.log("CREATE CAMPAIGN RESPONSE", response)
                history.push(`/campaign/${response.data.id}`);
            })
            .catch((error) => {
                console.log("BIG ERROR", error.message);
            });
        }
    }

    return (
        <form className="default-form" onSubmit={
            (e) => {
                e.preventDefault();
                console.log("SUBMIT FIELDS");
                handleSubmit()
            }}>
            <fieldset className="uk-fieldset">
                <Wizard formProps={props} adNetwork={adNetwork} mediaType={mediaType}>
                    <WizardStep>
                        <Network handleInputChange={handleInputChange} setAdNetwork={setAdNetwork} adNetwork={adNetwork} setMediaType={setMediaType} />
                    </WizardStep>

                    <WizardStep>
                        <MediaType adNetwork={adNetwork} handleInputChange={handleInputChange} mediaType={mediaType} setMediaType={setMediaType} />
                    </WizardStep>

                    <WizardStep>
                        <Headlines inputRef={inputRef} setHeadlines={setHeadlines} />
                    </WizardStep>

                    <WizardStep>
                        <AdText inputRef={inputRef} setAdText={setAdText} />
                    </WizardStep>

                    <WizardStep>
                        <Keywords inputRef={inputRef} setKeywords={setKeywords} />
                    </WizardStep>

                    <WizardStep>
                        <DisplayLinks inputRef={inputRef} setDisplayLinks={setDisplayLinks} />
                    </WizardStep>

                    <WizardStep>
                        <TargetUrls inputRef={inputRef} setTargetUrls={setTargetUrls} />
                    </WizardStep>

                    <WizardStep>
                        <LinkDescr inputRef={inputRef} setLinkDescr={setLinkDescr} />
                    </WizardStep>

                    <WizardStep>
                        <div className="uk-h4">
                            Select Countries
                        </div>
                        <Autocomplete
                            setLanguages={setLanguages}
                            inputRef={inputRef}
                            />
                    </WizardStep>

                    <WizardStep>
                        <AgeGroups inputRef={inputRef} formValues={formValues} handleInputChange={handleInputChange} />
                        <Gender inputRef={inputRef} setGender={setGender} />
                    </WizardStep>

                    <WizardStep>
                        <MediaUpload setMedia={setMedia} />
                    </WizardStep>

                    <WizardStep>
                        <div className="uk-h4">
                            Campaign Name
                        </div>
                        <div className="uk-margin">
                            <p className="uk-text-small uk-text-muted uk-margin-small-bottom">
                            </p>
                            <input
                                ref={inputRef}
                                value={formValues.campaign_name}
                                onChange={(e) => handleInputChange(e)}
                                name="campaign_name"
                                label="Campaign name"
                                placeholder="Name this campaign"
                                className={`uk-input uk-form-large`}
                                required
                            />
                        </div>
                    </WizardStep>
                </Wizard>
            </fieldset>
        </form>
    )
}

export default CampaignForm;
