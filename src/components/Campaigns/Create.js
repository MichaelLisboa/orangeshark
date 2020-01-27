import React, { useState, useCallback, useEffect, useContext} from "react";
import history from "../../lib/historyUtils";
import { UserContext } from "../Contexts/UserContext";
import axios from "axios";
import { CampaignUrls } from "../../constants/Urls";
import { Formik } from "formik";
import * as Yup from "yup";
import CampaignForm from "./presentation/CampaignForm";
import {useDropzone} from 'react-dropzone'

const getSchema = () => Yup.object().shape({
    campaign_name: Yup.string()
        .required('This field is required.'),
    headlines: Yup.string()
        .required('This field is required.'),
    ad_text: Yup.string()
        .required('This field is required.'),
    keywords: Yup.string()
        .required('This field is required.'),
    age_groups: Yup.string()
        .required('This field is required.'),
    gender: Yup.string()
        .required('This field is required.'),
    languages: Yup.string()
        .required('This field is required.'),
    dispaly_links: Yup.string()
        .required('This field is required.'),
    target_urls: Yup.string()
        .required('This field is required.'),
    link_desc: Yup.string()
        .required('This field is required.'),
    // ad_network: Yup.string()
    //     .required('This field is required.'),
    // mediaType: Yup.string()
    //     .required('This field is required.'),
});


const Create = props => {
    const [token, setToken] = useContext(UserContext);
    const [files, setFiles] = useState([])
    const [serverError, setServerError] = useState();
    const [adNetwork, setAdNetwork] = useState("");
    const [mediaType, setMediaType] = useState("");

    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
        console.log("DRROOPPP", acceptedFiles)
        const files = [];
        acceptedFiles.forEach((file) => {
            const reader = new FileReader()
            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            reader.onload = () => {
            // Do whatever you want with the file contents
            const binaryStr = reader.result
            console.log(binaryStr)
            files.push(file.name);
        }
        reader.readAsArrayBuffer(file)
        })
        console.log("FILES", files)
        setFiles(files)
    }, []);

    const {acceptedFiles, getRootProps, getInputProps, isDragActive} = useDropzone({onDrop,
        getFilesFromEvent: event => myCustomFileGetter(event)
    })

    async function myCustomFileGetter(event) {
        const files = [];
        const fileList = event.dataTransfer ? event.dataTransfer.files : event.target.files;

        for (var i = 0; i < fileList.length; i++) {
            const file = fileList.item(i);

            Object.defineProperty(file, 'myProp', {
                value: true
            });

            files.push(file);
            // console.log("FILES", files)
        }

        return files;
    }

    useEffect(
        () => {
            // if(token) history.push("/profile");
            console.log("EFFECT ERROR", serverError)
            const endpoint = `${CampaignUrls.DEFAULT}`;
            axios.options(endpoint, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            .then((response) => {
                console.log("CREATE CAMPAIGN RESPONSE", response)
                // history.push(`/campaign/${response.data.id}`);
            })
            .catch((error) => {
                console.log("BIG ERROR", error);
            });

            return () => console.log("CLEANUP")
        }, [serverError]
    )

    useEffect(
        () => {
            console.log("SELECTED NETWORK", adNetwork, mediaType)
        }, [adNetwork, mediaType]
    );

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

    const handleSubmit = formData => {
        console.log("FORM DATA", formData, adNetwork, mediaType)
        const root_url = "http://34.70.132.82:8000/campaigns/create/"
        const network = adNetwork === 'google' ? "google/ads/" : "fb/rhs/";
        const endpoint = root_url + network + getEndpoint();
        const token = localStorage.getItem("token");
        const body = {
            campaign_name: formData.campaign_name,
            images: files,
            headlines: [formData.headlines],
            ad_text: [formData.ad_text],
            keywords: [formData.keywords],
            age_groups: [formData.age_groups],
            gender: [formData.gender],
            languages: [formData.languages],
            dispaly_links: [formData.dispaly_links],
            target_urls: [formData.target_urls],
            link_desc: [formData.link_desc]
        };

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
                // history.push(`/campaign/${response.data.id}`);
            })
            .catch((error) => {
                console.log("BIG ERROR", error.message);
            });
        }
    }

    return (
        <Formik
            initialValues={{
                campaign_name: "",
                images: [],
                headlines: [],
                ad_text: [],
                keywords: [],
                age_groups: [],
                gender: [],
                languages: [],
                dispaly_links: [],
                target_urls: [],
                link_desc: [],
                ad_network: "",
                media_type: "",
            }}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                setTimeout(() => {
                    setSubmitting(false);
                }, 1000);
                console.log("FIELD VALUES", values);
                handleSubmit(values);
            }}
            validationSchema={getSchema}
            render={formikProps =>
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
                                        serverError={serverError}
                                        onDrop={onDrop}
                                        myCustomFileGetter={myCustomFileGetter}
                                        acceptedFiles={acceptedFiles}
                                        getRootProps={getRootProps}
                                        getInputProps={getInputProps}
                                        isDragActive={isDragActive}
                                        setAdNetwork={setAdNetwork}
                                        setMediaType={setMediaType}
                                        adNetwork={adNetwork}
                                        mediaType={mediaType}
                                        {...formikProps}
                                        {...props} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            }
            />
    )
}

export default Create;
