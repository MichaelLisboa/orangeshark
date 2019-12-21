import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";
import axios from "axios";
import {AuthUrls} from "../../constants/Urls";
import { Formik } from "formik";
import PasswordResetForm from "./presentation/PasswordResetForm";
import * as Yup from "yup";
import history from "../../lib/historyUtils";


const getSchema = () => Yup.object().shape({
    email: Yup.string()
        .email('Please enter a valid email address.')
        .required('Please enter your email address.'),
});

const PasswordReset = props => {
    const [user, setUser, token, setToken] = useContext(UserContext);
    const [serverError, setServerError] = useState();

    useEffect(
        () => {
            if(token) history.push("/profile");
            return () => console.log("CLEANUP")
        }, [token, user]
    )

    useEffect(
        () => {
            return () => console.log("CLEANUP")
        }, [serverError]
    )

    const handleSubmit = data => {
        const endpoint = `${AuthUrls.RESET_PASSWORD}`
        const body = {
                email: data.email,
            };

        return axios.post(endpoint, body)
        .then(response => {
            console.log("RESET PASSWORD", response)
            history.push("/reset-password-done/");
        })
        .catch((err) => {
            let errors = [];
            try {
                Object.values(err.response.data).map(e => errors.push(...e));
            } catch {
                errors = ["There was an error."]
            }
            setServerError(errors);
        });
    }

    return (
        <Formik
            initialValues={{
                email: "",
            }}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                setTimeout(() => {
                    setSubmitting(false);
                }, 1000);
                handleSubmit(values);
            }}
            validationSchema={getSchema}
            render={formikProps =>
                <section className="uk-width-1-1 uk-flex uk-flex-column uk-flex-around" data-uk-height-viewport="offset-top: true">
                    <div className="uk-container uk-container-small">
                        <div data-uk-scrollspy="cls: uk-animation-fade">
                            <p className="uk-h1">Forget<br />something?</p>
                            <p className="uk-text-small">Enter your email address<br />to reset your password.</p>
                            <PasswordResetForm
                                serverError={serverError}
                                {...formikProps}
                                {...props} />

                                <div className="uk-text-center uk-margin">
                                    <Link to="/login">
                                        <p className="uk-text-small uk-display-inline-block">Go back</p>
                                    </Link>
                                </div>
                        </div>
                    </div>
                </section>
            }
        />
    )
}

export default PasswordReset;
