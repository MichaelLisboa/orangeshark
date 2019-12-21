import React from "react";
import { Form, Field } from "formik";

const SignupForm = ({serverError, ...props}) => {

    return (
        <Form
            style={{maxWidth: "500px"}}
            className="default-form"
            >
                <div className="uk-grid-small uk-padding-remove" data-uk-grid>
                    <label className="uk-width-1-2">
                        <small className="uk-display-inline">
                            First name <span className={`${props.errors.first_name && props.touched.first_name && "uk-text-danger"}`}>
                                {props.errors.first_name && props.touched.first_name && props.errors.first_name}
                                </span>
                        </small>
                        <Field
                            name="first_name"
                            label="First name"
                            placeholder="First name"
                            className="uk-input uk-form-large uk-border-rounded"
                            autoCapitalize="off"
                            required
                        />
                    </label>
                    <label className="uk-width-expand">
                        <small className="uk-display-inline">
                            Last name <span className={`${props.errors.last_name && props.touched.last_name && "uk-text-danger"}`}>
                                {props.errors.last_name && props.touched.last_name && props.errors.last_name}
                                </span>
                        </small>
                        <Field
                            name="last_name"
                            label="Last name"
                            placeholder="Last name"
                            className="uk-input uk-form-large uk-border-rounded"
                            autoCapitalize="off"
                            required
                        />
                    </label>
                </div>
                <div className="uk-margin">
                    <small>
                        Email address <span className={`${props.errors.email && props.touched.email && "uk-text-danger"}`}>
                            {props.errors.email && props.touched.email && props.errors.email}
                            </span>
                    </small>
                    <Field
                        name="email"
                        label="Email"
                        placeholder="Email"
                        className="uk-input uk-form-large uk-border-rounded"
                        autoCapitalize="off"
                        autoCorrect="off"
                        required
                    />
                </div>
                <div className="uk-margin">
                    <small>
                        Password <span className={`${props.errors.password && props.touched.password && "uk-text-danger"}`}>
                            {props.errors.password && props.touched.password && props.errors.password}
                            </span>
                    </small>
                    <Field
                        name="password"
                        label="Password"
                        type="password"
                        placeholder="Password"
                        className="uk-input uk-form-large uk-border-rounded"
                        required
                    />
                </div>
                <div className="uk-margin">
                    <small>
                        Confirm password <span className={`${props.errors.password2 && props.touched.password2 && "uk-text-danger"}`}>
                            {props.errors.password2 && props.touched.password2 && props.errors.password2}
                            </span>
                    </small>
                    <Field
                        name="password2"
                        label="Password"
                        type="password"
                        placeholder="Confirm password"
                        className="uk-input uk-form-large uk-border-rounded"
                        required
                    />
                </div>

                {serverError &&
                    <div className="uk-background-muted uk-margin-small uk-padding-small uk-width-1-1">
                    {serverError.map((error, i) =>
                        <span className="uk-text-small uk-text-danger uk-display-block" key={`error-${i}`}>{error}</span>
                    )}
                    </div>
                }

                <div className="uk-container uk-text-center">
                    <button
                        type="submit"
                        disabled={props.isSubmitting || !props.isValid}
                        className="uk-button uk-button-default">
                            Sign up
                    </button>
                </div>
        </Form>
    )
}

export default SignupForm;
