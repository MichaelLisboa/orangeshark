import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { CampaignUrls } from "../../../constants/Urls";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";

import requested from "../../../images/Icons/Requested.png";
import active from "../../../images/Icons/Working.png";
import declined from "../../../images/Icons/Decline.png";
import closed from "../../../images/Icons/Finish.png";
import canceled from "../../../images/Icons/Danger.png";

const getSchema = () => Yup.object().shape({
    status: Yup.string()
        .required('This field is required.'),
});

const statusOptions = [
    {value: 'requested', label:'Requested', image: requested, color: "#F5A22E" },
    {value: 'accepted', label:'Active', image: active, color: "#4AB0D7" },
    {value: 'closed', label:'Finished', image: closed, color: "#8BC34A"},
    {value: 'canceled', label:'Canceled', image: canceled, color: "#EC5957"}
]

const acceptanceOptions = [
    {value: 'accepted', label:'Accept', image: closed, color: "#8BC34A"},
    {value: 'decline', label:'Decline', image: declined, color: "#EC5957"}
]

const SetStatusForm = ({options, campaignStatus, setCampaignStatus, ...props}) => {

    const handleSubmit = value => {
        const endpoint = `${CampaignUrls.DEFAULT}${props.campaign.id}/`;
        const token = localStorage.getItem("token");
        const body = {"status": value === "decline" ? "created" : value}

        axios.patch(endpoint, body, {
            headers: {
                authorization: `Token ${token}`
            }
        })
        .then(response => {
            setCampaignStatus(response.data.status)
        })
        .catch(err => {
            console.log("ERROR", err)
        })
    }

    return (
        <Form className="">
            <p className="uk-h5 uk-text-center uk-heading-line uk-margin-large-top uk-padding-margin-bottom">
                <span>{campaignStatus === "requested" ? "Want This Gig?" : "Set Status"}</span>
            </p>
            <div className="uk-grid-collapse uk-child-width-expand uk-text-center uk-margin-left uk-margin-right" data-uk-grid>
                <FieldArray
                    name="status"
                    render={arrayHelpers => (
                        options.map((stat, index) => (
                            <div key={index} className="campaign-status">
                                <label className="uk-text-small uk-text-nowrap">
                                    <Field
                                        name="status"
                                        component="input"
                                        type="radio"
                                        value={stat.value}
                                        onChange={() => { handleSubmit(stat.value); }}
                                        className="uk-radio uk-margin-small-right"
                                        checked={campaignStatus.includes(stat.value)}
                                    />
                                    <img
                                        style={{maxHeight: "32px"}}
                                        src={stat.image}
                                        alt={stat.label}
                                    />
                                    <small
                                        style={{color: campaignStatus.includes(stat.value) ? stat.color : "#c0c0c0"}}
                                        className="small-meta small-meta-caps uk-display-block uk-text-center">{stat.label}
                                    </small>
                                </label>
                            </div>
                        ))
                    )}
                />
            </div>
        </Form>
    )
}

const CampaignStatusForm = ({campaignStatus, setCampaignStatus, ...props}) => {
    const [options, setOptions] = useState();

    useEffect(
        () => {
            setOptions(campaignStatus !== "requested" ? statusOptions : acceptanceOptions)
        }, [options, campaignStatus]
    );

    if(!options) return null;
    return (
        <Formik
            initialValues={{
                status: campaignStatus
            }}
            validationSchema={getSchema}
            onSubmit={(values, { setSubmitting }) => {
                // handleSubmit(values);
                setTimeout(() => {
                    setSubmitting(false);
                }, 1000);
            }}
            render={formikProps =>
                <SetStatusForm
                    options={options}
                    campaignStatus={campaignStatus}
                    setCampaignStatus={setCampaignStatus}
                    {...formikProps}
                    {...props} />
            }
        />
    )
}

export default CampaignStatusForm;
