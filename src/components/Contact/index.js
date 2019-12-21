import React, { Component } from "react";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import Modal from "../Modal";
import * as Yup from "yup";

const getSchema = () => Yup.object().shape({
    firstName: Yup.string()
        .required('Please enter your first name'),
    lastName: Yup.string()
        .required('Please enter your last name'),
    phone: Yup.string()
        .required('Please enter your phone number'),
    email: Yup.string()
        .email('Please enter a valid email address')
        .required('Please enter your email address'),
    comment: Yup.string()
        .required('Please enter your message'),
});

class Contact extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            company: "",
            comment: "",
            responseSubject: '',
            responseMessage: '',
            isShowing: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (values, {setSubmitting, setErrors, setStatus, resetForm}) => {
        const endpoint = process.env.REACT_APP_FORMCARRY_ENDPOINT;
        const body = {
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                phone: values.phone,
                company: values.company,
                comment: values.comment
            };

        axios.post(endpoint, body)
        .then((response) => {
            let msg, title;
            if (response.data.status === 'success') {
                resetForm()
                title = "Message received!"
                msg = "Thank you, we'll follow up with you shortly.";
            } else {
                title = "There was a problem.";
                msg = "Your message didn't go through, please try again.";
            }
            this.setState({
                responseSubject: title,
                responseMessage: msg,
                isShowing: true
            })
        })
        .catch((error) => {
            console.log("BIG ERROR", error);
        });
    }

    resetForm = () => {
        this.setState({
           ...this.state,
           firstName: "",
           lastName: "",
           email: "",
           phone: "",
           company: "",
           comment: "",
           isShowing: false
       })
    }

    render() {
        return (
            <>
            <Formik
                initialValues={{
                    firstName: "",
                    lastName: "",
                    email: "",
                    phone: "",
                    company: "",
                    comment: ""
                }}
                validationSchema={getSchema}
                onSubmit={this.handleSubmit}
                render={({ handleChange, handleBlur, values, errors, touched, isSubmitting, validateForm, isValid }) => (
                    <Form>
                        <fieldset className="uk-fieldset">
                            <div className="uk-margin-small-top uk-child-width-1-2" data-uk-grid>
                                <label htmlFor="firstName" className="uk-text-muted">First name {errors.firstName && touched.firstName && "* Required"}
                                    <Field
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.firstName}
                                        name="firstName"
                                        label={errors.firstName && touched.firstName ? errors.firstName : "First name"}
                                        placeholder={errors.firstName && touched.firstName && errors.firstName}
                                        className={`uk-input uk-form-large uk-border-rounded ${errors.firstName && touched.firstName ? "uk-form-danger" : "uk-form"}`}
                                        required
                                    />
                                </label>
                                <label htmlFor="lastName" className="uk-text-muted">Last name  {errors.lastName && touched.lastName && "* Required"}
                                    <Field
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.lastName}
                                        name="lastName"
                                        label={errors.lastName && touched.lastName ? errors.lastName : "Last name"}
                                        placeholder={errors.lastName && touched.lastName && errors.lastName}
                                        className={`uk-input uk-form-large uk-border-rounded ${errors.lastName && touched.lastName ? "uk-form-danger" : "uk-form"}`}
                                        required
                                    />
                                </label>
                            </div>
                            <div className="uk-margin-small-top uk-child-width-1-2" data-uk-grid>
                                <label htmlFor="email" className="uk-text-muted">Email address  {errors.email && touched.email && "* Required"}
                                    <Field
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                        name="email"
                                        label="Email address"
                                        placeholder={errors.email && touched.email && errors.email}
                                        className={`uk-input uk-form-large uk-border-rounded ${errors.email && touched.email ? "uk-form-danger" : "uk-form"}`}
                                        required
                                    />
                                </label>
                                <label htmlFor="phone" className="uk-text-muted">Phone number {errors.phone && touched.phone && "* Required"}
                                    <Field
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.phone}
                                        name="phone"
                                        label={errors.phone && touched.phone ? errors.phone : "Phone number"}
                                        placeholder={errors.phone && touched.phone && errors.phone}
                                        className={`uk-input uk-form-large uk-border-rounded ${errors.phone && touched.phone ? "uk-form-danger" : "uk-form"}`}
                                        required
                                    />
                                </label>
                            </div>

                            <div className="uk-margin-small-top">
                                <label htmlFor="company" className="uk-text-muted">Company or organization
                                    <Field
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.company}
                                        name="company"
                                        label={errors.company && touched.company ? errors.company : "Company"}
                                        placeholder={errors.company && touched.company && errors.company}
                                        className={`uk-input uk-form-large uk-border-rounded ${errors.company && touched.company ? "uk-form-danger" : "uk-form"}`}
                                    />
                                </label>
                            </div>
                            <div className="uk-margin-small-top">
                                <label htmlFor="comment" className="uk-text-muted">Your message {errors.comment && touched.comment && "* Required"}
                                <Field
                                    component="textarea"
                                    name="comment"
                                    label={errors.comment && touched.comment ? errors.comment : "Your message"}
                                    placeholder={errors.comment && touched.comment && errors.comment}
                                    rows="4"
                                    className={`uk-textarea uk-form-large uk-border-rounded ${errors.comment && touched.comment ? "uk-form-danger" : null}`}
                                    required
                                />
                                </label>
                            </div>

                            <div className="uk-margin-medium-top uk-text-right">
                                <button
                                    type="submit"
                                    className="uk-light uk-button uk-button-large uk-button-default uk-border-rounded"
                                    disabled={isSubmitting || !isValid}>
                                    <span data-uk-icon="mail" /> &nbsp;Send message
                                </button>
                            </div>
                        </fieldset>
                    </Form>
                )}
            />

            <Modal
                isShown={this.state.isShowing}
                style={{borderStyle: "none"}}>
                <div className="uk-card uk-card-small uk-card-default">
                    <div className="uk-card-header">
                        <h4 className="uk-text-primary">{this.state.responseSubject}</h4>
                    </div>
                    <div className="uk-card-body">
                        <p>{this.state.responseMessage}</p>
                        <div className="uk-text-center uk-margin-large">
                            <button
                                className="uk-button uk-button-small uk-button-text"
                                onClick={this.resetForm}>
                                Okay
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
            </>
        )
    }
}

export default Contact;
