import React, {useState, useEffect, useRef} from "react";
import axios from "axios";
import { AuthUrls } from "../../constants/Urls";
import history from "../../utils/historyUtils";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const getSchema = () => Yup.object().shape({
    old_password: Yup.string()
        .required("This field is required."),
    new_password1: Yup.string()
        .required("Password is required."),
    new_password2: Yup.string()
        .required("Confirm your password.")
        .oneOf([Yup.ref("new_password1"), null], "Passwords must match.")
});

const handleSubmit = data => {
    const token = localStorage.token;

    if (token) {
        axios.post(AuthUrls.CHANGE_PASSWORD, data, {
            headers: {
                authorization: `Token ${token}`
            }
        })
        .then((response) => {
            console.log("PASSWORD RESPONSE", response)
            // localStorage.setItem("user", JSON.stringify(response.data))
            history.push(`/`);
        })
        .catch((error) => {
            console.log("BIG ERROR", error);
        });
    }
}

const PasswordChange = ({props}) => {

    return (
        <Formik
            initialValues={{
                old_password: "",
                new_password1: "",
                new_password2: "",
            }}
            validationSchema={getSchema}
            onSubmit={handleSubmit}
            render={({ handleChange, values, errors, touched, isSubmitting, isValid }) => (
                <Form className="default-form">
                    <fieldset className="uk-fieldset">
                        <div className="uk-margin">
                            {errors.old_password && touched.old_password && <small className="uk-text-danger">{errors.old_password}</small>}
                            <Field
                                onChange={handleChange}
                                value={values.old_password}
                                name="old_password"
                                type="password"
                                label="Old password"
                                placeholder="Old password"
                                className={`uk-input uk-form-large uk-border-rounded ${errors.old_password && touched.old_password ? "uk-form-danger" : null}`}
                                required
                            />
                        </div>

                        <div className="uk-margin">
                            {errors.new_password1 && touched.new_password1 && <small className="uk-text-danger">{errors.new_password1}</small>}
                            <Field
                                onChange={handleChange}
                                value={values.new_password1}
                                name="new_password1"
                                type="password"
                                label="New password"
                                placeholder="New password"
                                className={`uk-input uk-form-large uk-border-rounded ${errors.new_password1 && touched.new_password1 ? "uk-form-danger" : null}`}
                                required
                            />
                        </div>

                        <div className="uk-margin">
                            {errors.new_password2 && touched.new_password2 && <small className="uk-text-danger">{errors.new_password2}</small>}
                            <Field
                                onChange={handleChange}
                                value={values.new_password2}
                                name="new_password2"
                                type="password"
                                label="Confirm password"
                                placeholder="Confirm password"
                                className={`uk-input uk-form-large uk-border-rounded ${errors.new_password2 && touched.new_password2 ? "uk-form-danger" : null}`}
                                required
                            />
                        </div>

                        <div className="uk-text-center">
                            <button
                                type="submit"
                                disabled={isSubmitting || !isValid}
                                className="button-minimal uk-button uk-button-large">
                                Change password
                            </button>
                        </div>
                    </fieldset>
                </Form>
            )}
        />
    )
}

export default PasswordChange;
