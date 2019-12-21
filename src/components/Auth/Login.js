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
    email: Yup.string()
        .email('Please enter a valid email address.')
        .required('Please enter your email address.'),
    password: Yup.string()
        .min(8, "Password must be at least 8 characters.")
        .required("This field is required."),
});

const Login = props =>  {
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
        const endpoint = `${AuthUrls.LOGIN}`
        const body = {
                email: data.email,
                password: data.password,
            };

        return axios.post(endpoint, body)
        .then((response) => {
            const res = response.data;
            setToken(res.key);
            localStorage.setItem("token", res.key);
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
                <section className="uk-flex uk-flex-middle" data-uk-height-viewport="offset-top: true">
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