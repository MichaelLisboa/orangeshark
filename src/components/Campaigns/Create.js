import React, {useState, useEffect} from "react";
import history from "../../lib/historyUtils";
import axios from "axios";
import { CampaignUrls } from "../../constants/Urls";
import { Formik } from "formik";
import * as Yup from "yup";
import CampaignForm from "./presentation/Form";

const getSchema = () => Yup.object().shape({
    name: Yup.string()
        .required('This field is required.'),
    // start_date: Yup.string().required(),
    // end_date: Yup.string().required()
});


const Create = props => {
    const [serverError, setServerError] = useState();

    useEffect(
        () => {
            // if(token) history.push("/profile");
            console.log("EFFECT ERROR", serverError)
            return () => console.log("CLEANUP")
        }, [serverError]
    )

    const handleSubmit = data => {
        const endpoint = `${CampaignUrls.DEFAULT}`;
        const token = localStorage.getItem("token");
        const body = {
            owner: JSON.parse(localStorage.user).id,
            name: data.name,
            start_date: data.startDate._d,
            end_date: data.endDate._d,
            brief: data.brief,
            info: data.info,
        };

        console.log(body)

        if (token) {
            return axios({
                method: "POST",
                url: endpoint,
                data: body,
                headers: {
                    authorization: `Token ${token}`
                }
            })
            .then((response) => {
                console.log("CREATE CAMPAIGN RESPONSE", response)
                history.push(`/campaign/${response.data.id}`);
            })
            .catch((error) => {
                console.log("BIG ERROR", error);
            });
        }
    }

    return (
        <Formik
            initialValues={{
                name: "",
                brief: "",
                info: "",
                start_date: "",
                end_date: "",
            }}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                setTimeout(() => {
                    setSubmitting(false);
                }, 1000);
                handleSubmit(values);
            }}
            validationSchema={getSchema}
            render={formikProps =>
                <section className="uk-height-1-1">
                    <div className="uk-height-1-1 uk-container uk-container-small uk-position-z-index uk-position-relative">
                        <div className="uk-width-1-2@s uk-padding-small" data-uk-scrollspy="cls: uk-animation-fade">
                            <p className="uk-h1 uk-margin-large-top uk-margin-xlarge">Start a New Gig</p>
                            <CampaignForm
                                serverError={serverError}
                                {...formikProps}
                                {...props} />
                        </div>
                    </div>
                </section>
            }
            />
    )
}

export default Create;
