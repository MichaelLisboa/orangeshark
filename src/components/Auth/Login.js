import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";
import axios from "axios";
import {AuthUrls} from "../../constants/Urls";
import { Formik } from "formik";
import * as Yup from "yup";
import history from "../../lib/historyUtils";
import LoginForm from "./presentation/LoginForm";
import "./Auth.css";

const getSchema = () => Yup.object().shape({
    username: Yup.string()
        .required('Please enter your email address.'),
    password: Yup.string()
        .min(8, "Password must be at least 8 characters.")
        .required("This field is required."),
});

const Login = props =>  {
    const [token, setToken] = useContext(UserContext);
    const [serverError, setServerError] = useState();

    useEffect(
        () => {
            if(!token) return;
            history.push("/dashboard");
            return () => console.log("CLEANUP")
        }, [token]
    )

    const handleSubmit = data => {
        const endpoint = `${AuthUrls.LOGIN}`
        const body = {
            username: data.username,
            password: data.password,
        };

        return axios.post(endpoint, body)
            .then((response) => {
                console.log("LOGIN RESPONSE", response)
                const res = response.data;
                setToken(res.access);
                localStorage.setItem("token", res.access);
                localStorage.setItem("refresh", res.refresh);
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
                username: "",
                password: "",
            }}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                setTimeout(() => {
                    resetForm();
                    setSubmitting(false);
                }, 1000);
                handleSubmit(values);
            }}
            validationSchema={getSchema}
            render={formikProps =>
                <section className="uk-section uk-section-small uk-flex uk-flex-middle" data-uk-height-viewport="offset-bottom: 20;">
                    <div className="uk-container uk-container-small">
                        <div data-uk-scrollspy="cls: uk-animation-fade">
                            <p className="uk-h1">Hi there. <br />Welcome back.</p>
                            <LoginForm
                                serverError={serverError}
                                {...formikProps}
                                {...props} />

                                <div className="uk-text-center uk-margin">
                                    <Link to="/reset-password">
                                        <small className="uk-display-inline-block">Forget your password?</small>
                                    </Link>
                                </div>

                                <div className="uk-text-center">
                                    <Link to="/signup">
                                        <small className="uk-display-inline-block">Or sign up</small>
                                    </Link>
                                </div>
                        </div>
                    </div>
                </section>
            }
        />
    )
}

export default Login;
