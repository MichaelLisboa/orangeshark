import React, { useState, useCallback, useEffect, useContext} from "react";
import history from "../../lib/historyUtils";
import { UserContext } from "../Contexts/UserContext";
import axios from "axios";
import { CampaignUrls } from "../../constants/Urls";
import { Formik } from "formik";
import * as Yup from "yup";
import CampaignForm from "./presentation/CampaignForm";

const getSchema = () => Yup.object().shape({
    // campaign_name: Yup.string()
    //     .required('This field is required.'),
    // headlines: Yup.string()
    //     .required('This field is required.'),
    // ad_text: Yup.string()
    //     .required('This field is required.'),
    // keywords: Yup.string()
    //     .required('This field is required.'),
    // age_groups: Yup.string()
    //     .required('This field is required.'),
    // gender: Yup.string()
    //     .required('This field is required.'),
    // languages: Yup.string()
    //     .required('This field is required.'),
    // display_links: Yup.string()
    //     .required('This field is required.'),
    // target_urls: Yup.string()
    //     .required('This field is required.'),
    // link_desc: Yup.string()
    //     .required('This field is required.'),
    // ad_network: Yup.string()
    //     .required('This field is required.'),
    // mediaType: Yup.string()
    //     .required('This field is required.'),
});


const Create = props => {
    const [token, setToken] = useContext(UserContext);
    const [media, setMedia] = useState([])
    const [serverError, setServerError] = useState();
    const [adNetwork, setAdNetwork] = useState("");
    const [mediaType, setMediaType] = useState("");

    useEffect(
        () => {
            console.log("SELECTED INPUTS", media, adNetwork, mediaType)
        }, [adNetwork, media, mediaType]
    );



    // const handleSubmit = formData => {
    //     const root_url = "https://app.orangeshark.xyz/campaigns/create/";
        // const root_url = "http://127.0.0.1:3000/campaigns/create/";
        // const network = adNetwork === 'google' ? "google/ads/" : "fb/rhs/";
        // const endpoint = root_url + network + getEndpoint();
        // const token = localStorage.getItem("token");

        // const splitList = (entry) => {
        //     return entry.map(item => item.trim());
        // }
        //
        // const body = {
        //     campaign_name: formData.campaign_name,
        //     images: media,
        //     headlines: splitList(formData.headlines),
        //     ad_text: splitList(formData.ad_text),
        //     keywords: splitList(formData.keywords),
        //     age_groups: splitList(formData.age_groups),
        //     gender: splitList(formData.gender),
        //     languages: splitList(formData.languages),
        //     display_links: splitList(formData.display_links),
        //     target_urls: splitList(formData.target_urls),
        //     link_desc: splitList(formData.link_desc)
        // };
        //
        // console.log("FORM BODY", body)

        // if (token) {
        //     return axios({
        //         method: "POST",
        //         url: endpoint,
        //         data: body,
        //         headers: {
        //             Authorization: `Bearer ${token}`
        //         }
        //     })
        //     .then((response) => {
        //         console.log("CREATE CAMPAIGN RESPONSE", response)
        //         history.push(`/campaign/${response.data.id}`);
        //     })
        //     .catch((error) => {
        //         console.log("BIG ERROR", error.message);
        //     });
        // }
    // }

    return (
        <section className="uk-margin-remove">
            <div className="uk-container uk-container-expand uk-background-primary uk-margin-remove uk-flex uk-flex-center uk-flex-middle" data-uk-height-viewport="offset-top: true; offset-bottom: 8">
                <div className="uk-container uk-container-small">
                    <div className="uk-grid-small uk-grid-match uk-flex uk-flex-middle uk-flex-center" data-uk-grid>
                        <div className="uk-width-1-3@s uk-visible@s uk-padding-small uk-light">
                            <p className="uk-text-bold uk-text-large">Create a new campaign</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas lacinia tempus erat quis finibus. Duis et massa consequat, gravida eros ac, malesuada quam.</p>
                        </div>
                        <div className="uk-width-2-3@s uk-padding">
                            <CampaignForm
                                media={media}
                                setMedia={setMedia}
                                setAdNetwork={setAdNetwork}
                                setMediaType={setMediaType}
                                adNetwork={adNetwork}
                                mediaType={mediaType}
                                {...props} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Create;
