import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";
import axios from "axios";
import {AuthUrls} from "../../constants/Urls";
import { Formik } from "formik";
import PasswordResetConfirmForm from "./presentation/PasswordResetConfirmForm";
import * as Yup from "yup";
import history from "../../lib/historyUtils";
import { useToasts } from "react-toast-notifications";


const getSchema = () => Yup.object().shape({
    new_password1: Yup.string()
        .min(8, "Password must be at least 8 characters.")
        .required("This field is required."),
    new_password2: Yup.string()
        .min(8, "Password must be at least 8 characters.")
        .test('passwords-match', 'Passwords must match', function(value) {
            return this.parent.new_password1 === value;
        }),
});

const PasswordResetConfirm = props => {
    const { addToast } = useToasts();
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
        console.log("THE PROPS", props)
        const endpoint = `${AuthUrls.RESET_PASSWORD_CONFIRM}`
        const body = {
                new_password1: data.new_password1,
                new_password2: data.new_password2,
            };
        const { uid, token } = props.match.params

        const d = Object.assign(body, { uid, token });

    return axios.post(endpoint, d)
        .then(response => {
            if (response.status === 200 ) {
                addToast("Password successfully updated, you can login now.", {
                    appearance: "success",
                    autoDismiss: "true"
                })
                history.push("/login");
            } else {
                throw new Error(500)
            }

        }).catch((err) => {
            console.log(err.response)
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
                new_password1: "",
                new_password2: ""
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
                            <p className="uk-h1">Reset your<br />password</p>
                            <p className="uk-text-small">Enter your new password below.</p>
                            <PasswordResetConfirmForm
                                serverError={serverError}
                                {...formikProps}
                                {...props} />
                        </div>
                    </div>
                </section>
            }
        />
    );
}

export default PasswordResetConfirm;
