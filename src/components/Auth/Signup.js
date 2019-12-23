import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {AuthUrls} from "../../constants/Urls";
import { Formik } from "formik";
import * as Yup from "yup";
import history from "../../lib/historyUtils";
import SignupForm from "./presentation/SignupForm";
import "./Auth.css";

const getSchema = () => Yup.object().shape({
    first_name: Yup.string()
        .required('* Required'),
    last_name: Yup.string()
        .required('* Required'),
    email: Yup.string()
        .email('* Enter a valid email address.')
        .required('* Required'),
    password: Yup.string()
        .min(8, "* At least 8 characters.")
        .required('* Required'),
    password2: Yup.string()
        .min(8, "* At least 8 characters.")
        .test('passwords-match', '* Passwords must match', function(value) {
            return this.parent.password === value;
        }),
});

const Signup = props =>  {
    const [serverError, setServerError] = useState();

    useEffect(
        () => {
            // if(token) history.push("/profile");
            console.log("EFFECT ERROR", serverError)
            return () => console.log("CLEANUP")
        }, [serverError]
    )

    const handleSubmit = data => {
        const endpoint = `${AuthUrls.SIGNUP}`
        const body = {
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                password1: data.password,
                password2: data.password2,
            };

        return axios.post(endpoint, body)
        .then((response) => {
            history.push("/signup-done");
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
                first_name: "",
                last_name: "",
                email: "",
                password: "",
                password2: "",
            }}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                setTimeout(() => {
                    setSubmitting(false);
                }, 1000);
                handleSubmit(values);
            }}
            validationSchema={getSchema}
            render={formikProps =>
                <section className="uk-section uk-section-small uk-width-1-1 uk-flex uk-flex-column uk-flex-around" data-uk-height-viewport="offset-bottom: 20;">
                    <div className="uk-container uk-container-small">
                        <div data-uk-scrollspy="cls: uk-animation-fade">
                            <p className="uk-h1">Sign up</p>
                            <Link to="/login">
                                <p className="uk-text-small uk-display-inline-block">Or login</p>
                            </Link>
                            <SignupForm
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

export default Signup;
